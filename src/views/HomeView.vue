<template>
  <div>
    <div class="wrapper">
       
      
      <AppHeader @open-exit-modal="openExitModal" @open-new-card-modal="openNewCardModal" />

      <div v-if="error" class="error-banner">
        {{ error }}
        <button @click="loadTasks" class="retry-btn">Повторить</button>
      </div>

      <TaskDesk>
        <TaskColumn v-for="column in columns" :key="column.status" :title="column.title">
  <div v-if="getTasksByStatus(column.status).length === 0" class="empty-message">
    <span v-if="tasks.length === 0">Задач нет</span>
  </div>
  <TaskCard
    v-for="task in getTasksByStatus(column.status)"
    :key="task.id"
    :id="task.id"
    :categoryName="task.topic"
    :categoryColor="getColorByTopic(task.topic)"
    :title="task.title"
    :date="task.date"
    @open-task-modal="openTaskModal"
  />
</TaskColumn>
      </TaskDesk>
 
      <NewCardModal 
        :visible="isNewCardModalOpen"
        @close="closeModal"
        @create="handleCreateTask"
      />

      <TaskModal 
        :visible="isTaskModalOpen"
        :task="selectedTask"
        @close="closeModal"
        @edit="openEditModal"
        @delete="handleDeleteTask"
      />

      <EditTaskModal 
        :visible="isEditModalOpen"
        :task="selectedTask"
        @close="closeModal"
        @save="handleSaveTask"
        @delete="handleDeleteTaskFromEdit"
      />

      <ExitModal 
        :visible="isExitModalOpen"
        @close="closeModal"
        @confirm="handleLogout"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { fetchWords, postWord, deleteWord, editWord } from "../services/api.js";
import AppHeader from "../components/AppHeader.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskColumn from "../components/TaskColumn.vue";
import TaskDesk from "../components/TaskDesk.vue";
import NewCardModal from "../components/NewCardModal.vue";
import ExitModal from "../components/ExitModal.vue";
import TaskModal from "../components/TaskModal.vue";
import EditTaskModal from "../components/EditTaskModal.vue";

export default {
  name: "HomeView",
  components: {
    AppHeader,
    TaskCard,
    TaskColumn,
    TaskDesk,
    NewCardModal,
    ExitModal,
    TaskModal,
    EditTaskModal,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const tasks = ref([]);
    const error = ref('');
    const selectedTask = ref(null);

     
    const isNewCardModalOpen = computed(() => route.name === 'new-card-modal');
    const isTaskModalOpen = computed(() => route.name === 'task-modal');
    const isEditModalOpen = computed(() => route.name === 'edit-modal');
    const isExitModalOpen = computed(() => route.name === 'exit-modal');

    const columns = [
      { status: "Без статуса", title: "Без статуса" },
      { status: "Нужно сделать", title: "Нужно сделать" },
      { status: "В работе", title: "В работе" },
      { status: "Тестирование", title: "Тестирование" },
      { status: "Готово", title: "Готово" }
    ];

    const loadTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      error.value = '';
      
      try {
        const data = await fetchWords({ token });
        tasks.value = data.map(task => ({
          id: task._id,
          title: task.title,
          description: task.description || '',
          topic: task.topic,
          status: task.status,
          date: task.date ? new Date(task.date).toLocaleDateString('ru-RU') : ''
        }));
        
         
        if (route.name === 'task-modal' && route.params.id) {
          const task = tasks.value.find(t => t.id === route.params.id);
          if (task) {
            selectedTask.value = task;
          } else {
             
            router.push('/');
          }
        }
        
         
        if (route.name === 'edit-modal' && route.params.id) {
          const task = tasks.value.find(t => t.id === route.params.id);
          if (task) {
            selectedTask.value = task;
          } else {
            router.push('/');
          }
        }
      } catch (err) {
        error.value = 'Ошибка загрузки задач';
      }
    };

    const getTasksByStatus = (status) => {
      return tasks.value.filter(task => task.status === status);
    };

    const getColorByTopic = (topic) => {
      const colors = {
        "Web Design": "orange",
        Research: "green",
        Copywriting: "purple"
      };
      return colors[topic] || "orange";
    };

     
    const openNewCardModal = () => {
      router.push('/new-card');
    };

    const openExitModal = () => {
      router.push('/exit');
    };

    const openTaskModal = (id) => {
      router.push(`/card/${id}`);
    };

    const openEditModal = (task) => {
  const taskToEdit = task || selectedTask.value
  
  if (!taskToEdit || !taskToEdit.id) {
    console.error('No valid task to edit', { task, selectedTask: selectedTask.value })
    return
  }
  
  router.push(`/edit/${taskToEdit.id}`)
}

    const closeModal = () => {
      router.push('/');
    };

 const handleCreateTask = async (newTask) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  let formattedDate = '';
  if (newTask.date) {
    const dateObj = new Date(newTask.date);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toISOString();
    }
  }
  
  try {
    const updatedTasks = await postWord({ 
      token, 
      word: {
        title: newTask.title,
        description: newTask.description || 'Нет описания',
        topic: newTask.topic || 'Research',
        status: newTask.status || 'Без статуса',
        date: formattedDate || new Date().toISOString()
      } 
    });
    
     
    tasks.value = updatedTasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description || '',
      topic: task.topic,
      status: task.status,
      date: task.date ? new Date(task.date).toLocaleDateString('ru-RU') : ''
    }));
    
    closeModal()
  } catch (err) {
    error.value = 'Ошибка создания задачи';
  }
}

    const handleSaveTask = async (updatedTask) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  try {
    const updatedTasks = await editWord({
      token,
      id: updatedTask.id,
      word: {
        title: updatedTask.title,
        description: updatedTask.description,
        topic: updatedTask.topic,
        status: updatedTask.status,
        date: updatedTask.date
      }
    });
    
     
    tasks.value = updatedTasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description || '',
      topic: task.topic,
      status: task.status,
      date: task.date ? new Date(task.date).toLocaleDateString('ru-RU') : ''
    }));
    
    closeModal()
  } catch (err) {
    error.value = 'Ошибка сохранения задачи';
  }
}
    const handleDeleteTask = async (task) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  if (confirm('Вы уверены, что хотите удалить задачу?')) {
    try {
      const updatedTasks = await deleteWord({ token, id: task.id });
      
       
      tasks.value = updatedTasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description || '',
        topic: task.topic,
        status: task.status,
        date: task.date ? new Date(task.date).toLocaleDateString('ru-RU') : ''
      }));
      
      closeModal()
    } catch (err) {
      error.value = 'Ошибка удаления задачи';
    }
  }
}

const handleDeleteTaskFromEdit = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  if (confirm('Вы уверены, что хотите удалить задачу?')) {
    try {
      const updatedTasks = await deleteWord({ token, id });
      
       
      tasks.value = updatedTasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description || '',
        topic: task.topic,
        status: task.status,
        date: task.date ? new Date(task.date).toLocaleDateString('ru-RU') : ''
      }));
      
      closeModal()
    } catch (err) {
      error.value = 'Ошибка удаления задачи';
    }
  }
}
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userLogin');
      router.push('/login');
    };

     
    watch(() => route.params.id, async (newId) => {
      if (newId && (route.name === 'task-modal' || route.name === 'edit-modal')) {
        // Если задачи еще не загружены или нужно обновить
        if (tasks.value.length === 0) {
          await loadTasks();
        }
        const task = tasks.value.find(t => t.id === newId);
        if (task) {
          selectedTask.value = task;
        }
      }
    });

    onMounted(() => {
      loadTasks();
    });

    return {
      isNewCardModalOpen,
      isTaskModalOpen,
      isEditModalOpen,
      isExitModalOpen,
      selectedTask,
      tasks,
      error,
      columns,
      getTasksByStatus,
      getColorByTopic,
      openNewCardModal,
      openExitModal,
      openTaskModal,
      openEditModal,
      closeModal,
      handleSaveTask,
      handleDeleteTask,
      handleDeleteTaskFromEdit,
      handleCreateTask,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #F1F1F1;
}

.dark-theme .wrapper {
  background-color: #121212;
}

.empty-message {
  width: 220px;            
  height: 130px;           
  padding: 15px 13px 19px;  
  text-align: center;
  color: #94A6BE;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 10px;      
  margin-bottom: 5px;     
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.dark-theme .empty-message {
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed #4E5566;
  color: #94A6BE;
}
</style>
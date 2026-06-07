<template>
  <div>
    <div class="wrapper">
      <ExitModal v-if="showExitModal" @close="showExitModal = false" @confirm="handleLogout" />
      <NewCardModal v-if="showNewCardModal" @close="showNewCardModal = false" @create="handleCreateTask" />
      
      <!-- Модалка просмотра задачи -->
      <TaskModal 
        v-if="showTaskModal && selectedTask" 
        :task="selectedTask"
        @close="showTaskModal = false"
        @edit="openEditModal"
        @delete="handleDeleteTask"
      />

      <!-- Модалка редактирования задачи -->
      <EditTaskModal 
        v-if="showEditModal && selectedTask" 
        :task="selectedTask"
        @close="showEditModal = false"
        @save="handleSaveTask"
        @delete="handleDeleteTaskFromEdit"
      />
      
      <AppHeader @open-exit-modal="showExitModal = true" @open-new-card-modal="showNewCardModal = true" />

      <div v-if="error" class="error-banner">
        {{ error }}
        <button @click="loadTasks" class="retry-btn">Повторить</button>
      </div>

      <TaskDesk>
        <TaskColumn v-for="column in columns" :key="column.status" :title="column.title">
          <div v-if="getTasksByStatus(column.status).length === 0" class="empty-message">Задач нет</div>
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
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
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
    const showExitModal = ref(false);
    const showNewCardModal = ref(false);
    const showTaskModal = ref(false);
    const showEditModal = ref(false);
    const selectedTask = ref(null);
    const tasks = ref([]);
    const error = ref('');

    const columns = [
      { status: "Без статуса", title: "Без статуса" },
      { status: "Нужно сделать", title: "Нужно сделать" },
      { status: "В работе", title: "В работе" },
      { status: "Тестирование", title: "Тестирование" },
      { status: "Готово", title: "Готово" }
    ];

    const loadTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      
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
      } catch (err) {
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

    const openTaskModal = (id) => {
      const task = tasks.value.find(t => t.id === id);
      if (task) {
        selectedTask.value = task;
        showTaskModal.value = true;
      }
    };

    
    const openEditModal = (task) => {
      showTaskModal.value = false;
      selectedTask.value = task;
      showEditModal.value = true;
    };

    const handleSaveTask = async (updatedTask) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        await editWord({
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
        await loadTasks();
        showEditModal.value = false;
      } catch (err) {
      }
    };

    
    const handleDeleteTaskFromEdit = async (id) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      if (confirm('Вы уверены, что хотите удалить задачу?')) {
        try {
          await deleteWord({ token, id });
          await loadTasks();
          showEditModal.value = false;
        } catch (err) {
        }
      }
    };

    
    const handleDeleteTask = async (task) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      if (confirm('Вы уверены, что хотите удалить задачу?')) {
        try {
          await deleteWord({ token, id: task.id });
          await loadTasks();
          showTaskModal.value = false;
        } catch (err) {
        }
      }
    };

    const handleCreateTask = async (newTask) => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      
      let formattedDate = '';
      if (newTask.date) {
        const dateObj = new Date(newTask.date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toISOString();
        }
      }
      
      try {
        await postWord({ 
          token, 
          word: {
            title: newTask.title,
            description: newTask.description || 'Нет описания',
            topic: newTask.topic || 'Research',
            status: newTask.status || 'Без статуса',
            date: formattedDate || new Date().toISOString()
          } 
        });
        await loadTasks();
        showNewCardModal.value = false;
      } catch (err) {
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userLogin');
      router.push('/login');
    };

    onMounted(() => {
      loadTasks();
    });

    return {
      showExitModal,
      showNewCardModal,
      showTaskModal,
      showEditModal,
      selectedTask,
      tasks,
      error,
      columns,
      getTasksByStatus,
      getColorByTopic,
      openTaskModal,
      openEditModal,
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
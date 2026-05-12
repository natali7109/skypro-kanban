<template>
  <div>
    <div class="wrapper">
      <!-- Модалка выхода -->
      <ExitModal v-if="showExitModal" @close="showExitModal = false" @confirm="handleLogout" />
      
      <!-- Модалка создания задачи -->
      <NewCardModal 
        v-if="showNewCardModal" 
        @close="showNewCardModal = false" 
        @create="handleCreateTask" 
      />
      
      <!-- Шапка с обработчиками событий -->
      <AppHeader 
        @open-exit-modal="showExitModal = true" 
        @open-new-card-modal="showNewCardModal = true"
      />

      <!-- Доска с задачами -->
      <TaskDesk>
        <TaskColumn 
          v-for="column in columns" 
          :key="column.status"
          :title="column.title"
        >
          <div v-if="getTasksByStatus(column.status).length === 0" class="empty-message">
            Задач нет
          </div>
          <TaskCard
          :id="task.id"
  v-for="task in getTasksByStatus(column.status)"
  :key="task.id"
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
import BaseHeader from '@/components/BaseHeader.vue'  
import Content from '@/components/Content.vue'  
import { fetchWords } from '@/services/api'  
import { onMounted, ref } from 'vue'  

import { ref } from "vue";
import { tasks } from "../mocks/tasks.js";
import { useRouter } from 'vue-router'
import AppHeader from "../components/AppHeader.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskColumn from "../components/TaskColumn.vue";
import TaskDesk from "../components/TaskDesk.vue";
import NewCardModal from "../components/NewCardModal.vue";
import ExitModal from "../components/ExitModal.vue";

export default {
  name: "HomeView",
  components: {
    AppHeader,
    TaskCard,
    TaskColumn,
    TaskDesk,
    NewCardModal,
    ExitModal,
  },

const words = ref([])
const loading = ref(false)
const error = ref('')  
const getWords = async () => {  
   try {  
      loading.value = true  
      const data = await fetchWords({  
      token: 'bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck',  
   })  

   if (data) words.value = data  

   } catch (err) {  
      error.value = err.message  

   } finally {  
      loading.value = false  
   }  
}  

onMounted(getWords)

  setup() {
    const router = useRouter()
    const showExitModal = ref(false);
    const showNewCardModal = ref(false);

    const columns = [
      { status: "Без статуса", title: "Без статуса" },
      { status: "Нужно сделать", title: "Нужно сделать" },
      { status: "В работе", title: "В работе" },
      { status: "Тестирование", title: "Тестирование" },
      { status: "Готово", title: "Готово" }
    ];

    const getTasksByStatus = (status) => {
      return tasks.filter(task => task.status === status);
    };

    const getColorByTopic = (topic) => {
      const colors = {
        "Web Design": "orange",
        Research: "green",
        Copywriting: "purple"
      };
      return colors[topic] || "orange";
    };

 

const openTaskModal = (id) => {   // 👈 замени task на id
  console.log('Переход на карточку с id:', id)
  router.push(`/card/${id}`)       // 👈 используем id напрямую
}

    const handleCreateTask = (newTask) => {
      console.log('Создать задачу:', newTask);
      showNewCardModal.value = false;
    };

    const handleLogout = () => {
      localStorage.removeItem('isAuth')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      router.push('/login')
    };

    return {
      showExitModal,
      showNewCardModal,
      columns,
      getTasksByStatus,
      getColorByTopic,
      openTaskModal,
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

.empty-message {
  padding: 20px;
  text-align: center;
  color: #94A6BE;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 12px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div>
    <div class="wrapper">
      <ExitModal v-if="showExitModal" @close="showExitModal = false" @confirm="handleLogout" />
      <NewCardModal v-if="showNewCardModal" @close="showNewCardModal = false" @create="handleCreateTask" />
      <TaskModal v-if="showTaskModal" @close="showTaskModal = false" />
      
      <AppHeader 
        @open-exit-modal="showExitModal = true" 
        @open-new-card-modal="showNewCardModal = true"
      />

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
            v-else
            v-for="task in getTasksByStatus(column.status)"
            :key="task.id"
            :categoryName="task.topic"
            :categoryColor="getColorByTopic(task.topic)"
            :title="task.title"
            :date="task.date"
            @open-task-modal="openTaskModal(task)"
          />
        </TaskColumn>
      </TaskDesk>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { tasks } from "../mocks/tasks.js";
import AppHeader from "../components/AppHeader.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskColumn from "../components/TaskColumn.vue";
import TaskDesk from "../components/TaskDesk.vue";
import NewCardModal from "../components/NewCardModal.vue";
import TaskModal from "../components/TaskModal.vue";
import ExitModal from "../components/ExitModal.vue";

export default {
  name: "HomeView",
  components: {
    AppHeader,
    TaskCard,
    TaskColumn,
    TaskDesk,
    NewCardModal,
    TaskModal,
    ExitModal,
  },
  setup() {
    const showExitModal = ref(false);
    const showNewCardModal = ref(false);
    const showTaskModal = ref(false);
    const selectedTask = ref(null);

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

    const openTaskModal = (task) => {
      selectedTask.value = task;
      showTaskModal.value = true;
    };

    const handleCreateTask = (newTask) => {
      console.log('Создать задачу:', newTask);
      // TODO: добавить задачу в tasks
    };

    const handleLogout = () => {
      console.log('Выход из аккаунта');
      // TODO: реальный выход
    };

    return {
      showExitModal,
      showNewCardModal,
      showTaskModal,
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

@media screen and (max-width: 495px) {
  .container {
    width: 100%;
    padding: 0 16px;
  }
}
</style>
<template>
  <div>
    <div class="wrapper">
      <ExitModal v-if="showExitModal" @close="showExitModal = false" />
      <NewCardModal />
      <TaskModal />
      <AppHeader @open-exit-modal="showExitModal = true" />

      <TaskDesk>
        <TaskColumn 
          v-for="column in columns" 
          :key="column.status"
          :title="column.title"
        >
          <TaskCard
            v-for="task in getTasksByStatus(column.status)"
            :key="task.id"
            :categoryName="task.topic"
            :categoryColor="getColorByTopic(task.topic)"
            :title="task.title"
            :date="task.date"
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

    // Массив колонок (статусов)
    const columns = [
      { status: "Без статуса", title: "Без статуса" },
      { status: "Нужно сделать", title: "Нужно сделать" },
      { status: "В работе", title: "В работе" },
      { status: "Тестирование", title: "Тестирование" },
      { status: "Готово", title: "Готово" }
    ];

    // Фильтрация задач по статусу
    const getTasksByStatus = (status) => {
      return tasks.filter(task => task.status === status);
    };

    // Цвета для категорий
    const getColorByTopic = (topic) => {
      const colors = {
        "Web Design": "orange",
        Research: "green",
        Copywriting: "purple"
      };
      return colors[topic] || "orange";
    };

    return {
      showExitModal,
      columns,
      getTasksByStatus,
      getColorByTopic,
    };
  },
};
</script>
<template>
  <div>
    <div class="wrapper">
      <ExitModal v-if="showExitModal" @close="showExitModal = false" />

      <NewCardModal />

      <TaskModal />

      <AppHeader @open-exit-modal="showExitModal = true" />

      <TaskDesk>
        <TaskColumn title="Без статуса">
          <TaskCard
            categoryName="Web Design"
            categoryColor="orange"
            title="Название задачи"
            date="30.10.23"
          />
          <TaskCard
            categoryName="Research"
            categoryColor="green"
            title="Название задачи"
            date="30.10.23"
          />
          <TaskCard
            categoryName="Web Design"
            categoryColor="orange"
            title="Название задачи"
            date="30.10.23"
          />
          <TaskCard
            categoryName="Copywriting"
            categoryColor="purple"
            title="Название задачи"
            date="30.10.23"
          />
          <TaskCard
            categoryName="Web Design"
            categoryColor="orange"
            title="Название задачи"
            date="30.10.23"
          />
        </TaskColumn>

        <TaskColumn title="Нужно сделать">
          <TaskCard
            categoryName="Research"
            categoryColor="green"
            title="Название задачи"
            date="30.10.23"
          />
        </TaskColumn>
        <TaskColumn title="В работе">
          <TaskCard
            categoryName="Research"
            categoryColor="green"
            title="Название задачи"
            date="30.10.23"
          />
          <TaskCard
            categoryName="Copywriting"
            categoryColor="purple"
            title="Название задачи"
            date="30.10.23"
          />
          <TaskCard
            categoryName="Web Design"
            categoryColor="orange"
            title="Название задачи"
            date="30.10.23"
          />
        </TaskColumn>
        <TaskColumn title="Тестирование">
          <TaskCard
            categoryName="Research"
            categoryColor="green"
            title="Название задачи"
            date="30.10.23"
          />
        </TaskColumn>
        <TaskColumn title="Готово">
          <TaskCard
            categoryName="Research"
            categoryColor="green"
            title="Название задачи"
            date="30.10.23"
          />
        </TaskColumn>
      </TaskDesk>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
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

    const backlogTasks = computed(() =>
      tasks.filter((t) => t.status === "Без статуса")
    );
    const needToDoTasks = computed(() =>
      tasks.filter((t) => t.status === "Нужно сделать")
    );
    const inProgressTasks = computed(() =>
      tasks.filter((t) => t.status === "В работе")
    );
    const testingTasks = computed(() =>
      tasks.filter((t) => t.status === "Тестирование")
    );
    const doneTasks = computed(() =>
      tasks.filter((t) => t.status === "Готово")
    );

    const getColorByTopic = (topic) => {
      const colors = {
        "Web Design": "orange",
        Research: "green",
        Copywriting: "purple",
      };
      return colors[topic] || "orange";
    };

    return {
      showExitModal,
      backlogTasks,
      needToDoTasks,
      inProgressTasks,
      testingTasks,
      doneTasks,
      getColorByTopic,
    };
  },
};
</script>

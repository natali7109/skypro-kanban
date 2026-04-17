<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <!-- СКЕЛЕТОН -->
          <div v-if="loading" class="skeleton-wrapper">
            <div class="skeleton-columns">
              <div v-for="i in 5" :key="i" class="skeleton-column">
                <div class="skeleton-title"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
              </div>
            </div>
          </div>
          <!-- РЕАЛЬНЫЙ КОНТЕНТ -->
          <div v-else class="task-desk">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>

<style scoped>
/* Скелетон - контейнер */
.skeleton-wrapper {
  padding: 20px 0;
}

.skeleton-columns {
  display: flex;
  gap: 20px;
  overflow-x: auto;
}

.skeleton-column {
  min-width: 280px;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 16px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 16px;
}

.skeleton-card {
  height: 100px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
  margin-bottom: 12px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Обычные стили */
.task-desk {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 1200px) {
  .task-desk {
    flex-direction: row;
    overflow-x: auto;
    align-items: flex-start;
  }
}
</style>
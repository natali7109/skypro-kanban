<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <!-- СКЕЛЕТОН — показывается пока грузятся данные -->
          <div v-if="isLoading" class="skeleton-wrapper">
            <div class="skeleton-columns">
              <div v-for="i in 5" :key="i" class="skeleton-column">
                <div class="skeleton-title"></div>
                <div v-for="j in 3" :key="j" class="skeleton-card">
                  <div class="skeleton-theme"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-date"></div>
                </div>
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
defineProps({
  isLoading: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  background-color: var(--bg-main, #EAEEF6);
}

.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}

.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}

.main__content {
  width: 100%;
  display: flex;
  justify-content: center;  
}

/* ========== СКЕЛЕТОН ========== */
.skeleton-wrapper {
  width: 100%;
  overflow-x: auto;
}

.skeleton-columns {
  display: flex;
  gap: 20px;
  justify-content: center;  
  min-width: min-content;
}

.skeleton-column {
  width: 220px;
  flex-shrink: 0;
}

.skeleton-title {
  width: 100px;
  height: 20px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 20px;
}

.skeleton-card {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 15px 13px 19px;
  margin-bottom: 12px;
  height: 130px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-theme {
  width: 80px;
  height: 20px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 18px;
}

.skeleton-text {
  width: 90%;
  height: 18px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-date {
  width: 60px;
  height: 13px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* ========== АДАПТИВ ========== */
@media screen and (max-width: 1200px) {
  .container {
    padding: 0 16px;
  }
  
  .main__block {
    padding: 40px 0 64px;
  }
  
  .main__content {
    display: block;
  }
  
  .skeleton-columns {
    justify-content: flex-start;
    padding-bottom: 20px;
  }
}

@media (min-width: 1200px) {
  .task-desk {
    display: flex;
    flex-direction: row;
    justify-content: center;  
    overflow-x: auto;
    align-items: flex-start;
  }
}
</style>
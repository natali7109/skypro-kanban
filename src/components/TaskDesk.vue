<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <!-- СКЕЛЕТОН -->
        <div v-if="loading" class="skeleton-wrapper">
            <div class="skeleton-columns">
              <div v-for="i in 5" :key="i" class="skeleton-column">
                <div class="column__title">
                  <div class="skeleton-title"></div>
                </div>
                <div class="cards">
                  <div v-for="j in 3" :key="j" class="cards__item">
                    <div class="cards__card skeleton-card">
                      <div class="card__group">
                        <div class="skeleton-theme"></div>
                        <div class="card__btn">
                          <div></div><div></div><div></div>
                        </div>
                      </div>
                      <div class="card__content">
                        <div class="skeleton-text"></div>
                        <div class="card__date">
                          <div class="skeleton-icon"></div>
                          <div class="skeleton-date"></div>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>

<style scoped>
.main {
  width: 100%;
  background-color: var(--bg-main, #EAEEF6);
}

.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}

.main__content {
  width: 100%;
  display: flex;
}

/* ========== СКЕЛЕТОН ========== */
.skeleton-wrapper {
  width: 100%;
  overflow-x: auto;
}

.skeleton-columns {
  display: flex;
  gap: 20px;
  min-width: min-content;
}

.skeleton-column {
  width: 220px;
  flex-shrink: 0;
}

.skeleton-column__title {
  height: 20px;
  width: 100px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 20px;
}

.skeleton-card {
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 10px;
  padding: 15px 13px 19px;
  margin-bottom: 12px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.skeleton-card__theme {
  width: 80px;
  height: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 18px;
}

.skeleton-card__title {
  width: 90%;
  height: 18px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.skeleton-card__date {
  width: 60px;
  height: 13px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

/* Анимация shimmer */
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
  .main__block {
    padding: 40px 0 64px;
  }
  
  .main__content {
    display: block;
  }
  
  .skeleton-columns {
    padding-bottom: 20px;
  }
}

@media (min-width: 1200px) {
  .task-desk {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    align-items: flex-start;
  }
}
</style>
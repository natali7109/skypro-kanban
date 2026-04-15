<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <div v-if="loading" class="loading">
            Данные загружаются...
          </div>
          <div v-else>
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
.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
}
</style>
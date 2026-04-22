<template>
  <div class="card-page">
    <div class="container">
      <div class="card-block">
        <div class="card-header">
          <h2>{{ task?.title || 'Загрузка...' }}</h2>
          <div class="card-actions">
            <router-link :to="`/edit/${id}`" class="btn-edit">Редактировать</router-link>
            <button @click="deleteTask" class="btn-delete">Удалить</button>
            <router-link to="/" class="btn-back">Назад</router-link>
          </div>
        </div>

        <div class="card-content">
          <div class="info-row">
            <span class="label">Категория:</span>
            <span class="category" :class="categoryClass">{{ task?.topic }}</span>
          </div>

          <div class="info-row">
            <span class="label">Статус:</span>
            <span class="value">{{ task?.status }}</span>
          </div>

          <div class="info-row">
            <span class="label">Описание:</span>
            <p class="description">{{ task?.description || 'Нет описания' }}</p>
          </div>

          <div class="info-row">
            <span class="label">Срок исполнения:</span>
            <span class="value">{{ task?.date || 'не указана' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tasks } from '../mocks/tasks.js'

export default {
  name: 'CardView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = Number(route.params.id)
    const task = ref(null)

    const categoryClass = computed(() => {
      const colors = {
        'Web Design': '_orange',
        'Research': '_green',
        'Copywriting': '_purple'
      }
      return colors[task.value?.topic] || '_orange'
    })

    const loadTask = () => {
      task.value = tasks.find(t => t.id === id)
      if (!task.value) {
        router.push('/404')
      }
    }

    const deleteTask = () => {
      if (confirm('Удалить задачу?')) {
        // TODO: удалить задачу
        router.push('/')
      }
    }

    onMounted(() => {
      loadTask()
    })

    return { task, id, categoryClass, deleteTask }
  }
}
</script>

<style scoped>
.card-page {
  min-height: 100vh;
  background: #F1F1F1;
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.card-block {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.card-header h2 {
  font-size: 24px;
  color: #333;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete, .btn-back {
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit {
  background: #565EEF;
  color: white;
  border: none;
}

.btn-delete {
  background: #ff4444;
  color: white;
  border: none;
}

.btn-back {
  background: #94A6BE;
  color: white;
}

.info-row {
  margin-bottom: 20px;
}

.label {
  font-weight: 600;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.value {
  color: #333;
}

.category {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 18px;
  font-size: 12px;
}

._orange {
  background: #FFE4C2;
  color: #FF6D00;
}

._green {
  background: #B4FDD1;
  color: #06B16E;
}

._purple {
  background: #E9D4FF;
  color: #9A48F1;
}

.description {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  color: #333;
  line-height: 1.5;
}

/* Тёмная тема */
.dark-theme .card-page {
  background: #151419;
}

.dark-theme .card-block {
  background: #20202C;
}

.dark-theme .card-header h2 {
  color: #FFFFFF;
}

.dark-theme .label {
  color: #94A6BE;
}

.dark-theme .value {
  color: #FFFFFF;
}

.dark-theme .description {
  background: #151419;
  color: #FFFFFF;
}
</style>
<template>
  <div class="edit-page">
    <div class="container">
      <div class="form-block">
        <h2>Редактирование задачи</h2>
        <p><strong>ID задачи:</strong> {{ id }}</p>
        
        <div class="form-group">
          <label>Название задачи</label>
          <input v-model="title" type="text" />
        </div>

        <div class="form-group">
          <label>Статус</label>
          <select v-model="status">
            <option>Без статуса</option>
            <option>Нужно сделать</option>
            <option>В работе</option>
            <option>Тестирование</option>
            <option>Готово</option>
          </select>
        </div>

        <div class="form-actions">
          <button @click="save" class="btn-save">Сохранить</button>
          <router-link :to="`/card/${id}`" class="btn-cancel">Отмена</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tasks } from '../mocks/tasks.js'

export default {
  name: 'EditView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = Number(route.params.id)
    const title = ref('')
    const status = ref('')

    const loadTask = () => {
      const task = tasks.find(t => t.id === id)
      if (task) {
        title.value = task.title
        status.value = task.status
      } else {
        router.push('/404')
      }
    }

    const save = () => {
      alert(`Сохранение задачи ${id} (пока не реализовано)`)
      router.push(`/card/${id}`)
    }

    onMounted(() => {
      loadTask()
    })

    return { id, title, status, save }
  }
}
</script>

<style scoped>
.edit-page {
  min-height: 100vh;
  background: #F1F1F1;
  padding: 40px 20px;
}
.container {
  max-width: 500px;
  margin: 0 auto;
}
.form-block {
  background: white;
  border-radius: 10px;
  padding: 30px;
}
.form-block h2 {
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}
.btn-save {
  background: #565EEF;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-cancel {
  background: #94A6BE;
  color: white;
  padding: 8px 20px;
  border-radius: 4px;
  text-decoration: none;
}
</style>
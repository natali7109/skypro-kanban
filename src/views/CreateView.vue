<template>
  <div class="create-page">
    <div class="container">
      <div class="form-block">
        <h2>Создание задачи</h2>

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
          <button @click="create" class="btn-create">Создать</button>
          <router-link to="/" class="btn-cancel">Отмена</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CreateView',
  setup() {
    const title = ref('')
    const status = ref('Без статуса')
    const router = useRouter()

    const create = () => {
      alert(`Создание задачи "${title.value}" (пока не реализовано)`)
      router.push('/')
    }

    return { title, status, create }
  }
}
</script>

<style scoped>
.create-page {
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
.btn-create {
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
<template>
  <div class="create-page">
    <div class="container">
      <div class="form-block">
        <h2>Создание задачи</h2>

        <div class="form-group">
          <label>Название задачи</label>
          <input v-model="title" type="text" placeholder="Введите название" />
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
      if (!title.value.trim()) {
        alert('Введите название задачи')
        return
      }
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
  background: var(--color-bg-light, #F1F1F1);
  padding: 40px 20px;
  width: 100%;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.form-block {
  background: var(--color-white, #FFFFFF);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border-light, #D4DBE5);
}

.form-block h2 {
  margin-bottom: 25px;
  color: var(--color-black, #333333);
  font-size: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--color-placeholder, #555555);
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border-light, #dddddd);
  border-radius: 6px;
  font-size: 16px;
  background: var(--color-white, #FFFFFF);
  color: var(--color-black, #333333);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #565EEF;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-create {
  background: #565EEF;
  color: #FFFFFF;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.btn-create:hover {
  background: #33399b;
}

.btn-cancel {
  background: #94A6BE;
  color: #FFFFFF;
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.btn-cancel:hover {
  background: #7b8da8;
}
</style>
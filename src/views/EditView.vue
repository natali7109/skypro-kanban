<template>
  <div class="edit-page">
    <div class="container">
      <div class="form-block">
        <h2>Редактирование задачи</h2>
        
        <div v-if="loading" class="loading-state">
          <div class="spinner-small"></div>
          <p>Загрузка задачи...</p>
        </div>
        
        <template v-else-if="task">
          <div class="form-group">
            <label>Название задачи</label>
            <input v-model="task.title" type="text" :disabled="saving" />
          </div>

          <div class="form-group">
            <label>Описание задачи</label>
            <textarea v-model="task.description" :disabled="saving" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label>Категория</label>
            <select v-model="task.topic" :disabled="saving">
              <option value="Web Design">Web Design</option>
              <option value="Research">Research</option>
              <option value="Copywriting">Copywriting</option>
            </select>
          </div>

          <div class="form-group">
            <label>Статус</label>
            <select v-model="task.status" :disabled="saving">
              <option>Без статуса</option>
              <option>Нужно сделать</option>
              <option>В работе</option>
              <option>Тестирование</option>
              <option>Готово</option>
            </select>
          </div>

          <div class="form-group">
            <label>Дата выполнения</label>
            <input type="date" v-model="task.date" :disabled="saving" />
          </div>

          <div v-if="errorMessage" class="error-message-small">
            {{ errorMessage }}
          </div>

          <div class="form-actions">
            <button @click="save" class="btn-save" :disabled="saving">
              {{ saving ? 'Сохранение...' : 'Сохранить' }}
            </button>
            <button @click="cancel" class="btn-cancel">Отмена</button>
          </div>
        </template>

        <div v-else class="not-found">
          <p>Задача не найдена</p>
          <button @click="$router.push('/')" class="btn-save">Вернуться на главную</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchWordById, editWord } from '../services/api.js'

export default {
  name: 'EditView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    // НЕ ПРЕОБРАЗУЕМ В NUMBER — оставляем как строку
    const id = route.params.id
    
    const task = ref(null)
    const loading = ref(true)
    const saving = ref(false)
    const errorMessage = ref('')

    const loadTask = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        errorMessage.value = 'Нет токена авторизации'
        loading.value = false
        return
      }
      
      loading.value = true
      errorMessage.value = ''
      
      try {
        const word = await fetchWordById({ token, id })
        
        if (word) {
          task.value = {
            id: word._id,
            title: word.title,
            description: word.description || '',
            topic: word.topic,
            status: word.status,
            date: word.date ? word.date.split('T')[0] : ''
          }
        } else {
          task.value = null
        }
      } catch (error) {
        console.error('Ошибка загрузки задачи:', error)
        errorMessage.value = 'Не удалось загрузить задачу'
        task.value = null
      } finally {
        loading.value = false
      }
    }

    const save = async () => {
      if (!task.value) return
      
      if (!task.value.title.trim()) {
        errorMessage.value = 'Введите название задачи'
        return
      }
      
      const token = localStorage.getItem('token')
      if (!token) {
        errorMessage.value = 'Нет токена авторизации'
        return
      }
      
      saving.value = true
      errorMessage.value = ''
      
      try {
        await editWord({
          token,
          id: task.value.id,
          word: {
            title: task.value.title,
            description: task.value.description,
            topic: task.value.topic,
            status: task.value.status,
            date: task.value.date
          }
        })
        
        router.push('/')
        
      } catch (error) {
        console.error('Ошибка сохранения:', error)
        errorMessage.value = 'Не удалось сохранить задачу'
      } finally {
        saving.value = false
      }
    }

    const cancel = () => {
      router.push('/')
    }

    onMounted(() => {
      loadTask()
    })

    return { task, loading, saving, errorMessage, save, cancel }
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
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #565EEF;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-save {
  background: #565EEF;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-save:hover:not(:disabled) {
  background: #33399b;
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: #94A6BE;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #7a8aa0;
}


.loading-state {
  text-align: center;
  padding: 40px 20px;
}

.spinner-small {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #565EEF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message-small {
  margin: 15px 0;
  padding: 10px;
  background: #ffebee;
  color: #c62828;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
}

.not-found {
  text-align: center;
  padding: 40px;
}

.not-found p {
  margin-bottom: 20px;
  color: #666;
}
</style>
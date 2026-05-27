<template>
  <div class="card-page">
    <div class="card-modal">
      <div class="card-modal__content" v-if="task">
        <div class="task-header">
          <h2 class="task-title">{{ task.title }}</h2>
          <div class="category-badge" :class="categoryBadgeClass">
            {{ task.topic }}
          </div>
        </div>

        <div class="info-section">
          <div class="section-title">Статус</div>
          <div class="status-list">
            <span 
              v-for="s in statuses" 
              :key="s"
              class="status-item"
              :class="{ active: task.status === s }"
              @click="updateStatus(s)"
            >
              {{ s }}
            </span>
          </div>
        </div>

        <div class="two-columns">
          <div class="info-section description-section">
            <div class="section-title">Описание задачи</div>
            <textarea v-model="task.description"></textarea>
          </div>

          <div class="info-section calendar-section">
            <div class="section-title">Даты</div>
            <div class="calendar">
              <div class="calendar-header">
                <span class="calendar-month">Срок исполнения</span>
              </div>
              <div class="calendar-footer">
                <input type="date" v-model="task.date" class="date-input" />
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <div class="buttons-left">
            <button class="btn-save" @click="saveTask">Сохранить</button>
            <button class="btn-cancel" @click="$router.push('/')">Отменить</button>
            <button class="btn-delete" @click="deleteTask">Удалить задачу</button>
          </div>
          <div class="buttons-right">
            <button class="btn-close" @click="$router.push('/')">Закрыть</button>
          </div>
        </div>
      </div>
      <div v-else class="loading-state">Загрузка...</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchWordById, editWord, deleteWord } from '../services/api.js'

export default {
  name: 'CardView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const id = route.params.id
    const task = ref(null)

    const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

    const categoryBadgeClass = computed(() => {
      if (!task.value) return 'category-orange'
      const map = { 
        'Web Design': 'category-orange', 
        'Research': 'category-green', 
        'Copywriting': 'category-purple' 
      }
      return map[task.value.topic] || 'category-orange'
    })

    const loadTask = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }
      
      try {
        const data = await fetchWordById({ token, id })
        if (data) {
          task.value = {
            id: data._id,
            title: data.title,
            description: data.description || '',
            topic: data.topic,
            status: data.status,
            date: data.date ? data.date.split('T')[0] : ''
          }
        } else {
          router.push('/404')
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error)
        router.push('/404')
      }
    }

    const updateStatus = async (newStatus) => {
      if (!task.value) return
      const oldStatus = task.value.status
      task.value.status = newStatus
      
      const token = localStorage.getItem('token')
      try {
        await editWord({
          token,
          id: task.value.id,
          word: {
            title: task.value.title,
            description: task.value.description,
            topic: task.value.topic,
            status: newStatus,
            date: task.value.date
          }
        })
      } catch (error) {
        task.value.status = oldStatus
        console.error('Ошибка обновления статуса:', error)
      }
    }

    const saveTask = async () => {
      const token = localStorage.getItem('token')
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
        alert('Задача сохранена')
      } catch (error) {
        console.error('Ошибка сохранения:', error)
        alert('Не удалось сохранить задачу')
      }
    }

    const deleteTask = async () => {
      if (!confirm('Удалить задачу?')) return
      const token = localStorage.getItem('token')
      try {
        await deleteWord({ token, id: task.value.id })
        router.push('/')
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить задачу')
      }
    }

    onMounted(() => loadTask())

    return { task, statuses, categoryBadgeClass, updateStatus, saveTask, deleteTask }
  }
}
</script>

<style scoped>
/* Затемнённый фон */
.card-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #D4DBE5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
}

/* Модальное окно */
.card-modal {
  max-width: 720px;
  width: 90%;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.card-modal__content {
  padding: 32px 30px;
}

/* Заголовок */
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #D4DBE5;
}

.task-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #000000;
}

/* Бейдж категории */
.category-badge {
  padding: 6px 16px;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 500;
}

.category-orange {
  background: #FFE4C2;
  color: #FF6D00;
}

.category-green {
  background: #B4FDD1;
  color: #06B16E;
}

.category-purple {
  background: #E9D4FF;
  color: #9A48F1;
}

/* Секции */
.info-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #000000;
}

/* Две колонки */
.two-columns {
  display: flex;
  gap: 30px;
  margin-bottom: 24px;
}

.description-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.calendar-section {
  flex: 0.6;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #D4DBE5;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  min-height: 200px;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #000000;
}

.date-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #D4DBE5;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 12px;
}

.calendar {
  border: 1px solid #D4DBE5;
  border-radius: 8px;
  padding: 12px;
  background: #FFFFFF;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.calendar-month {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
}

/* Статусы */
.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.status-item {
  padding: 8px 16px;
  border-radius: 24px;
  border: 1px solid #D4DBE5;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #000000;
  transition: all 0.2s;
}

.status-item:hover {
  background: #e0e0e0;
}

.status-item.active {
  background: #94A6BE;
  color: #FFFFFF;
  border-color: #94A6BE;
}

/* Кнопки */
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #D4DBE5;
}

.buttons-left {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.buttons-right {
  display: flex;
}

.action-buttons button {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save {
  background: #565EEF;
  color: #FFFFFF;
  border: none;
}

.btn-cancel, .btn-close {
  background: transparent;
  border: 1px solid #565EEF;
  color: #565EEF;
}

.btn-delete {
  background: transparent;
  border: 1px solid #FF4444;
  color: #FF4444;
}

.btn-save:hover {
  background: #33399b;
}

.btn-cancel:hover, .btn-close:hover {
  background: #565EEF;
  color: #FFFFFF;
}

.btn-delete:hover {
  background: #FF4444;
  color: #FFFFFF;
}

/* Тёмная тема */
.dark-theme .card-modal {
  background: #20202C;
}

.dark-theme .task-header {
  border-bottom-color: #4E5566;
}

.dark-theme .task-title,
.dark-theme .section-title,
.dark-theme .calendar-month {
  color: #FFFFFF;
}

.dark-theme textarea,
.dark-theme .calendar {
  background: #151419;
  border-color: #4E5566;
  color: #FFFFFF;
}

.dark-theme .status-item {
  border-color: #4E5566;
  color: #FFFFFF;
}

.dark-theme .status-item.active {
  background: #94A6BE;
  color: #FFFFFF;
}

.dark-theme .action-buttons {
  border-top-color: #4E5566;
}

/* Адаптив */
@media (max-width: 600px) {
  .two-columns {
    flex-direction: column;
    gap: 20px;
  }
  .task-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .action-buttons {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .buttons-left {
    justify-content: center;
  }
  .buttons-right {
    justify-content: center;
  }
  textarea {
    min-height: 150px;
  }
}
</style>
<template>
  <div class="card-page">
    <div class="card-modal">
      <div class="card-modal__content">
        <!-- Заголовок + Категория в одной строке -->
        <div class="task-header">
          <h2 class="task-title">{{ task?.title || 'Загрузка...' }}</h2>
          <div class="category-badge" :class="categoryBadgeClass">
            {{ task?.topic }}
          </div>
        </div>

        <!-- Статус -->
        <div class="info-section">
          <div class="section-title">Статус</div>
          <div class="status-list">
            <span 
              v-for="s in statuses" 
              :key="s"
              class="status-item"
              :class="{ active: task?.status === s }"
              @click="task.status = s"
            >
              {{ s }}
            </span>
          </div>
        </div>

        <!-- Описание задачи + Календарь в две колонки -->
        <div class="two-columns">
          <div class="info-section description-section">
            <div class="section-title">Описание задачи</div>
            <textarea 
              v-model="task.description" 
              placeholder="Введите описание задачи..."
            ></textarea>
          </div>

          <div class="info-section calendar-section">
            <div class="section-title">Даты</div>
            <div class="calendar">
              <div class="calendar-header">
                <span class="calendar-month">Сентябрь 2023</span>
                <div class="calendar-nav">
                  <button class="nav-arrow">⟨</button>
                  <button class="nav-arrow">⟩</button>
                </div>
              </div>
              <div class="calendar-weekdays">
                <span>пн</span><span>вт</span><span>ср</span><span>чт</span>
                <span>пт</span><span>сб</span><span>вс</span>
              </div>
              <div class="calendar-days">
                <span>1</span><span></span><span></span><span></span><span></span><span></span><span>2</span>
                <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
              </div>
              <div class="calendar-footer">
                Срок исполнения: <span>{{ task?.date || '09.10.23' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопки -->
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
    const task = ref({})

    const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

    const categoryBadgeClass = computed(() => {
      const map = { 
        'Web Design': 'category-orange', 
        'Research': 'category-green', 
        'Copywriting': 'category-purple' 
      }
      return map[task.value?.topic] || 'category-orange'
    })

    const loadTask = () => {
      const found = tasks.find(t => t.id === id)
      if (found) {
        task.value = { ...found, description: found.description || '' }
      } else {
        router.push('/404')
      }
    }

    const saveTask = () => {
      const index = tasks.findIndex(t => t.id === id)
      if (index !== -1) {
        tasks[index] = { ...task.value }
        alert('Задача сохранена')
      }
    }

    const deleteTask = () => {
      if (confirm('Удалить задачу?')) {
        const index = tasks.findIndex(t => t.id === id)
        if (index !== -1) tasks.splice(index, 1)
        router.push('/')
      }
    }

    onMounted(() => loadTask())

    return { task, statuses, categoryBadgeClass, saveTask, deleteTask }
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
  background: rgba(0, 0, 0, 0.4);
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

/* ========== СВЕТЛАЯ ТЕМА (по умолчанию) ========== */
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

/* Текстовая область — высота как у календаря */
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #D4DBE5;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  height: 100%;
  min-height: 280px;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #000000;
}

/* Календарь */
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
  font-size: 12px;
  font-weight: 600;
  color: #000000;
}

.nav-arrow {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #94A6BE;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 6px;
}

.calendar-weekdays span {
  font-size: 10px;
  color: #94A6BE;
  padding: 4px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 2px;
  margin-bottom: 12px;
}

.calendar-days span {
  font-size: 10px;
  padding: 4px;
  color: #000000;
}

.calendar-footer {
  font-size: 10px;
  color: #94A6BE;
  text-align: center;
  padding-top: 8px;
  border-top: 1px solid #D4DBE5;
}

.calendar-footer span {
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

/* ========== ТЁМНАЯ ТЕМА ========== */
.dark-theme .card-modal {
  background: #20202C;
}

.dark-theme .task-header {
  border-bottom-color: #4E5566;
}

.dark-theme .task-title {
  color: #FFFFFF;
}

.dark-theme .section-title {
  color: #FFFFFF;
}

.dark-theme textarea {
  background: #151419;
  border-color: #4E5566;
  color: #FFFFFF;
}

.dark-theme .calendar {
  background: #151419;
  border-color: #4E5566;
}

.dark-theme .calendar-month {
  color: #FFFFFF;
}

.dark-theme .calendar-days span {
  color: #FFFFFF;
}

.dark-theme .calendar-footer {
  border-top-color: #4E5566;
}

.dark-theme .calendar-footer span {
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

.two-columns {
  align-items: stretch;
}

.description-section,
.calendar-section {
  display: flex;
  flex-direction: column;
}

textarea {
  flex: 1;
  min-height: 280px;
}

.calendar {
  
  display: flex;
  flex-direction: column;
}


.two-columns {
  align-items: stretch;
}

.description-section {
  display: flex;
  flex-direction: column;
}

textarea {
  height: 100%;
  min-height: auto;
  resize: vertical;
}

.calendar-section {
  display: flex;
  flex-direction: column;
}

</style>
<template>
  <div class="pop-browse">
    <div class="pop-browse__container">
      <div class="pop-browse__block" ref="modalContentRef">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
  <h3 class="pop-browse__ttl">{{ editTitle || 'Название задачи' }}</h3>
  <div class="categories__theme" :class="categoryClass">
    <p>{{ editTopic || 'Web Design' }}</p>
  </div>
</div>

          <!-- СТАТУСЫ (активные, для выбора) -->
          <div class="status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <div 
                v-for="status in statuses" 
                :key="status"
                class="status__theme"
                :class="{ '_gray': editStatus === status }"
                @click="editStatus = status"
              >
                <p>{{ status }}</p>
              </div>
            </div>
          </div>

          <!-- ДВЕ КОЛОНКИ: 4 / 2 -->
          <div class="pop-browse__two-columns">
            <div class="pop-browse__left">
              <label class="subttl">Описание задачи</label>
              <textarea 
                class="form-browse__area" 
                v-model="editDescription"
                placeholder="Нет описания"
              ></textarea>
            </div>

            <div class="pop-browse__right">
              <p class="subttl">Даты</p>
              <div class="calendar">
                <div class="calendar-header">
                  <button class="calendar-nav" @click="changeMonth(-1)">◀</button>
                  <span class="calendar-month">{{ currentMonthName }} {{ currentYear }}</span>
                  <button class="calendar-nav" @click="changeMonth(1)">▶</button>
                </div>
                <div class="calendar-weekdays">
                  <div v-for="day in weekDays" :key="day" class="calendar-weekday">{{ day }}</div>
                </div>
                <div class="calendar-days">
                  <div 
                    v-for="day in calendarDays" 
                    :key="day"
                    class="calendar-day"
                    :class="{ 'selected': isSelectedDate(day.date) }"
                    @click="selectDate(day.date)"
                  >
                    {{ day.day }}
                  </div>
                </div>
              </div>
              <p class="calendar-deadline">
                Срок исполнения: {{ formattedDate }}
              </p>
            </div>
          </div>

          <!-- КНОПКИ -->
          <div class="pop-browse__btn-browse">
  <div class="btn-group-left">
    <button class="_btn-bg _hover01" @click="saveTask">Сохранить</button>
    <button class="_btn-cancel _hover03" @click="closeModal">Отменить</button>
    <button class="_btn-delete _hover03" @click="deleteTask">Удалить задачу</button>
  </div>
  <div class="btn-group-right">
    <button class="_btn-bg _hover01" @click="closeModal">Закрыть</button>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'EditTaskModal',
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'save', 'delete'],
  setup(props, { emit }) {
    const modalContentRef = ref(null)
    
    onClickOutside(modalContentRef, () => {
      emit('close')
    })
    
    return { modalContentRef }
  },
  data() {
    return {
      statuses: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'],
      weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      editTitle: '',
      editDescription: '',
      editTopic: 'Web Design',
      editStatus: 'Без статуса',
      editDate: ''
    }
  },
  computed: {
    categoryClass() {
      const colors = {
        'Web Design': '_orange',
        'Research': '_green', 
        'Copywriting': '_purple'
      }
      return colors[this.editTopic] || '_orange'
    },
    currentMonthName() {
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
      return months[this.currentMonth]
    },
    calendarDays() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
      const days = []
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          day: i,
          date: new Date(this.currentYear, this.currentMonth, i)
        })
      }
      return days
    },
    formattedDate() {
      if (!this.editDate) return 'не указана'
      let dateStr = this.editDate
      if (dateStr.includes('-')) {
        const parts = dateStr.split('-')
        return `${parts[2]}.${parts[1]}.${parts[0].slice(-2)}`
      }
      return dateStr
    }
  },
  watch: {
    task: {
      immediate: true,
      handler(val) {
        if (val) {
          this.editTitle = val.title || ''
          this.editDescription = val.description || ''
          this.editTopic = val.topic || 'Web Design'
          this.editStatus = val.status || 'Без статуса'
          this.editDate = val.date || ''
          if (this.editDate && this.editDate.includes('.')) {
            const parts = this.editDate.split('.')
            this.editDate = `${parts[2]}-${parts[1]}-${parts[0]}`
          }
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    saveTask() {
      if (!this.editTitle.trim()) {
        alert('Введите название задачи')
        return
      }
      this.$emit('save', {
        id: this.task.id,
        title: this.editTitle,
        description: this.editDescription,
        topic: this.editTopic,
        status: this.editStatus,
        date: this.editDate
      })
      this.closeModal()
    },
    deleteTask() {
      if (confirm('Вы уверены, что хотите удалить задачу?')) {
        this.$emit('delete', this.task.id)
        this.closeModal()
      }
    },
    changeMonth(delta) {
      let newMonth = this.currentMonth + delta
      let newYear = this.currentYear
      if (newMonth < 0) {
        newMonth = 11
        newYear--
      } else if (newMonth > 11) {
        newMonth = 0
        newYear++
      }
      this.currentMonth = newMonth
      this.currentYear = newYear
    },
    isSelectedDate(date) {
      if (!this.editDate) return false
      const selectedDate = new Date(this.editDate)
      return date.toDateString() === selectedDate.toDateString()
    },
    selectDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      this.editDate = `${year}-${month}-${day}`
    }
  }
}
</script>

<style scoped>
.pop-browse {
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
}
.pop-browse__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #FFFFFF;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  position: relative;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.pop-browse__content {
  display: block;
  text-align: left;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
/* СТАТУСЫ */
.status {
  margin-bottom: 24px;
}
.status__p {
  margin-bottom: 14px;
}
.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
}
.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94A6BE;
  background: transparent;
  padding: 11px 14px 10px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}
.status__theme._gray {
  background: rgba(148, 166, 190, 0.4);
  color: white;
  border-color: none;
}
.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}
/* ДВЕ КОЛОНКИ: 4 / 2 */
.pop-browse__two-columns {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.pop-browse__left {
  flex: 4;
  min-width: 0;
}
.pop-browse__right {
  flex: 2;
  min-width: 0;
}
/* ОПИСАНИЕ */
.form-browse__area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: #EAEEF6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  height: 250px;
  resize: vertical;
  font-family: inherit;
}
/* КАЛЕНДАРЬ - КОМПАКТНЫЙ */
.calendar {
  background: #FFFFFF;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 12px;
  padding: 10px;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.calendar-nav {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #565EEF;
  padding: 2px 6px;
}
.calendar-month {
  font-size: 13px;
  font-weight: 600;
  color: #000;
}
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 6px;
}
.calendar-weekday {
  font-size: 11px;
  color: #94A6BE;
  padding: 4px 0;
}
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 2px;
}
.calendar-day {
  font-size: 12px;
  padding: 4px 0;
  cursor: pointer;
  border-radius: 50%;
  background: transparent;
  color: #333;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  transition: all 0.2s;
}
.calendar-day:hover {
  background: #e0e0e0;
}
.calendar-day.selected {
  background: #e0e0e0;
  color: #333;
}
.calendar-deadline {
  color: #94A6BE;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
}
/* КАТЕГОРИИ */
.categories__theme {
  border-radius: 24px;
  padding: 5px 12px;
}
.categories__theme._orange {
  background: #ff9800;
  color: white;
}
.categories__theme._green {
  background: #4caf50;
  color: white;
}
.categories__theme._purple {
  background: #9c27b0;
  color: white;
}
.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  display: block;
  margin-bottom: 12px;
}
/* КНОПКИ */
.pop-browse__btn-browse {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 10px;
}

.btn-group-left {
  display: flex;
  gap: 12px;
}

.btn-group-right {
  display: flex;
  gap: 12px;
}

/* Синяя кнопка (Сохранить, Закрыть) */
._btn-bg {
  border-radius: 4px;
  background: #565EEF;
  border: none;
  outline: none;
  color: #FFFFFF;
  padding: 8px 14px;
  cursor: pointer;
}

._btn-bg:hover {
  background-color: #33399b;
}

/* Прозрачная кнопка  (Отменить) */
._btn-cancel {
  border-radius: 4px;
  border: 0.7px solid #FFFFFF;
  outline: none;
  background: transparent;
  color: #FFFFFF;
  padding: 8px 14px;
  cursor: pointer;
}

._btn-cancel:hover {
  background-color: #33399b;
  color: #FFFFFF;
  border: none;
}

/* Кнопка "Удалить задачу" (прозрачная, красная обводка, белый текст) */
._btn-delete {
  border-radius: 4px;
  border: 0.7px solid #FFFFFF;
  outline: none;
  background: transparent;
  color: #FFFFFF;
  padding: 8px 14px;
  cursor: pointer;
}

._btn-delete:hover {
  background-color: #33399b;
  color: #FFFFFF;
  border: none;
}
/* АДАПТИВ */
@media screen and (max-width: 660px) {
  .pop-browse { top: 70px; }
  .pop-browse__container { padding: 0; justify-content: flex-start; }
  .pop-browse__block { border-radius: 0; }
  .pop-browse__two-columns { flex-direction: column; }
  .pop-browse__right { flex: auto; width: 100%; }
}
@media screen and (max-width: 495px) {
  .pop-browse__block { padding: 20px 16px 32px; }
  .form-browse__area { height: 150px; }
  .pop-browse__btn-browse button { width: 100%; }
}
</style>
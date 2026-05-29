<template>
  <div class="pop-browse" @click.self="closeModal">
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">{{ task?.title || 'Название задачи' }}</h3>
            <div class="categories__theme" :class="categoryClass">
              <p>{{ task?.topic || 'Web Design' }}</p>
            </div>
          </div>
          
          <div class="status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <div 
                v-for="status in statuses" 
                :key="status"
                class="status__theme"
                :class="{ '_gray': task?.status === status }"
              >
                <p>{{ status }}</p>
              </div>
            </div>
          </div>

          <div class="form-browse__block">
            <label class="subttl">Описание задачи</label>
            <textarea 
              class="form-browse__area" 
              :value="task?.description || ''" 
              readonly
              placeholder="Нет описания"
            ></textarea>
          </div>

          <div class="calendar__period">
            <p>Срок исполнения: {{ task?.date || 'не указана' }}</p>
          </div>

          <div class="pop-browse__btn-browse">
            <button class="_btn-bor _hover03" @click="editTask">Редактировать задачу</button>
            <button class="_btn-bor _hover03" @click="deleteTask">Удалить задачу</button>
            <button class="_btn-bg _hover01" @click="closeModal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskModal',
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      statuses: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']
    }
  },
  computed: {
    categoryClass() {
      const colors = {
        'Web Design': '_orange',
        'Research': '_green', 
        'Copywriting': '_purple'
      }
      return colors[this.task?.topic] || '_orange'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    editTask() {
      this.$emit('edit', this.task)
    },
    deleteTask() {
      this.$emit('delete', this.task)
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

.status {
  margin-bottom: 11px;
}

.status__p {
  margin-bottom: 14px;
}

.status__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.status__theme {
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94A6BE;
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
}

.status__theme._gray {
  background: #e0e0e0;
  color: #333;
}

.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.form-browse__block {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-browse__area {
  max-width: 100%;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #EAEEF6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
  resize: vertical;
}

.calendar__period {
  margin-bottom: 20px;
}

.calendar__period p {
  color: #94A6BE;
  font-size: 14px;
}

.pop-browse__btn-browse {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid #565EEF;
  outline: none;
  background: transparent;
  color: #565EEF;
  padding: 8px 14px;
  cursor: pointer;
}

._btn-bg {
  border-radius: 4px;
  background: #565EEF;
  border: none;
  outline: none;
  color: #FFFFFF;
  padding: 8px 14px;
  cursor: pointer;
}

._hover01:hover {
  background-color: #33399b;
}

._hover03:hover {
  background-color: #33399b;
  color: #FFFFFF;
}

@media screen and (max-width: 660px) {
  .pop-browse {
    top: 70px;
  }
  
  .pop-browse__container {
    padding: 0;
    justify-content: flex-start;
  }
  
  .pop-browse__block {
    border-radius: 0;
  }
}

@media screen and (max-width: 495px) {
  .pop-browse__block {
    padding: 20px 16px 32px;
  }
  
  .pop-browse__btn-browse button {
    width: 100%;
    height: 40px;
  }
  
  .form-browse__area {
    height: 100px;
  }
}
</style>

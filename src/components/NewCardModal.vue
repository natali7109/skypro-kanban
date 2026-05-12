<template>
  <div class="pop-new-card" @click.self="closeModal">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <a href="#" class="pop-new-card__close" @click.prevent="closeModal">&#10006;</a>
          
          <div class="pop-new-card__wrap">
            <form class="pop-new-card__form form-new" @submit.prevent="createTask">
              <div class="form-new__block">
                <label for="formTitle" class="subttl">Название задачи</label>
                <input 
                  v-model="title"
                  class="form-new__input" 
                  type="text" 
                  id="formTitle" 
                  placeholder="Введите название задачи..." 
                  autofocus
                />
              </div>
              <div class="form-new__block">
                <label for="textArea" class="subttl">Описание задачи</label>
                <textarea 
                  v-model="description"
                  class="form-new__area" 
                  id="textArea" 
                  placeholder="Введите описание задачи..."
                ></textarea>
              </div>
            </form>
            
            <!-- Календарь (заглушка, можно потом заменить на реальный) -->
            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения: 
                    <input type="date" v-model="date" class="calendar-date-input" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <div 
                v-for="cat in categories" 
                :key="cat.name"
                class="categories__theme" 
                :class="[cat.class, { '_active-category': selectedCategory === cat.name }]"
                @click="selectedCategory = cat.name"
              >
                <p :class="cat.class">{{ cat.name }}</p>
              </div>
            </div>
          </div>
          
          <div class="pop-new-card__categories status">
            <p class="categories__p subttl">Статус</p>
            <div class="categories__themes">
              <div 
                v-for="stat in statuses" 
                :key="stat"
                class="categories__theme" 
                :class="{ '_active-category': selectedStatus === stat }"
                @click="selectedStatus = stat"
              >
                <p>{{ stat }}</p>
              </div>
            </div>
          </div>
          
          <button class="form-new__create _hover01" @click="createTask">Создать задачу</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewCardModal',
  data() {
    return {
      title: '',
      description: '',
      selectedCategory: 'Web Design',
      selectedStatus: 'Без статуса',
      date: '',
      categories: [
        { name: 'Web Design', class: '_orange' },
        { name: 'Research', class: '_green' },
        { name: 'Copywriting', class: '_purple' }
      ],
      statuses: ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    createTask() {
      if (!this.title.trim()) {
        alert('Введите название задачи')
        return
      }
      const newTask = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        topic: this.selectedCategory,
        status: this.selectedStatus,
        date: this.date || new Date().toLocaleDateString('ru-RU')
      }
      this.$emit('create', newTask)
      this.resetForm()
      this.closeModal()
    },
    resetForm() {
      this.title = ''
      this.description = ''
      this.selectedCategory = 'Web Design'
      this.selectedStatus = 'Без статуса'
      this.date = ''
    }
  }
}
</script>

<style scoped>
/* ========== СТИЛИ ПО МАКЕТУ ========== */

.pop-new-card {
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
}

.pop-new-card__container {
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

.pop-new-card__block {
  display: block;
  margin: 0 auto;
  background-color: #FFFFFF;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #D4DBE5;
  position: relative;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}

.pop-new-card__content {
  display: block;
  text-align: left;
}

.pop-new-card__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}

.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94A6BE;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
}

.pop-new-card__close:hover {
  color: #000000;
}

.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.pop-new-card__form {
  flex: 1;
  min-width: 250px;
}

.form-new__block {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-new__input,
.form-new__area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 8px;
}

.form-new__input::placeholder,
.form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  color: #94A6BE;
  letter-spacing: -0.14px;
}

.form-new__area {
  height: 120px;
  resize: vertical;
}

/* Календарь */
.calendar {
  width: 220px;
}

.calendar__ttl {
  margin-bottom: 14px;
}

.calendar__p {
  color: #94A6BE;
  font-size: 14px;
  line-height: 1;
}

.calendar-date-input {
  margin-top: 8px;
  padding: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  width: 100%;
  font-size: 14px;
}

/* Категории и статус */
.categories {
  margin-bottom: 20px;
}

.categories__themes {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.categories__theme {
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.2s;
}

.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

._active-category {
  opacity: 1 !important;
}

._orange {
  background-color: #FFE4C2;
  color: #FF6D00;
}

._green {
  background-color: #B4FDD1;
  color: #06B16E;
}

._purple {
  background-color: #E9D4FF;
  color: #9A48F1;
}

.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.form-new__create {
  width: 132px;
  height: 30px;
  background-color: #565EEF;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #FFFFFF;
  float: right;
  cursor: pointer;
}

._hover01:hover {
  background-color: #33399b;
}

/* Адаптив */
@media screen and (max-width: 660px) {
  .pop-new-card {
    top: 70px;
  }
  .pop-new-card__container {
    padding: 0;
    justify-content: flex-start;
  }
  .pop-new-card__block {
    border-radius: 0;
  }
  .pop-new-card__wrap {
    flex-direction: column;
  }
  .calendar {
    width: 100%;
  }
}

@media screen and (max-width: 495px) {
  .pop-new-card__block {
    padding: 20px 16px 32px;
  }
  .form-new__create {
    width: 100%;
    height: 40px;
  }
}
</style>
<template>
  <div class="pop-new-card" @click.self="closeModal">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <a href="#" class="pop-new-card__close" @click.prevent="closeModal">✕</a>
          
          <div class="form-new__block">
            <label class="subttl">Название задачи</label>
            <input v-model="title" class="form-new__input" placeholder="Введите название задачи..." autofocus>
          </div>
          
          <div class="form-new__block">
            <label class="subttl">Описание задачи</label>
            <textarea v-model="description" class="form-new__area" placeholder="Введите описание задачи..."></textarea>
          </div>
          
          <div class="categories">
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
          
          <div class="form-new__block">
            <label class="subttl">Срок исполнения</label>
            <input v-model="date" type="date" class="form-new__input">
          </div>
          
          <div class="form-new__block">
            <label class="subttl">Статус</label>
            <select v-model="status" class="form-new__input">
              <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
            </select>
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
      date: '',
      status: 'Без статуса',
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
      this.$emit('create', {
        title: this.title,
        description: this.description,
        topic: this.selectedCategory,
        date: this.date || new Date().toLocaleDateString('ru-RU'),
        status: this.status,
        id: Date.now()
      })
      // Очищаем форму
      this.title = ''
      this.description = ''
      this.selectedCategory = 'Web Design'
      this.date = ''
      this.status = 'Без статуса'
      this.closeModal()
    }
  }
}
</script>

<style scoped>
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

.form-new__block {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-new__input, .form-new__area {
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

.form-new__input::placeholder, .form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  color: #94A6BE;
  letter-spacing: -0.14px;
}

.form-new__area {
  height: 100px;
  resize: vertical;
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

.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

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
  margin-right: 7px;
  opacity: 0.4;
  cursor: pointer;
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

._hover01:hover {
  background-color: #33399b;
}

select.form-new__input {
  cursor: pointer;
}

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
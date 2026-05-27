<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* ========== БАЗОВЫЕ СТИЛИ (СВЕТЛАЯ ТЕМА) ========== */
.main__column {
  min-width: 0;  
  word-break: break-word;  
}


.column__title {
  padding: 0 10px;
  margin: 15px 0;
}

.column__title p {
  color: #94A6BE;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

.cards {
  width: 100%;
  display: block;
  position: relative;
}

/* ========== АДАПТИВНЫЕ СТИЛИ ========== */

@media screen and (max-width: 1200px) {
  .main__column {
     min-width: 0;  
  word-break: break-word;  
  }
  
  .cards {
    width: 100%;
    display: flex;
    overflow-y: auto;
  }
}
</style>
<template>
  <div class="pop-exit" id="popExit">
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <div class="pop-exit__form-group">
          <button class="pop-exit__exit-yes _hover01" @click="confirmExit">
            Да, выйти
          </button>
          <button class="pop-exit__exit-no _hover03" @click="cancelExit">
            Нет, остаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExitModal',
  methods: {
    confirmExit() {
      // Здесь позже добавим логику выхода (очистка данных, редирект)
      this.$emit('close')
    },
    cancelExit() {
      this.$emit('close')
    }
  }
}
</script>
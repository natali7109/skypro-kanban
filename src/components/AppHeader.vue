<template>
  <header class="header" style="position: relative;">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href=""><img src="/assets/images/logo.png" alt="logo" /></a>
        </div>
        <div class="header__logo _dark">
          <a href=""><img src="/assets/images/logo_dark.png" alt="logo" /></a>
        </div>


        <nav class="header__nav">
          <button class="header__btn-main-new _hover01">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>

          <a href="#" class="header__user _hover02" @click.prevent="toggleUserMenu">
            Ivan Ivanov
          </a>

     <div class="header__pop-user-set pop-user-set" v-show="showUserMenu">
  <p class="pop-user-set__name">Ivan Ivanov</p>
  <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>

  <div class="pop-user-set__theme">
  <p>Темная тема</p>
  <label class="switch">
    <input type="checkbox" @click="toggleTheme" />
    <span class="slider"></span>
  </label>
</div>
  <button type="button" class="_hover03" @click="handleExit">Выйти</button>
</div>

        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      showUserMenu: false,
      isDarkTheme: false
    }
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    closeUserMenu() {
      this.showUserMenu = false
    },
    handleExit() {
      this.closeUserMenu()
      this.$emit('open-exit-modal')
    },
    toggleTheme(event) {
      const isChecked = event.target.checked
      this.isDarkTheme = isChecked
      
      if (isChecked) {
        this.loadDarkTheme()
      } else {
        this.unloadDarkTheme()
      }
      
      localStorage.setItem('darkTheme', this.isDarkTheme)
    },
    loadDarkTheme() {
      if (!document.getElementById('dark-theme-styles')) {
        const link = document.createElement('link')
        link.id = 'dark-theme-styles'
        link.rel = 'stylesheet'
        link.href = '/src/assets/css/main_dark.css'
        document.head.appendChild(link)
      }
    },
    unloadDarkTheme() {
      const link = document.getElementById('dark-theme-styles')
      if (link) {
        link.remove()
      }
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('darkTheme')
    if (savedTheme === 'true') {
      this.isDarkTheme = true
      this.loadDarkTheme()
      const checkbox = this.$el.querySelector('.switch input')
      if (checkbox) checkbox.checked = true
    }
  }
}
</script>

<style scoped>
.header__pop-user-set {
display: block;
  position: absolute;
  top: 61px;
  right: 0;
  width: 250px;
  padding: 20px;
  text-align: center;
  z-index: 9999;
}
</style>


<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <router-link to="/" class="header__logo _show _light">
          <img src="/assets/images/logo.png" alt="logo" />
        </router-link>
        <router-link to="/" class="header__logo _dark">
          <img src="/assets/images/logo_dark.png" alt="logo" />
        </router-link>

        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" @click="openNewCardModal">
            Создать новую задачу
          </button>

          <button class="header__user _hover02" @click="toggleUserMenu">
            {{ userName }}
          </button>

          <div class="header__pop-user-set pop-user-set" v-show="showUserMenu">
            <p class="pop-user-set__name">{{ userName }}</p>
            <p class="pop-user-set__mail">{{ userEmail }}</p>

            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <label class="switch">
                <input type="checkbox" v-model="isDarkTheme" @change="toggleTheme" />
                <span class="slider round"></span>
              </label>
            </div>
            
            <router-link to="/exit" custom v-slot="{ navigate }">
              <button @click="navigate" class="_hover03">Выйти</button>
            </router-link>
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
      isDarkTheme: false,
      userName: localStorage.getItem('userName') || localStorage.getItem('user') || 'Пользователь',
      userEmail: localStorage.getItem('userLogin') || localStorage.getItem('email') || 'user@example.com'
    }
  },

  mounted() {
    this.loadThemePreference()
    this.updateUserData()
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    document.addEventListener('click', this.handleOutsideClick)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  },

  methods: {
    openNewCardModal() {
      this.$emit('open-new-card-modal')
    },

    toggleUserMenu() {
      this.updateUserData()
      this.showUserMenu = !this.showUserMenu
    },

    toggleTheme() {
      if (this.isDarkTheme) {
        this.enableDarkTheme()
      } else {
        this.disableDarkTheme()
      }
      localStorage.setItem('darkTheme', this.isDarkTheme)
    },

    enableDarkTheme() {
      if (!document.getElementById('dark-theme-styles')) {
        const link = document.createElement('link')
        link.id = 'dark-theme-styles'
        link.rel = 'stylesheet'
        link.href = '/src/assets/css/main_dark.css'
        document.head.appendChild(link)
      }
      document.body.classList.add('dark-theme')
    },

    disableDarkTheme() {
      const link = document.getElementById('dark-theme-styles')
      if (link) {
        link.remove()
      }
      document.body.classList.remove('dark-theme')
    },

    loadThemePreference() {
      const savedTheme = localStorage.getItem('darkTheme')
      if (savedTheme === 'true') {
        this.isDarkTheme = true
        this.enableDarkTheme()
      }
    },

    updateUserData() {
      this.userName = localStorage.getItem('userName') || localStorage.getItem('user') || 'Пользователь'
      this.userEmail = localStorage.getItem('userLogin') || localStorage.getItem('email') || 'user@example.com'
    },

    handleOutsideClick(e) {
      const userElement = this.$el?.querySelector('.header__user')
      const popupElement = this.$el?.querySelector('.header__pop-user-set')
      if (userElement && popupElement && 
          !userElement.contains(e.target) && 
          !popupElement.contains(e.target)) {
        this.showUserMenu = false
      }
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
}

.header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}

.header__logo img {
  width: 85px;
}

.header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565EEF;
  color: #FFFFFF;
  border: none;
  font-size: 14px;
  line-height: 30px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.header__user {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565EEF;
  background: none;
  border: none;
  cursor: pointer;
}

.header__user::after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid #565EEF;
  border-bottom: 1.9px solid #565EEF;
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}

.header__pop-user-set {
  display: block;
  position: absolute;
  top: 61px;
  right: 0;
  width: 250px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #FFF;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 20px;
  text-align: center;
  z-index: 1000;
}

.pop-user-set__name {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  margin-bottom: 4px;
}

.pop-user-set__mail {
  color: #94A6BE;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 15px;
}

.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.pop-user-set__theme p {
  color: #000;
  font-size: 14px;
  line-height: 21px;
}

.pop-user-set button {
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565EEF;
  border-radius: 4px;
  border: 1px solid #565EEF;
  cursor: pointer;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #565EEF;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

._hover01:hover {
  background-color: #33399b;
}

._hover02:hover {
  color: #33399b;
}

._hover02:hover::after {
  border-left-color: #33399b;
  border-bottom-color: #33399b;
}

._hover03:hover {
  background-color: #33399b;
  color: #FFFFFF;
}
</style>
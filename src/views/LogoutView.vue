<template>
  <div class="logout-page">
    <div class="logout-container">
      <h2>Выйти из аккаунта?</h2>
      <div class="logout-buttons">
        <button class="btn-yes" @click="logout">Да, выйти</button>
        <button class="btn-no" @click="cancel">Нет, остаться</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LogoutView',
  setup() {
    const router = useRouter()

    const logout = () => {
      localStorage.removeItem('isAuth')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      router.push('/login')
    }

    const cancel = () => {
      router.push('/')
    }

    return { logout, cancel }
  }
}
</script>

<style scoped>
.logout-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logout-container {
  background: #FFFFFF;
  padding: 40px 60px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 320px;
}

.logout-container h2 {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
  color: #000000;
}

.logout-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-yes {
  background: #565EEF;
  color: #FFFFFF;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-yes:hover {
  background: #33399b;
}

.btn-no {
  background: transparent;
  color: #565EEF;
  border: 1px solid #565EEF;
  padding: 10px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-no:hover {
  background: #33399b;
  color: #FFFFFF;
}

/* Тёмная тема */
.dark-theme .logout-container {
  background: #20202C;
  border: 1px solid #565EEF;
  box-shadow: 0 0 20px rgba(86, 94, 239, 0.3);
}

.dark-theme .logout-container h2 {
  color: #FFFFFF;
}

.dark-theme .btn-no {
  color: #FFFFFF;
  border-color: #FFFFFF;
}

.dark-theme .btn-no:hover {
  background: #33399b;
  color: #FFFFFF;
}
</style>
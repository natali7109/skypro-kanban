<template>
  <div class="logout-page">
    <div class="logout-container">
      <h2>Выход из аккаунта</h2>
      <p>Вы действительно хотите выйти?</p>
      <div class="buttons">
        <button @click="confirmLogout" class="btn-logout">Да, выйти</button>
        <button @click="cancel" class="btn-cancel">Отмена</button>
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

    const confirmLogout = () => {
     
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userLogin')
      
     
      router.push('/login')
    }

    const cancel = () => {
      router.push('/')
    }

    return { confirmLogout, cancel }
  }
}
</script>

<style scoped>
.logout-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.logout-container {
  background: #FFFFFF;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.logout-container h2 {
  margin-bottom: 20px;
  color: #333;
}

.logout-container p {
  margin-bottom: 30px;
  color: #666;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-logout {
  background: #FF4444;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-logout:hover {
  background: #cc0000;
}

.btn-cancel {
  background: #94A6BE;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-cancel:hover {
  background: #7a8aa0;
}
</style>
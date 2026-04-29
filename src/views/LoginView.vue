<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Вход</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="ivan@example.com" required />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="password" placeholder="••••••••" required />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p class="register-link">
        Нужно зарегистрироваться? <router-link to="/register">Регистрируйтесь здесь</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    // Функция для обрезки длинного текста (токена)
    const trimString = (str, maxLength = 25) => {
      if (!str) return ''
      if (str.length <= maxLength) return str
      return str.slice(0, maxLength - 3) + '...'
    }

    const handleLogin = () => {
      if (!email.value || !password.value) {
        alert('Заполните все поля')
        return
      }

      // Проверяем, зарегистрирован ли пользователь
      const registeredUser = localStorage.getItem('registeredUser')
      const registeredEmail = localStorage.getItem('registeredEmail')
      
      if (!registeredUser || registeredEmail !== email.value) {
        alert('Пользователь с таким email не найден. Зарегистрируйтесь сначала.')
        return
      }

      // Валидация пароля (можно добавить проверку хэша)
      if (password.value.length < 3) {
        alert('Неверный пароль')
        return
      }

      
      let cleanEmail = email.value
      let userName = email.value.split('@')[0]
      
      
      if (cleanEmail.includes(' ')) {
        cleanEmail = cleanEmail.split(' ')[0]
        userName = cleanEmail.split('@')[0]
      }
      
      
      if (userName.length > 20) {
        userName = userName.slice(0, 17) + '...'
      }
      
     
      if (cleanEmail.length > 30) {
        cleanEmail = cleanEmail.slice(0, 27) + '...'
      }
      
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('user', userName)
      localStorage.setItem('email', cleanEmail)
      
      router.push('/')
    }

    return { email, password, handleLogin }
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  background: #FFFFFF;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.login-container h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #333333;
  font-size: 28px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 16px;
  background: #FFFFFF;
  color: #333333;
}

.form-group input::placeholder {
  color: #999999;
}

.form-group input:focus {
  outline: none;
  border-color: #565EEF;
}

button {
  width: 100%;
  padding: 12px;
  background: #565EEF;
  color: #FFFFFF;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #33399b;
}

.register-link {
  margin-top: 20px;
  text-align: center;
  color: #555555;
}

.register-link a {
  color: #565EEF;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
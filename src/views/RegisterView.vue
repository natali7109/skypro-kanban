<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Регистрация</h2>
      
      <!-- Блок с ошибкой -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Имя</label>
          <input 
            type="text" 
            v-model="name" 
            placeholder="Иван Иванов" 
            required 
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email" 
            v-model="login" 
            placeholder="ivan@example.com" 
            required 
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••" 
            required 
            :disabled="loading"
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>
      <p>Уже есть аккаунт? <router-link to="/login">Войдите здесь</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signUp } from '../services/auth.js'

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('')
    const login = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')
    const router = useRouter()

    const handleRegister = async () => {
      // Очищаем предыдущую ошибку
      errorMessage.value = ''
      
      // Валидация
      if (!name.value || !login.value || !password.value) {
        errorMessage.value = 'Заполните все поля'
        return
      }
      
      if (password.value.length < 6) {
        errorMessage.value = 'Пароль должен быть не менее 6 символов'
        return
      }
      
      loading.value = true
      
      try {
        // Отправляем запрос на сервер
        const user = await signUp({
          name: name.value,
          login: login.value,
          password: password.value
        })
        
        // Сохраняем токен и данные пользователя
        localStorage.setItem('token', user.token)
        localStorage.setItem('userName', user.name)
        localStorage.setItem('userLogin', user.login)
        
        // Редирект на главную
        router.push('/')
        
      } catch (error) {
        // Показываем ошибку пользователю
        errorMessage.value = error.message || 'Ошибка при регистрации'
      } finally {
        loading.value = false
      }
    }

    return { name, login, password, handleRegister, loading, errorMessage }
  }
}
</script>

<style scoped>
.register-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-container {
  background: #FFFFFF;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.register-container h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #333333;
  font-size: 28px;
  font-weight: 600;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
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

button:hover:not(:disabled) {
  background: #33399b;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

p {
  margin-top: 20px;
  text-align: center;
  color: #555555;
}

p a {
  color: #565EEF;
  text-decoration: none;
  font-weight: 500;
}

p a:hover {
  text-decoration: underline;
}
</style>
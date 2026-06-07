<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Вход</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group" :class="{ 'has-error': errors.login }">
          <label>Email</label>
          <input 
            type="email" 
            v-model="login" 
            placeholder="ivan@example.com" 
            :disabled="loading"
            @input="clearFieldError('login')"
          />
          <div v-if="errors.login" class="field-error">{{ errors.login }}</div>
        </div>
        
        <div class="form-group" :class="{ 'has-error': errors.password }">
          <label>Пароль</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••" 
            :disabled="loading"
            @input="clearFieldError('password')"
          />
          <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
        </div>
        
        <div v-if="generalError" class="error-message">
          {{ generalError }}
        </div>
        
        <button type="submit" :disabled="isButtonDisabled" :class="{ 'btn-disabled': isButtonDisabled }">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
      
      <p class="register-link">
        Нужно зарегистрироваться? <router-link to="/register">Регистрируйтесь здесь</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { signIn } from '../services/auth.js'

export default {
  name: 'LoginView',
  setup() {
    const login = ref('')
    const password = ref('')
    const loading = ref(false)
    const generalError = ref('')
    const errors = ref({
      login: '',
      password: ''
    })
    const router = useRouter()

    // Кнопка неактивна, если есть ошибки в полях или идет загрузка
    const isButtonDisabled = computed(() => {
      return loading.value || !!errors.value.login || !!errors.value.password || !login.value || !password.value
    })

    const validateForm = () => {
      let isValid = true
      errors.value = { login: '', password: '' }
      
      if (!login.value) {
        errors.value.login = 'Поле обязательно для заполнения'
        isValid = false
      } else if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(login.value)) {
        errors.value.login = 'Введите корректный email'
        isValid = false
      }
      
      if (!password.value) {
        errors.value.password = 'Поле обязательно для заполнения'
        isValid = false
      }
      
      return isValid
    }

    const clearFieldError = (field) => {
      errors.value[field] = ''
      generalError.value = ''
    }

    const handleLogin = async () => {
      // Очищаем предыдущие ошибки
      generalError.value = ''
      
      // Валидация полей
      if (!validateForm()) {
        return
      }
      
      loading.value = true
      
      try {
        const user = await signIn({
          login: login.value,
          password: password.value
        })
        
        localStorage.setItem('token', user.token)
        localStorage.setItem('userName', user.name)
        localStorage.setItem('userLogin', user.login)
        
        router.push('/')
        
      } catch (error) {
        // Ошибка авторизации — красная обводка для обоих полей
        errors.value.login = ' '
        errors.value.password = ' '
        generalError.value = 'Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.'
      } finally {
        loading.value = false
      }
    }

    return { 
      login, 
      password, 
      handleLogin, 
      loading, 
      generalError,
      errors,
      isButtonDisabled,
      clearFieldError
    }
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

/* Общее сообщение об ошибке (под полями) */
.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
}

/* Ошибка под конкретным полем */
.field-error {
  color: #c62828;
  font-size: 12px;
  margin-top: 5px;
}

/* Красная обводка поля */
.form-group.has-error input {
  border-color: #c62828 !important;
  background-color: #fff5f5 !important;
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
  transition: border-color 0.3s, background-color 0.3s;
}

.form-group input::placeholder {
  color: #999999;
}

.form-group input:focus {
  outline: none;
  border-color: #565EEF;
}

.form-group.has-error input:focus {
  border-color: #c62828 !important;
}

/* Кнопка */
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

button:disabled,
.btn-disabled {
  background: #cccccc !important;
  cursor: not-allowed;
  opacity: 1;
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
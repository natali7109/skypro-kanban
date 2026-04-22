<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Имя</label>
          <input type="text" v-model="name" placeholder="Иван Иванов" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="ivan@example.com" required />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="password" placeholder="••••••••" required />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>Уже есть аккаунт? <router-link to="/login">Войдите здесь</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleRegister = () => {
      if (!name.value || !email.value || !password.value) {
        alert('Заполните все поля')
        return
      }
      if (password.value.length < 6) {
        alert('Пароль должен быть не менее 6 символов')
        return
      }

      // Сохраняем данные пользователя
      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('user', name.value)
      localStorage.setItem('email', email.value)
      
      // Перенаправляем на главную
      router.push('/')
    }

    return { name, email, password, handleRegister }
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
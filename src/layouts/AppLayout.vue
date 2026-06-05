<template>
  <div class="app-layout">
    <RouterView />
  </div>
</template>

<script setup>
import { provide, ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

// Реактивное состояние пользователя
const user = ref(null)

// Функция сохранения пользователя
function setUser(userData) {
  user.value = userData
  if (userData) {
    localStorage.setItem('user', JSON.stringify(userData))
  } else {
    localStorage.removeItem('user')
  }
}

// Функция удаления пользователя
function removeUser() {
  user.value = null
  localStorage.removeItem('user')
}

// При загрузке приложения проверяем localStorage
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch (e) {
      console.error('Ошибка парсинга user', e)
    }
  }
})

// Провайдим данные для всех дочерних компонентов
provide('auth', {
  user,
  setUser,
  removeUser
})
</script>
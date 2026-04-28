<template>
  <div class="not-found">
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
      <router-link to="/" class="btn-home">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>
.not-found {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.not-found-container {
  text-align: center;
  background: white;
  padding: 50px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.not-found-container h1 {
  font-size: 100px;
  margin: 0;
  color: #565EEF;
}

.not-found-container h2 {
  font-size: 28px;
  margin: 20px 0 10px;
  color: #333;
}

.not-found-container p {
  margin-bottom: 30px;
  color: #666;
}

.btn-home {
  display: inline-block;
  padding: 12px 24px;
  background: #565EEF;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}

.btn-home:hover {
  background: #33399b;
}
</style>
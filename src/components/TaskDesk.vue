<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'TaskDesk'
}
</script>
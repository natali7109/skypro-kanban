<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
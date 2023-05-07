<script setup lang="ts">
defineProps<{
}>()
</script>

<template>
  <div class="greetings">
    <h1><a href="/"><span class="german">Gießen</span> <span class="manisch">Manisch</span> <span class="german">Wörterbuch</span></a></h1>
  </div>
</template>

<style scoped>
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  h1 {
    font-size: 1.6rem;
  }

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

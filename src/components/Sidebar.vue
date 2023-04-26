<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/" active-class="bg-dark text-white">Home</RouterLink>
    <RouterLink to="/about" active-class="bg-dark text-white">About</RouterLink>
  </nav>
</template>

<style>
nav {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>

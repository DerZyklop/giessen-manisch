<script setup lang="ts">
</script>

<template>
  <nav>
    <RouterLink to="/" class="btn-light" active-class="btn-dark">Home</RouterLink>
    <RouterLink to="/about" class="btn-light" active-class="btn-dark">About</RouterLink>
  </nav>
</template>

<style>
nav {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 1rem;
  display: flex;
  justify-content: center;
}

nav a {
  display: inline-block;
  padding: 0.2rem 1.2rem;
  border-left: 1px solid var(--color-border);
  border-radius: 0.3em;
}

nav a:first-of-type {
  border: 0;
}

</style>

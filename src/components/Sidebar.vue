<script setup lang="ts">
</script>

<template>
  <nav class="flex justify-stretch">
    <RouterLink to="/" class="btn-light grow" active-class="btn-dark">Wörterbuch</RouterLink>
    <RouterLink to="/about" class="btn-light grow" active-class="btn-dark">Was ist das?</RouterLink>
  </nav>

  <p class="hide-on-small-screen"><small><strong>Manisch</strong> ist eine in Gießen, Marburg, Wetzlar und Bad Berleburg als Soziolekt gesellschaftlicher Randgruppen entstandene regionale Variante des Rotwelschen. Es handelt sich um einen auf der Grundlage des örtlichen mittelhessischen bzw. Wittgensteiner Dialekts gebrauchten geheimsprachlichen Sonderwortschatz.</small></p>


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

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Sidebar from './components/Sidebar.vue';
import { initKeyPressEventListeners } from "./key-press-utils";

initKeyPressEventListeners();
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <HelloWorld />

      <Sidebar></Sidebar>
    </div>
  </header>

  <main>
    <RouterView />
    <ModalsContainer />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

main {
  padding: 1rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    align-items:flex-start;
    padding: 1rem calc(var(--section-gap) / 2) 0 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

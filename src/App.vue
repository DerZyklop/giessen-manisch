<script setup lang="ts">
import { ref } from 'vue';
import { ModalsContainer, UseModalReturnType } from 'vue-final-modal';
import { RouterView, useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import Sidebar from './components/Sidebar.vue';
import { getModalFns } from './components/modal-fns';
import { getTranslation, getTranslationEntry } from './components/utils';
import { initKeyPressEventListeners } from "./key-press-utils";

initKeyPressEventListeners();

const activeModal = ref<UseModalReturnType<any> | null>(null);

// Watch for route changes
useRouter().beforeResolve(async (to, from, next) => {
  let germanIdParam = to.params.germanId ?? null;
  const manischIdParam = to.params.manischId ?? null;

  const germanId = germanIdParam?.length ? +germanIdParam : null;
  const manischId = manischIdParam?.length ? +manischIdParam : null;

  const searchText = to.params.searchText;

  activeModal.value?.close()
  activeModal.value = null;
  if (germanId !== null) {
    // open modal with translation
    activeModal.value = getModalFns(getTranslation(germanId));
    await activeModal.value.open();
  } else if (manischId !== null) {
    const manischEntry = getTranslationEntry({manisch: manischId});
    activeModal.value = getModalFns(manischEntry);
    await activeModal.value.open();
  } else if (searchText !== undefined) {
    console.log('searchText', searchText);
  }
  next();
})
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

.logo {
  display: block;
  margin: 0 auto 2rem;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    align-items:flex-start;
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

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import List from '../components/List.vue';

const filterText = ref(useRoute().params.searchText as string ?? '');

useRouter().beforeResolve(async (to, from, next) => {
	if (to.params.searchText !== undefined) {
    filterText.value = to.params.searchText as string;
  }
  next();
})

</script>

<template>
	<div class="input-wrap">
		<input type="search" placeholder="Suche…" v-model="filterText" class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
	</div>
  <List :filterText="filterText" />
</template>

<style>
</style>

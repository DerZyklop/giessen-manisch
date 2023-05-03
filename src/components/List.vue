<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Item from './Item.vue';
import { getModalFns } from './modal-fns';
import { germanToManisch } from './utils';

const idParam = useRouter().currentRoute.value.params.id ?? null;
const translationId = idParam?.length ? +idParam : null;

if (translationId) {
	// open modal with translation
	const { open, close } = getModalFns(translationId);
	open();
}

const filterText = ref('')

const visibleTranslations = computed(() => {
	let filter = filterText.value
	if (!filter.length) return germanToManisch;
	
	return germanToManisch.filter(
		item => item.german.toLowerCase().includes(filter.toLowerCase())
	);
});

</script>

<template>
	<div class="input-wrap">
		<input type="search" placeholder="Suche…" v-model="filterText" class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
	</div>
  <dl>
		<Item v-for="(translation, i) in visibleTranslations" v-bind:key="i" :item="translation"></Item>
  </dl>
</template>

<style>
.input-wrap {
	margin: 0 0 1rem;
}	
dl .item {
	border-bottom: 1px solid var(--color-border);
}
</style>

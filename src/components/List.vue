<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import translations from './../assets/translations.json'
import Item from './Item.vue'
import { getModalFns } from './modal-fns'
import { getTranslation } from './utils'

const translationId = +useRouter().currentRoute.value.params.id;

const translation = getTranslation(translationId);
if (translation) {
	// open modal with translation
	const { open, close } = getModalFns(translation);
	open();
}

const filterText = ref('')

const visibleTranslations = computed(() => {
	let filter = filterText.value
	if (!filter.length) return translations;
	return translations.filter( item => 
		item.german.toLowerCase().includes(filter.toLowerCase())
	)
})
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

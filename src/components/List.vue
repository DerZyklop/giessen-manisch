<script setup lang="ts">
import { keysPressed } from '@/key-press-utils';
import { computed, ref, watch } from 'vue';
import Item from './Item.vue';
import { getModalFns } from './modal-fns';
import { GermanToManisch, ManischToGerman, germanToManisch, getRandomId, getTranslationEntry } from './utils';

const filterText = ref('')
watch(filterText, (count, prevCount) => {
  console.log(count);
	
})
const visibleTranslations = computed(() => {
	let filter = filterText.value;
	let result : GermanToManisch[] | ManischToGerman[] = [];
	if (!filter.length) result = germanToManisch;
	
	result = germanToManisch.filter(
		item => {
			if (item.german.toLowerCase().includes(filter.toLowerCase())) return true;
			const manischMatches = item.manischIds.some(manischId => {
				const manischWord = getTranslationEntry({manisch: manischId}).manisch;
				return manischWord.includes(filter);
			});
			if (manischMatches) return true;
			return false;
		}
	)
	
	return result;
});

watch(keysPressed, (src) => {
	if (
		(src['z']) && 
		(Object.keys(src).length === 1 || Object.keys(src).length === 2 && src['Alt'] === true)
	) {
		const { open, close } = getModalFns(getRandomId());
		open();
	}
})
</script>

<template>
	<div class="input-wrap">
		<input type="search" placeholder="Suche…" v-model="filterText" class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
	</div>
  <dl>
		<Item 
			v-for="(translation) in visibleTranslations" 
			v-bind:key="translation.id" 
			:item="translation"
		></Item>
  </dl>
</template>

<style>
.input-wrap {
	margin: 0 0 1rem;
}	
dl {
	font-size: 1.4em;
}
dl .item {
	border-bottom: 1px solid var(--color-border);
}
</style>

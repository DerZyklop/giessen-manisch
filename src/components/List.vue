<script setup lang="ts">
import { computed } from 'vue';
import Item from './Item.vue';
import { GermanToManisch, ManischToGerman, germanToManisch, getTranslationEntry } from './utils';

const props = defineProps<{
	filterText: string,
}>()

const visibleTranslations = computed(() => {
	let filter = props.filterText;
	let result : GermanToManisch[] | ManischToGerman[] = [];
	if (!filter.length) result = germanToManisch;
	
	result = germanToManisch.filter(
		item => {
			if (item.german.toLowerCase().includes(filter.toLowerCase())) return true;
			const manischMatches = item.manischIds.some(manischId => {
				const manischWord = getTranslationEntry({manisch: manischId}).manisch;
				return manischWord.toLowerCase().includes(filter.toLowerCase());
			});
			if (manischMatches) return true;
			return false;
		}
	)
	
	return result;
});
</script>

<template>
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

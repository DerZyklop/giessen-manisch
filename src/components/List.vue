<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Item from './Item.vue';
import { getModalFns } from './modal-fns';
import { germanToManisch, getTranslation, getTranslationEntry } from './utils';

let germanIdParam = useRouter().currentRoute.value.params.germanId ?? null;
const manischIdParam = useRouter().currentRoute.value.params.manischId ?? null;

const germanId = germanIdParam?.length ? +germanIdParam : null;
const manischId = manischIdParam?.length ? +manischIdParam : null;

if (germanId) {
	// open modal with translation
	const { open, close } = getModalFns(getTranslation(germanId));
	open();
} else if (manischId) {
	const manischEntry = getTranslationEntry({manisch: manischId});
	const { open, close } = getModalFns(manischEntry);
	open();
}

const filterText = ref('')
watch(filterText, (count, prevCount) => {
  console.log(count);
	
})
const visibleTranslations = computed(() => {
	let filter = filterText.value
	if (!filter.length) return germanToManisch;
	
	return germanToManisch.filter(
		item => {
			if (item.german.toLowerCase().includes(filter.toLowerCase())) return true;
			const manischMatches = item.manischIds.some(manischId => {
				const manischWord = getTranslationEntry({manisch: manischId}).manisch;
				return manischWord.includes(filter);
			});
			if (manischMatches) return true;
			return false;
		}
	);
});

</script>

<template>
	<div class="input-wrap">
		<input type="search" placeholder="Suche…" v-model="filterText" class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
	</div>
  <dl>
		<Item v-for="(translation) in visibleTranslations" v-bind:key="translation.id" :item="translation"></Item>
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

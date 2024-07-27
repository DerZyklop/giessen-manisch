<script setup lang="ts">
import { GermanToManisch, ManischToGerman, getTranslationEntry } from './utils';

const props = defineProps<{
	item: GermanToManisch | ManischToGerman,
}>()

</script>
<template>
	<small class="mb-5" v-if="'manisch' in item && item.relatedManischIds.length">
		Verwandte manische Worte:
		<template 
			v-for="(relatedManischEntry, i) in item.relatedManischIds.map((id) => {
					return getTranslationEntry({manisch: id});
				})" v-bind:key="relatedManischEntry.manisch"
		>
			<router-link
				:to="`/search/${relatedManischEntry.manisch}/`" 
				:data-nav-to-id="relatedManischEntry.id" 
				class=""
			>{{ relatedManischEntry.manisch }}</router-link>{{ i !== (item.relatedManischIds.length - 1) ? ', ' : '' }}
		</template>
	</small>
	<small class="mb-5" v-if="'german' in item && item.relatedGermanIds.length">
		Verwandte deutsche Worte:
		<template 
			v-for="(relatedGermanEntry, i) in item.relatedGermanIds.map((id) => {
					return getTranslationEntry({german: id});
				})" v-bind:key="relatedGermanEntry.manisch"
		>
			<router-link
				:to="`/search/${relatedGermanEntry.german}/`" 
				:data-nav-to-id="relatedGermanEntry.id" 
				class=""
			>{{ relatedGermanEntry.german }}</router-link>{{ i !== (item.relatedGermanIds.length - 1) ? ', ' : '' }}
		</template>
	</small>
</template>

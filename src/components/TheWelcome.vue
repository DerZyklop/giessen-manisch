<script setup lang="ts">
import TranslationItem from './WelcomeItem.vue'
import Sidebar from './Sidebar.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import translations from './../assets/translations.json'
import { computed, ref } from 'vue'

const filterText = ref('')

const visibleTranslations = computed( () => {
		let filter = filterText.value
		if (!filter.length) return translations;
		return translations.filter( item => 
				item.german.toLowerCase().includes(filter.toLowerCase())
		)
})
</script>

<template>
	<div class="input-wrap">
		<input type="search" placeholder="Suche…" v-model="filterText" class="form-control">
	</div>
  <dl>
		<TranslationItem v-for="(translation, i) in visibleTranslations" v-bind:key="i" :item="translation"></TranslationItem>
  </dl>
</template>

<style>
.input-wrap {
	margin: 0 1rem 1rem;
}	
dl .item {
	border-bottom: 1px solid var(--color-border);
}
</style>

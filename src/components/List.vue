<script setup lang="ts">
import Item from './Item.vue'
import Sidebar from './Sidebar.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import translations from './../assets/translations.json'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useModal } from 'vue-final-modal'
import { getModalFns } from './modal-fns'

const translationId = +useRouter().currentRoute.value.params.id;

const translation = translations.find(item => item.id === translationId);
if (translation) {
	// open modal with translation
	getModalFns(translation).open();
}



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

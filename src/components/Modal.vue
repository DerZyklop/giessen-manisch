<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useToast } from "vue-toastification";
import { GermanToManisch, getRandomId, getTranslationWords, ManischToGerman } from './utils';

const props = defineProps<{
	item: GermanToManisch | ManischToGerman,
	onRandom: (id: number) => void
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', modelValue: boolean): void
}>()

// when user clicks on input field, select all text
const selectAll = (target: HTMLInputElement) => {
	target.select();
}
const copyToClipboard = (e: Event) => {
	const btn = (e.target as HTMLInputElement).closest('button')!;
	const inputEl = btn.parentElement?.querySelector('input') as HTMLInputElement;
	if (!inputEl) throw new Error('No input element found');
	selectAll(inputEl);

	const valueOfInput = inputEl?.value;
	// Copy valueOfInput to clipboard
	navigator.clipboard.writeText(valueOfInput);
	
	// Show toast that it has been copied
	const toast = useToast();
	toast.success(`»${valueOfInput}« wurde in die Zwischenablage kopiert`, {
		timeout: 2000
	});
}

const translationWords = getTranslationWords(props.item);
const multipleTranslations = ('manisch' in props.item ? props.item.germanIds.length : props.item.manischIds.length) > 1;
const navTo = (word: string, language: 'manisch' | 'german') => {
	// const translation = language === 'manisch' ? getTranslationEntry({manisch: word}) : getTranslationEntry({german: word});
	const toast = useToast();
	toast.success(`»${word}«`, {
		timeout: 2000
	});
}
</script>

<template>
	<VueFinalModal
		class="flex justify-center items-center"
		content-class="flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
		@update:model-value="val => emit('update:modelValue', val)"
	>
		<div class="flex items-center mb-3">
			<div class="grow">
				<small v-if="'manisch' in item">Manisch:</small>
				<small v-else>Deutsch:</small>
				<br>
				<h3 class="text-2xl">
					<span v-if="'manisch' in item">{{ item.manisch }}</span>
					<span v-else>{{ item.german }}</span>
				</h3>
			</div>
			<button class="py-3 pl-3 text-2xl" style="margin-right: -1rem; padding-right: 1rem;" @click="emit('update:modelValue', false)">
				<font-awesome-icon icon="fa-solid fa-remove" />
			</button>
		</div>
		<p v-if="multipleTranslations">Mögliche übersetzungen:</p>
		<p v-else>Übersetzung:</p>

		<div
			v-for="word in translationWords"
			:key="word"
			class="flex-grow flex items-center justify-center"
		>
			<div class="border border-gray-500 mb-3 rounded flex overflow-hidden bg-light-cold">
				<input class="bg-transparent p-3" readonly :value="word" @focus="selectAll($event.target!)" />
				<button class="border border-r-0 border-y-0 p-3 btn btn-white" @click="copyToClipboard"><font-awesome-icon icon="fa-solid fa-clipboard" /></button>
				<button class="border border-r-0 border-y-0 p-3 btn btn-dark" @click="navTo(word, 'manisch' in item ? 'german' : 'manisch')"><font-awesome-icon icon="fa-solid fa-clipboard" /></button>
			</div>
		</div>

		<button @click="onRandom(getRandomId())" class="p-3 btn btn-light border ml-auto">
			<font-awesome-icon icon="fa-solid fa-random" class="mr-2" /> Random
		</button>

		<slot />
	</VueFinalModal>
</template>

<style>


</style>

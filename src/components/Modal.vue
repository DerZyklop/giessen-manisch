<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import { useToast } from "vue-toastification";
import type { Translation } from './utils';
import { getRandomId } from './utils';

const props = defineProps<{
	item: Translation,
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
</script>

<template>
	<VueFinalModal
		class="flex justify-center items-center"
		content-class="flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
		@update:model-value="val => emit('update:modelValue', val)"
	>
		<div class="flex items-center h-10 mb-3">
			<h3 class="text-2xl grow">{{ item.german.join(', ') }}</h3>
			<button class="py-3 pl-3 text-2xl" style="margin-right: -1rem; padding-right: 1rem;" @click="emit('update:modelValue', false)">
				<font-awesome-icon icon="fa-solid fa-remove" />
			</button>
		</div>
		<p v-if="item.manisch.length > 1">Mögliche übersetzungen:</p>
		<p v-else>Übersetzung:</p>
		<div
			v-for="word in item.manisch"
			:key="word"
			class="flex-grow flex items-center justify-center"
		>
			<div class="border border-gray-500 mb-3 rounded flex overflow-hidden">
				<input class="bg-light-cold p-3" readonly :value="word" @focus="selectAll($event.target!)" />
				<button class="border border-r-0 border-y-0 flex items-center p-3 btn btn-light" @click="copyToClipboard"><font-awesome-icon icon="fa-solid fa-clipboard" /></button>
			</div>
		</div>

		<button @click="onRandom(getRandomId())" class="p-3 btn btn-light ml-auto">
			<font-awesome-icon icon="fa-solid fa-random" class="mr-2" /> Random
		</button>

		<slot />
	</VueFinalModal>
</template>

<style>


</style>

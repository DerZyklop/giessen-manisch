<script setup lang="ts">
import { keysPressed } from '@/key-press-utils';
import { ref, watch } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useToast } from "vue-toastification";
import { modalContentTransition } from './modal-fns';
import { GermanToManisch, ManischToGerman, getTranslationEntry, getTranslationWords } from './utils';

const props = defineProps<{
	item: GermanToManisch | ManischToGerman,
	onOpenNewModal: (input: number | ManischToGerman | GermanToManisch) => void,
	_onCloseSlowly: () => Promise<string>,
	onClose: () => void,
	onOpenRandomModal : () => void,
	_onOpenModal: (input: number | ManischToGerman | GermanToManisch) => void,
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
  // modal with new word
  const translation = language === 'manisch' ? getTranslationEntry({manisch: word}) : getTranslationEntry({german: word});
	props.onOpenNewModal(translation);
}

let altKeyPressed = ref(false);
watch(keysPressed, (src) => {
	if (src['r'] === true && Object.keys(src).length === 1) props.onOpenRandomModal();
});
watch(keysPressed, (src) => {
	if (src['Esc'] === true) props.onClose();
});
const contentTransition = modalContentTransition;
</script>

<template>
	<VueFinalModal
		class="flex justify-center items-center"
		content-class="vfm-wrapper grow ml-5 mr-5 flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
		:content-transition="contentTransition"
		overlay-transition="vfm-fade"

		@update:model-value="val => emit('update:modelValue', val)"
	>
		<!-- Modal header -->
		<div class="flex items-center mb-5">
			<div class="grow">
				<small>{{ 'manisch' in item ? 'Manisch' : 'Deutsch' }}:</small>
				<br>
				<h3 
					class="text-2xl"
					:class="{
						'manisch': 'manisch' in item,
						'german': 'german' in item
					}"
				>
					<span v-if="'manisch' in item">{{ item.manisch }}</span>
					<span v-else>{{ item.german }}</span>
				</h3>
			</div>
			<button class="py-3 pl-3 text-2xl" style="margin-right: -1rem; padding-right: 1rem;" @click="onClose()">
				<font-awesome-icon icon="fa-solid fa-remove" />
			</button>
		</div>
		<!-- Modal Content -->
		<div class="modal-content mb-5">
			<small v-if="multipleTranslations">Mögliche {{ 'manisch' in item ? 'Deutsch' : 'Manisch' }}-Übersetzungen:</small>
			<small v-else>{{ 'manisch' in item ? 'Deutsch' : 'Manisch' }}-Übersetzung:</small>

			<div
				v-for="word in translationWords"
				:key="word"
				class="grow flex items-stretch justify-center"
			>
				<input 
					class="pl-0 focus:pl-1 p-1 focus:bg-light-cold m-1 ml-0 rounded grow font-bold"
					:class="{
						'manisch': 'german' in item,
						'german': 'manisch' in item
					}"

					readonly 
					:value="word" 
					@focus="selectAll($event.target!)" 
				/>
				<button class="border p-3 m-1 btn btn-white" @click="copyToClipboard"><font-awesome-icon icon="fa-solid fa-clipboard" /></button>
				<button class="border p-3 m-1 mr-0 btn btn-dark" @click="navTo(word, 'manisch' in item ? 'german' : 'manisch')"><font-awesome-icon icon="fa-solid fa-repeat" /></button>
			</div>
		</div>

		<!-- Modal footer -->
		<div class="flex justify-between items-center">
			<small class="muted">{{ 'manisch' in item ? 'manisch' : 'german' }} id: <code>{{item.id}}</code></small>
			<button @click="onOpenRandomModal()" class="p-3 btn btn-light border ml-auto">
				<font-awesome-icon icon="fa-solid fa-random" class="mr-2" /> Random
				<span v-if="altKeyPressed">(R)</span>
			</button>
		</div>

		<slot />
	</VueFinalModal>
</template>

<style>
.vfm-wrapper {
	max-width: 500px;
}

input {
	font-size: 1.5em;
}

button {
	font-size: 1.1rem;
}

.muted {
	color: #aaa;
}
</style>

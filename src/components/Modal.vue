<script setup lang="ts">
import { keysPressed } from '@/key-press-utils';
import { watch } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useToast } from "vue-toastification";
// import { vueConfig } from './../../vue.config';
import RelatedWords from './RelatedWords.vue';
import { modalContentTransition } from './modal-fns';
import { GermanToManisch, ManischToGerman, Translation, getTranslatedEntries, getTranslationEntry } from './utils';

const props = defineProps<{
	item: GermanToManisch | ManischToGerman,
	onOpenNewModal: (input: number | Translation) => void,
	_onCloseSlowly: () => Promise<string>,
	onClose: () => void,
	onOpenRandomModal : () => void,
	onOpenNextTranslation: () => void,
	onOpenPrevTranslation: () => void,
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', modelValue: boolean): void
}>()

// when user clicks on input field, select all text
const selectAll = (target: HTMLInputElement) => {
	target.select();
}
const showCopyToClipboardSuccessToast = (valueOfInput ?: string) => {
	// Show toast that it has been copied
	const toast = useToast();
	const text = valueOfInput ? `»${valueOfInput}« wurde in die Zwischenablage kopiert` : 'Text wurde in die Zwischenablage kopiert';
	toast.success(text, {
		timeout: 2000
	});
}
const copyToClipboard = (e: Event) => {
	const btn = (e.target as HTMLInputElement).closest('button')!;
	const inputEl = btn.parentElement?.querySelector('input') as HTMLInputElement;
	if (!inputEl) throw new Error('No input element found');
	selectAll(inputEl);

	const valueOfInput = inputEl?.value;
	// Copy valueOfInput to clipboard
	navigator.clipboard.writeText(valueOfInput);
	
	showCopyToClipboardSuccessToast(valueOfInput);
}

const translationEntries = getTranslatedEntries(props.item);
const multipleTranslations = ('manisch' in props.item ? props.item.germanIds.length : props.item.manischIds.length) > 1;
const navTo = (word: string, language: 'manisch' | 'german') => {
  // modal with new word
  const translation = language === 'manisch' ? getTranslationEntry({manisch: word}) : getTranslationEntry({german: word});
	props.onOpenNewModal(translation);
}

watch(keysPressed, (src) => {
	if (src['Esc']) {
		props.onClose();
	} else if (Object.keys(src).length === 1) {
		if (src['ArrowRight']) {
			props.onOpenNextTranslation();
		} else if (src['ArrowLeft']) {
			props.onOpenPrevTranslation();
		// } else if (src['Meta'] && src['c']) {
		// 	showCopyToClipboardSuccessToast();
		}
	}
});

const contentTransition = modalContentTransition;
const appMode = process.env.NODE_ENV;
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
				<label>{{ 'manisch' in item ? 'Manisch' : 'Deutsch' }}</label>
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
					<small v-for="sideNote in item.sideNotes" v-bind:key="sideNote">*</small>
				</h3>
			</div>
			<button class="py-3 pl-3 text-2xl" style="margin-right: -1rem; padding-right: 1rem;" @click="onClose()">
				<font-awesome-icon v-if="!keysPressed['Alt']" icon="fa-solid fa-remove" /><kbd v-if="keysPressed['Alt']">esc</kbd>
			</button>
		</div>
		<div class="mb-5" v-if="item.sideNotes.length">
			<div class="border rounded p-3 bg-light mb-3" v-for="sideNote in item.sideNotes" v-bind:key="sideNote"><small>*{{ sideNote }}</small></div>
		</div>
		<RelatedWords
			:item="item"
		></RelatedWords>
		<!-- Modal Content -->
		<div class="modal-content mb-5">
			<label v-if="multipleTranslations">Mögliche {{ 'manisch' in item ? 'meutsche' : 'manische' }} Übersetzungen</label>
			<label v-else>{{ 'manisch' in item ? 'Deutsche' : 'Manische' }} Übersetzung</label>

			<template
				v-for="translationEntry in translationEntries"
				:key="'german' in translationEntry ? translationEntry.german : translationEntry.manisch"
			>
				<div
					class="grow flex items-stretch justify-center"
				>
					<input
						class="pl-0 focus:pl-1 p-1 focus:bg-light-cold m-1 ml-0 rounded grow font-bold"
						:class="{
							'manisch': 'german' in item,
							'german': 'manisch' in item
						}"

						readonly 
						:value="'german' in translationEntry ? translationEntry.german : translationEntry.manisch" 
						@focus="selectAll($event.target!)" 
					/>
					<button class="border p-3 m-1 btn btn-white" @click="copyToClipboard"><font-awesome-icon :fixed-width="true" icon="fa-solid fa-clipboard" /></button>
					<button class="border p-3 m-1 mr-0 btn btn-dark" @click="navTo('german' in translationEntry ? translationEntry.german : translationEntry.manisch, 'manisch' in item ? 'german' : 'manisch')"><font-awesome-icon :fixed-width="true" icon="fa-solid fa-repeat" /></button>
				</div>
				<RelatedWords
					:item="translationEntry"
				></RelatedWords>
			</template>
		</div>

		<!-- Modal footer -->
		<div class="flex justify-between items-center">
			<!-- button for prev translation -->
			<button @click="onOpenPrevTranslation()" class="p-3 btn btn-light border mr-2">
				<font-awesome-icon :fixed-width="true" v-if="!keysPressed['Alt']" icon="fa-solid fa-arrow-left" class="mr-2" /><kbd class="mr-2" v-if="keysPressed['Alt']">←</kbd>Vorherige
			</button>
			<button @click="onOpenRandomModal()" class="grow p-3 btn btn-light border ml-auto">
				<font-awesome-icon :fixed-width="true" v-if="!keysPressed['Alt']" icon="fa-solid fa-random" class="mr-2" /><kbd class="mr-2" v-if="keysPressed['Alt']">z</kbd>Zufall
			</button>
			<button @click="onOpenNextTranslation()" class="p-3 btn btn-light border ml-2">
				Nächste<font-awesome-icon :fixed-width="true" v-if="!keysPressed['Alt']" icon="fa-solid fa-arrow-right" class="ml-2" /><kbd class="ml-2" v-if="keysPressed['Alt']">→</kbd>
			</button>
		</div>

		<slot />
	</VueFinalModal>
</template>

<style>
.vfm-wrapper {
	max-width: 550px;
}

input {
	font-size: 1.5em !important;
}

button {
	font-size: 1.1rem;
}

.muted {
	color: #aaa;
}

label {
	font-size: 1.1rem;
	font-weight: bold;
	color: #667;
}
</style>

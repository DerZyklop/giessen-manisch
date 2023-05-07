import { Ref, ref } from "vue";
import { useModal } from "vue-final-modal";
import Modal from './Modal.vue';
import { GermanToManisch, ManischToGerman, Translation, getNextTranslation, getPrevTranslation, getRandomId, getTranslation } from "./utils";

export const modalContentTransition : Ref<
	'vfm-slide-right' | 'vfm-slide-left' | 
	'vfm-slide-up' | 'vfm-slide-down' | 
	
	'vfm-fade'
> = ref('vfm-slide-up');
export const getModalFns = (
	// passing type number only works for german to manisch
	input : number | GermanToManisch | ManischToGerman
) => {
	let translation = typeof input === 'number' ? getTranslation(input) : input;
	if ('manisch' in translation) {
		// Silent write new url without triggering router
		window.history.replaceState({}, '', `/translation/manisch/${translation.id}/`);

	} else {
		window.history.replaceState({}, '', `/translation/german/${translation.id}/`);
		// router.push({
		// 	replace: true,
		// 	path: `/translation/german/${translation.id}`
		// });
	}			

	const result = useModal({
		component: Modal,
		attrs: {
			item: translation,
			async onOpenRandomModal() {
				modalContentTransition.value = 'vfm-slide-up';
				this._onCloseSlowly().then(async () => {
					modalContentTransition.value = 'vfm-slide-up';
					await getModalFns(getRandomId()).open();
					modalContentTransition.value = 'vfm-fade';
				});
			},
			onOpenNewModal(input: number | Translation) {
				modalContentTransition.value = 'vfm-fade';
				this._onCloseSlowly().then(() => {
					getModalFns(input).open();
				});
			},
			onOpenNextTranslation() {
				modalContentTransition.value = 'vfm-slide-left';
				this._onCloseSlowly().then(async () => {
					modalContentTransition.value = 'vfm-slide-right';

					// nav to next translation
					const nextTranslation = getNextTranslation(this.item);
					await getModalFns(nextTranslation).open();
					modalContentTransition.value = 'vfm-slide-up';
				});
			},
			onOpenPrevTranslation() {
				modalContentTransition.value = 'vfm-slide-right';
				this._onCloseSlowly().then(async () => {
					modalContentTransition.value = 'vfm-slide-left';

					// nav to next translation
					const nextTranslation = getPrevTranslation(this.item);
					await getModalFns(nextTranslation).open();
					modalContentTransition.value = 'vfm-slide-up';
				});
			},
			onClose() {
				modalContentTransition.value = 'vfm-slide-up';
				this._onCloseSlowly();
			},
			async _onCloseSlowly() : Promise<string> {
				return new Promise(async (resolve) => {
					const promiseResult = await result.close();
					resolve(promiseResult);
			});
			},
			onOpened() {
				console.log('opened')
			},
			onClosed() {
				// router.push(`/`);
			}
		},
		slots: {
			// default: `<p>Translation <code>${JSON.stringify(translation)}</code></p>`,
		},
	})	
	return result;
}

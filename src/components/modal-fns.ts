import router from "@/router";
import { Ref, ref } from "vue";
import { useModal } from "vue-final-modal";
import Modal from './Modal.vue';
import { GermanToManisch, ManischToGerman, getRandomId, getTranslation } from "./utils";

export const modalContentTransition : Ref<
	'vfm-slide-right' | 'vfm-slide-left' | 
	'vfm-slide-up' | 'vfm-slide-down' | 
	
	'vfm-fade'
> = ref('vfm-slide-up');
export const getModalFns = (translation : GermanToManisch | ManischToGerman) => {
	const result = useModal({
		component: Modal,
		attrs: {
			item: translation,
			async onOpenRandomModal() {
				modalContentTransition.value = 'vfm-slide-up';
				this._onCloseSlowly().then(async () => {
					modalContentTransition.value = 'vfm-slide-up';
					await this._onOpenModal(getRandomId());
					modalContentTransition.value = 'vfm-fade';
				});
			},
			onOpenNewModal(input: number | ManischToGerman | GermanToManisch) {
				modalContentTransition.value = 'vfm-fade';
				this._onCloseSlowly().then(() => {
					this._onOpenModal(input);
				});
			},
			async _onOpenModal(input: number | ManischToGerman | GermanToManisch) {
				let newTranslation = typeof input === 'number' ? getTranslation(input) : input;

				if ('manisch' in newTranslation) {
					router.push(`/translation/manisch/${newTranslation.id}`);
				} else {
					router.push(`/translation/german/${newTranslation.id}`);
				}

				await getModalFns(newTranslation).open();	
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
				router.push(`/`);
			}
		},
		slots: {
			// default: `<p>Translation <code>${JSON.stringify(translation)}</code></p>`,
		},
	})	
	return result;
}

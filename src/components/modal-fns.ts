import router from "@/router";
import { useModal } from "vue-final-modal";
import Modal from './Modal.vue';
import { getTranslation } from "./utils";

export const getModalFns = (translationId : number) => {
	const translation = getTranslation(translationId);

	const result = useModal({
		component: Modal,
		attrs: {
			item: translation,
			onRandom(id : number) {
				result.close().then(() => {
					router.push(`/translation/${id}`);
					getModalFns(id).open();
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

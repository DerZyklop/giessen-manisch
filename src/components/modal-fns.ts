import router from "@/router";
import { useModal } from "vue-final-modal";
import Modal from './Modal.vue';

export const getModalFns = (translation : {
	id: number,
	german: string,
	manisch: string,
}) => {
	return useModal({
		component: Modal,
		attrs: {
			item: translation,
			onConfirm() {
				close()
			},
			onOpened() {
				console.log('opened')
			},
			onClosed() {
				router.push(`/`);
			}
		},
		slots: {
			default: `<p>Translation-Id <code>${translation.id}</code></p>`,
		},
	})	
	
}

import { useModal } from "vue-final-modal";
import Modal from './Modal.vue'
import router from "@/router";

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
			default: `<p>The ${translation.id} of the modal</p>`,
		},
	})	
	
}

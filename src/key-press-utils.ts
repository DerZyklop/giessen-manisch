import { Ref, ref } from "vue";

export let keysPressed : Ref<{
	[key: KeyboardEvent['key']]: boolean;
}> = ref({});

let blocker : boolean = false;
export const initKeyPressEventListeners = () => {
	document.addEventListener('keydown', (event) => {
		if (blocker === true) return;
		blocker = true;
		setTimeout(() => {
			blocker = false;
		}, 100);
		if (keysPressed.value[event.key] === true) return;
		const keysPressedWithNewKey = {
			...keysPressed.value,
			[event.key]: true
		};
		keysPressed.value = keysPressedWithNewKey;
	});
	document.addEventListener('keyup', (event) => {
		const { [event.key]: keyValue, ...keysPressedWithoutKey } = keysPressed.value;
		keysPressed.value = keysPressedWithoutKey;
	});	
};

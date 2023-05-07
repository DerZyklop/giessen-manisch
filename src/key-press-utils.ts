import { Ref, ref } from "vue";

export let keysPressed : Ref<{
	[key: KeyboardEvent['key']]: boolean;
}> = ref({});

// Blocks more events. Each key can have its own blocker.
let blocker : {
	[key: KeyboardEvent['key']]: boolean;
} = {};
export const initKeyPressEventListeners = () => {
	document.addEventListener('keydown', (event) => {
		if ((event.target as HTMLElement)?.tagName.toLowerCase() === 'input') return;
		if (blocker[event.key] === true) return;
		blocker[event.key] = true;
		setTimeout(() => {
			blocker[event.key] = false;
		}, 100);
		if (keysPressed.value[event.key] === true) return;
		const keysPressedWithNewKey = {
			...keysPressed.value,
			[event.key]: true
		};
		keysPressed.value = keysPressedWithNewKey;
	});
	document.addEventListener('keyup', (event) => {
		if (event.key === 'Control' || event.key === 'Meta') {
			keysPressed.value = {};
		} else {
			const { [event.key]: keyValue, ...keysPressedWithoutKey } = keysPressed.value;
			keysPressed.value = keysPressedWithoutKey;
		}
	});	
};

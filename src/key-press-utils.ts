import { Ref, ref } from "vue";

export const keysPressed : Ref<{
	[key: KeyboardEvent['key']]: KeyboardEvent;
}> = ref({});

// Blocks more events. Each key can have its own blocker.
const blocker : {
	[key: KeyboardEvent['key']]: KeyboardEvent;
} = {};
export const initKeyPressEventListeners = () => {
	document.addEventListener('keydown', (event) => {
		if ((event.target as HTMLElement)?.tagName.toLowerCase() === 'input') return;
		if (event.key in blocker) return;
		blocker[event.key] = event;
		setTimeout(() => {
			delete blocker[event.key];
		}, 100);
		if (event.key in keysPressed.value) return;
		const keysPressedWithNewKey = {
			...keysPressed.value,
			[event.key]: event
		};
		keysPressed.value = keysPressedWithNewKey;
	});
	document.addEventListener('keyup', (event) => {
		if (event.key === 'Control' || event.key === 'Meta') {
			keysPressed.value = {};
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [event.key]: keyValue, ...keysPressedWithoutKey } = keysPressed.value;
			keysPressed.value = keysPressedWithoutKey;
		}
	});	
};

import translationsJson from './../assets/translations.json';

export type Translations = Translation[]

export type Translation = {
	id: number,
	german: string[],
	manisch: string[],
}

export const translations : Translations = translationsJson.map(
	(translation) => {
		return {
			...translation,
			german: translation.german.includes(',') ? translation.german.split(', ') : [translation.german],
			manisch: translation.manisch.includes(',') ? translation.manisch.split(', ') : [translation.manisch]
		};
	}
);

export const getTranslation = (id : number) : Translation => {
	if (Number.isNaN(id)) return;
	const result = translations.find((translation) => translation.id === id);
	return result;
}

// random id for router-link
export const getRandomId = () => Math.floor(Math.random() * translations.length);

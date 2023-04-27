import translationsJson from './../assets/translations.json';

export type Translations = Translation[]

export type Translation = {
	id: number,
	german: string,
	manisch: string[],
}

export const translations : Translations = translationsJson.map(
	(translation) => {
		return {
			...translation,
			manisch: translation.manisch.includes(',') ? translation.manisch.split(',') : [translation.manisch]
		};
	}
);

export const getTranslation = (id : number) : Translation => {
	if (Number.isNaN(id)) return;
	const result = translations.find((translation) => translation.id === id);
	return result;
}

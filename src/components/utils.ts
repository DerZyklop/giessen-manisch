import translations from './../assets/translations.json'

export const getTranslation = (id : number) => {
	return translations.find((translation) => translation.id === id)
}

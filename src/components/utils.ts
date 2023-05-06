import germanJson from './../assets/translations/german.json';
import manischJson from './../assets/translations/manisch.json';

export type ManischToGerman = {
	id: number,
	manisch: string,
	germanIds: number[],
}
export type GermanToManisch = {
	id: number,
	german: string,
	manischIds: number[],
}

const manischEntries : {
	id: number,
	manisch: string,
}[] = 
manischJson.filter((item, index, self) => {
	// remove duplicates
	const foundIndex = self.findIndex((i) => i.manisch === item.manisch);
	return foundIndex === index;
});
// console.log(manischJson.length);
// console.log('manischEntries');
// console.log(JSON.stringify(manischEntries));


const germanEntries : {
	id: number,
	german: string,
}[] =
germanJson.filter((item, index, self) => {
	// remove duplicates
	const foundIndex = self.findIndex((i) => i.german === item.german);
	return foundIndex === index;
});
// console.log(germanJson.length);
// console.log('germanEntries');
// console.log(JSON.stringify(germanEntries));

export type Translation = ManischToGerman | GermanToManisch;

export const manischToGerman = manischEntries as ManischToGerman[];
export const germanToManisch = germanEntries as GermanToManisch[];

export const getTranslation = (id : number) : GermanToManisch => {
	const translation = germanToManisch.find((item) => item.id === id);
	if (!translation) {
		throw new Error('Translation not found');
	}
	return translation;
}

export function getTranslationEntry(input: { manisch: string | number }) : ManischToGerman;
export function getTranslationEntry(input: { german: string | number }) : GermanToManisch;
export function getTranslationEntry(input: {
	german : string | number
} | {
	manisch : string | number
}) : ManischToGerman | GermanToManisch {
	if ('manisch' in input) {
		return manischToGerman.find((item) => {
			if (typeof input.manisch === 'number') {
				return item.id === input.manisch;
			} else {
				return item.manisch === input.manisch;
			}
		})!;
	} else if ('german' in input) {
		return germanToManisch.find((item) => {
			if (typeof input.german === 'number') {
				return item.id === input.german;
			} else {
				return item.german === input.german;
			}
		})!;
	} else {
		throw new Error('Translation not found');
	}
}

// random id for router-link
export const getRandomId = () => germanToManisch[Math.floor(Math.random() * germanToManisch.length)].id;

export const getTranslationWords = (input: { german: string } | { manisch: string }) : string[] => {
	if ('manisch' in input) {
		const translationEntry = getTranslationEntry(input);
		const translationWordIds = translationEntry?.germanIds ?? [];
		const words = germanToManisch
			.filter((item) => {
				return translationWordIds.includes(item.id)
			})
			.map(item => item.german);	
		return words;
	} else {
		const translationEntry = getTranslationEntry(input);
		const translationWordIds = translationEntry?.manischIds ?? [];
		const words = translationWordIds
			.map(twId => {
				const manischEntry = manischToGerman.find(m2g => m2g.id === twId);
				if (!manischEntry) throw new Error(`manischEntry ${manischEntry} not found`);
				return manischEntry.manisch;
			});
		return words;
	}
}

// NOTE: temp

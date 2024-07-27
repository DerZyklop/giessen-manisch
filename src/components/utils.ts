import germanJson from './../assets/translations/german.json';
import manischJson from './../assets/translations/manisch.json';
import sideNotesJson from './../assets/translations/sidenotes.json';

type TranslationBase = {
	id: number,
	sideNotes?: number[],
}

export type ManischToGermanBase = TranslationBase & {
	manisch: string,
	germanIds: number[],
	relatedManischIds?: number[],
}
export type GermanToManischBase = TranslationBase & {
	german: string,
	manischIds: number[],
	relatedGermanIds?: number[],
}
export type GermanToManisch = GermanToManischBase & {
	sideNotes: string[],
	relatedGermanIds: number[],
}
export type ManischToGerman = ManischToGermanBase & {
	sideNotes: string[],
	relatedManischIds: number[],
}

export type SideNote = {
	id: number,
	text: string,
}

const manischEntries = (manischJson as ManischToGerman[]).map((item) => {
	return {
		...item,
		relatedManischIds: item.relatedManischIds ?? [],
	} as ManischToGerman;
});

const germanEntries = (germanJson as GermanToManischBase[]).map((item) => {
	return {
		...item,
		relatedGermanIds: item.relatedGermanIds ?? [],
	} as GermanToManisch;
});
const sideNotes : SideNote[] = sideNotesJson;

export type Translation = ManischToGerman | GermanToManisch;

const addSideNotesAsString = <T extends Translation>(item: T) => {
	return {
		...item,
		sideNotes: item.sideNotes?.map(id => {
			return sideNotes.find(sideNote => sideNote.id === id)!.text;
		}) ?? [],
	};
}

export const manischToGerman = manischEntries.map(addSideNotesAsString).sort((a, b) => {
	if (a.manisch < b.manisch) return -1;
	if (a.manisch > b.manisch) return 1;
	return 0;
});
export const germanToManisch = germanEntries.map(addSideNotesAsString).sort((a, b) => {
	if (a.german < b.german) return -1;
	if (a.german > b.german) return 1;
	return 0;
});

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
}) : ManischToGerman | GermanToManisch;
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

export function getTranslatedEntries(input: { manisch: string }) : GermanToManisch[];
export function getTranslatedEntries(input: { german: string }) : ManischToGerman[];
export function getTranslatedEntries(input: { german: string } | { manisch: string }) : ManischToGerman[] | GermanToManisch[];
export function getTranslatedEntries(input: { german: string } | { manisch: string }) : ManischToGerman[] | GermanToManisch[] {
	if ('manisch' in input) {
		const translationEntry = getTranslationEntry(input);
		const translationWordIds = translationEntry?.germanIds ?? [];
		const translatedItems = germanToManisch
			.filter((item) => {
				return translationWordIds.includes(item.id)
			});
		return translatedItems;
	} else {
		const translationEntry = getTranslationEntry(input);
		const translationWordIds = translationEntry?.manischIds ?? [];
		const translatedItems = translationWordIds
			.map(twId => {
				const manischEntry = manischToGerman.find(m2g => m2g.id === twId);
				if (!manischEntry) throw new Error(`manischEntry with id »${twId}« not found`);
				return manischEntry;
			});
		return translatedItems;
	}
}

export function getNextTranslation(input: ManischToGerman) : ManischToGerman;
export function getNextTranslation(input: GermanToManisch) : GermanToManisch;
export function getNextTranslation(input: ManischToGerman | GermanToManisch) : ManischToGerman | GermanToManisch;
export function getNextTranslation(input: ManischToGerman | GermanToManisch) : ManischToGerman | GermanToManisch {
	let src = 'manisch' in input ? manischToGerman : germanToManisch;
	let indexTranslation = src.findIndex(item => item.id === input.id);
	let nextTranslation = src[indexTranslation + 1];
	if (!nextTranslation) nextTranslation = src[0];
	return nextTranslation;
}
export function getPrevTranslation(input: ManischToGerman) : ManischToGerman;
export function getPrevTranslation(input: GermanToManisch) : GermanToManisch;
export function getPrevTranslation(input: ManischToGerman | GermanToManisch) : ManischToGerman | GermanToManisch;
export function getPrevTranslation(input: ManischToGerman | GermanToManisch) : ManischToGerman | GermanToManisch {
	let src = 'manisch' in input ? manischToGerman : germanToManisch;
	let indexTranslation = src.findIndex(item => item.id === input.id);
	let nextTranslation = src[indexTranslation - 1];
	if (!nextTranslation) nextTranslation = src[src.length - 1];
	return nextTranslation;
}

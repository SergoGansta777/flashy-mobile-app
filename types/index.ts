export type CardDeckMetadata = {
	id: number
	cardsCount: number
	userId: number
	name: string
	createdAt: Date
	repeatedAt: Date
	isFavorite: boolean
}

export type FlashCard = {
	term: string
	answer: string
}

export type CardDeckContent = {
	deckId: number
	cards: FlashCard[]
}

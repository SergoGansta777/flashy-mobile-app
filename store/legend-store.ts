import { initialCardDecks } from "@/constants";
import { CardDeck } from "@/types";
import { observable, observe } from "@legendapp/state";

// Initialize the observable state
const state$ = observable({
  decks: initialCardDecks, // initialize with your initial card decks
  currentDeckId: null,
  currentDeckCardFilter: null,
});

const addDeck = (deck: CardDeck) => {
  state$.decks.set((decks) => [...decks, deck]);
  state$.currentDeckId.set(deck.id); // Set the current deck after adding it
};

const deleteDeck = (deckId: number) => {
  state$.decks.set((decks) => {
    const newDecks = decks.filter((deck) => deck.id !== deckId);
    if (newDecks.length > 0 && state$.currentDeckId.get() === deckId) {
      state$.currentDeckId.set(newDecks[0].id); // Set the new current deck
    } else {
      state$.currentDeckId.set(null);
    }
    return newDecks;
  });
};

const updateDeck = (deckId: number, updatedDeck: Partial<CardDeck>) => {
  state$.decks.set((decks) =>
    decks.map((deck) =>
      deck.id === deckId ? { ...deck, ...updatedDeck } : deck,
    ),
  );
};

const toggleFavorite = (deckId: number) => {
  state$.decks.set((decks) =>
    decks.map((deck) =>
      deck.id === deckId ? { ...deck, isFavorite: !deck.isFavorite } : deck,
    ),
  );
};

const addCard = (deckId: number, card: FlashCard) => {
  state$.decks.set((decks) =>
    decks.map((deck) =>
      deck.id === deckId ? { ...deck, cards: [...deck.cards, card] } : deck,
    ),
  );
};

const updateCard = (
  deckId: number,
  cardIndex: number,
  updatedCard: Partial<FlashCard>,
) => {
  state$.decks.set((decks) =>
    decks.map((deck) =>
      deck.id === deckId
        ? {
            ...deck,
            cards: deck.cards.map((card, index) =>
              index === cardIndex ? { ...card, ...updatedCard } : card,
            ),
          }
        : deck,
    ),
  );
};

const deleteCard = (deckId: number, cardIndex: number) => {
  state$.decks.set((decks) =>
    decks.map((deck) =>
      deck.id === deckId
        ? {
            ...deck,
            cards: deck.cards.filter((_, index) => index !== cardIndex),
          }
        : deck,
    ),
  );
};

const setCurrentDeck = (deckId: number) => {
  const deckExists = state$.decks.get().some((deck) => deck.id === deckId);
  if (deckExists) {
    state$.currentDeckId.set(deckId);
  }
};

const setCurrentDeckCardFilter = (ids: number[] | null) => {
  state$.currentDeckCardFilter.set(ids);
};

// Observers for your store can now be easily set up using `observe`
observe(() => {
  console.log("Current Deck:", state$.currentDeckId.get());
});

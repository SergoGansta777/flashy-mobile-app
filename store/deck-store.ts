import type { CardDeck, FlashCard } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type DeckStore = {
  decks: CardDeck[];
  currentDeckId: string | null;
  currentDeckCardFilter: string[] | null;
  addDeck: (deck: CardDeck) => void;
  deleteDeck: (deckId: string) => void;
  updateDeck: (deckId: string, updatedDeck: Partial<CardDeck>) => void;
  toggleFavorite: (deckId: string) => void;
  addCard: (deckId: string, card: FlashCard) => void;
  updateCard: (
    deckId: string,
    cardId: string,
    updatedCard: Partial<FlashCard>,
  ) => void;
  deleteCard: (deckId: string, cardId: string) => void;
  setCurrentDeck: (deckId: string) => void;
  setCurrentDeckCardFilter: (ids: string[] | null) => void;
};

export const useDeckStore = create<DeckStore>()(
  devtools(
    persist(
      (set, get) => ({
        decks: [],
        currentDeckId: null,
        currentDeckCardFilter: null,

        addDeck: (deck: CardDeck) => {
          set((state) => ({
            decks: [...state.decks, deck],
            currentDeckId: deck.id,
          }));
        },

        deleteDeck: (deckId: string) => {
          set((state) => {
            const newDecks = state.decks.filter((deck) => deck.id !== deckId);
            return {
              decks: newDecks,
              currentDeckId:
                state.currentDeckId === deckId
                  ? newDecks.length > 0
                    ? newDecks[0].id
                    : null
                  : state.currentDeckId,
            };
          });
        },

        updateDeck: (deckId: string, updatedDeck: Partial<CardDeck>) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId ? { ...deck, ...updatedDeck } : deck,
            ),
          }));
        },

        toggleFavorite: (deckId: string) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? { ...deck, isFavorite: !deck.isFavorite }
                : deck,
            ),
          }));
        },

        addCard: (deckId: string, card: FlashCard) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? { ...deck, cards: [...deck.cards, card] }
                : deck,
            ),
          }));
        },

        updateCard: (
          deckId: string,
          cardId: string,
          updatedCard: Partial<FlashCard>,
        ) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.map((card) =>
                      cardId === card.id ? { ...card, ...updatedCard } : card,
                    ),
                  }
                : deck,
            ),
          }));
        },

        deleteCard: (deckId: string, cardId: string) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.filter((card) => card.id !== cardId),
                  }
                : deck,
            ),
          }));
        },

        setCurrentDeck: (deckId: string) => {
          const deckExists = get().decks.some((deck) => deck.id === deckId);
          if (deckExists) {
            set({ currentDeckId: deckId });
          }
        },

        setCurrentDeckCardFilter: (ids: string[] | null) =>
          set({ currentDeckCardFilter: ids }),
      }),
      {
        name: "deck-storage-local",
        version: 1,
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

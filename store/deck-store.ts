import { initialCardDecks } from "@/constants";
import type { CardDeck, FlashCard } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type DeckStore = {
  decks: CardDeck[];
  currentDeckId: number | null;
  currentDeckCardFilter: number[] | null;
  addDeck: (deck: CardDeck) => void;
  deleteDeck: (deckId: number) => void;
  updateDeck: (deckId: number, updatedDeck: Partial<CardDeck>) => void;
  toggleFavorite: (deckId: number) => void;
  addCard: (deckId: number, card: FlashCard) => void;
  updateCard: (
    deckId: number,
    cardIndex: number,
    updatedCard: Partial<FlashCard>,
  ) => void;
  deleteCard: (deckId: number, cardIndex: number) => void;
  setCurrentDeck: (deckId: number) => void;
  setCurrentDeckCardFilter: (ids: number[] | null) => void;
};

export const useDeckStore = create<DeckStore>()(
  devtools(
    persist(
      (set, get) => ({
        decks: initialCardDecks,
        currentDeckId: null,
        currentDeckCardFilter: null,

        addDeck: (deck: CardDeck) => {
          set((state) => ({
            decks: [...state.decks, deck],
            currentDeckId: deck.id,
          }));
        },

        deleteDeck: (deckId: number) => {
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

        updateDeck: (deckId: number, updatedDeck: Partial<CardDeck>) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId ? { ...deck, ...updatedDeck } : deck,
            ),
          }));
        },

        toggleFavorite: (deckId: number) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? { ...deck, isFavorite: !deck.isFavorite }
                : deck,
            ),
          }));
        },

        addCard: (deckId: number, card: FlashCard) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? { ...deck, cards: [...deck.cards, card] }
                : deck,
            ),
          }));
        },

        updateCard: (
          deckId: number,
          cardIndex: number,
          updatedCard: Partial<FlashCard>,
        ) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.map((card, index) =>
                      index === cardIndex ? { ...card, ...updatedCard } : card,
                    ),
                  }
                : deck,
            ),
          }));
        },

        deleteCard: (deckId: number, cardIndex: number) => {
          set((state) => ({
            decks: state.decks.map((deck) =>
              deck.id === deckId
                ? {
                    ...deck,
                    cards: deck.cards.filter((_, index) => index !== cardIndex),
                  }
                : deck,
            ),
          }));
        },

        setCurrentDeck: (deckId: number) => {
          const deckExists = get().decks.some((deck) => deck.id === deckId);
          if (deckExists) {
            set({ currentDeckId: deckId });
          }
        },

        setCurrentDeckCardFilter: (ids: number[] | null) =>
          set({ currentDeckCardFilter: ids }),
      }),
      {
        name: "deck-storage",
        version: 2,
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

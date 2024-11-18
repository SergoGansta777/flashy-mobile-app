import { initialCardDecks } from "@/constants";
import type { CardDeck, FlashCard } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type DeckStore = {
  decks: CardDeck[];
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
};

export const useDeckStore = create<DeckStore>()(
  devtools(
    persist(
      (set, get) => ({
        decks: initialCardDecks,

        addDeck: (deck: CardDeck) => {
          set((state) => ({
            decks: [...state.decks, deck],
          }));
        },

        deleteDeck: (deckId: number) => {
          set((state) => ({
            decks: state.decks.filter((deck) => deck.id !== deckId),
          }));
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
      }),
      { name: "deck-storage", version: 1 },
    ),
  ),
);

import type { CardDeck } from "@/types";

export const deckSortOptions = [
  {
    label: "Created at",
    sortFunction: (a: CardDeck, b: CardDeck) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  },
  {
    label: "Favorite",
    sortFunction: (a: CardDeck, b: CardDeck) =>
      Number(b.isFavorite) - Number(a.isFavorite),
  },
  {
    label: "Terms",
    sortFunction: (a: CardDeck, b: CardDeck) => b.cards.length - a.cards.length,
  },
  {
    label: "Name",
    sortFunction: (a: CardDeck, b: CardDeck) => a.name.localeCompare(b.name),
  },
];

export type CardDeck = {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  repeatedAt: Date;
  isFavorite: boolean;
  cards: FlashCard[];
};

export type FlashCard = {
  term: string;
  answer: string;
};

export type SortOption<T> = {
  label: string;
  sortFunction: (a: T, b: T) => number;
};

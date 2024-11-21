export type CardDeck = {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  repeatedAt?: Date;
  isFavorite: boolean;
  cards: FlashCard[];
};

export type FlashCard = {
  id: number;
  term: string;
  definition: string;
};

export type SortOption<T> = {
  label: string;
  sortFunction: (a: T, b: T) => number;
};

export type OnboardingContent = {
  id: number;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
};

export type SignInFormType = {
  email: string;
  password: string;
};

export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
};

export type SortDirection = "asc" | "desc";

export type FlashCardDb = {
  id: string;
  term: string;
  definition: string;
  deck_id: string;
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
};

export type DeckDb = {
  id: string;
  name: string;
  is_favorite: boolean;
  card_count: number;
  cards: { string: FlashCardDb }[];
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
};

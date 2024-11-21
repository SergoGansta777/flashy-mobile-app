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
  answer: string;
};

export type SortOption<T> = {
  label: string;
  sortFunction: (a: T, b: T) => number;
};

export type OnboardingContent = {
  id: number;
  title: string;
  description: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

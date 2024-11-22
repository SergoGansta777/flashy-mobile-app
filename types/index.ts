import { LucideIcon } from "lucide-react-native";

export type CardDeck = {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  repeatedAt?: Date;
  isFavorite: boolean;
  cards: FlashCard[];
};

export type FlashCard = {
  id: string;
  term: string;
  definition: string;
};

export type SortOption<T> = {
  icon: LucideIcon;
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

export type CardFlipDirection = "horizontal" | "vertical";

export type ColorScheme = "light" | "dark" | "system";

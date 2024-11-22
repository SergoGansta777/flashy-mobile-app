import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getAvatarFallback(name: string, lastName: string) {
  return (name.charAt(0) + lastName.charAt(0)).toUpperCase();
}

export function getNameFromEmail(email?: string) {
  return email?.split("@")[0].toUpperCase();
}

export function getEmptyDeck() {
  return {
    id: 100,
    userId: 23,
    name: "",
    isFavorite: false,
    cards: [{ id: 0, term: "", definition: "" }],
    createdAt: new Date(),
    repeatedAt: new Date(),
  };
}

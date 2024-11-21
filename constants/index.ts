import finish from "@/assets/images/finish.png";
import loginHeader from "@/assets/images/login.png";
import logupHeader from "@/assets/images/logup.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import type { CardDeck } from "@/types";

export const appName = "Flashy";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  logupHeader,
  loginHeader,
  finish,
};

export const onboarding = [
  {
    id: 0,
    title: "Master Any Subject, One Card at a Time!",
    description:
      "Begin your learning journey by creating personalized flashcards and quizzes to fit your study goals.",
    image: images.onboarding1,
  },
  {
    id: 1,
    title: "Learn Faster, Retain Better",
    description:
      "Use smart learning techniques like spaced repetition to ensure you remember what you study.",
    image: images.onboarding2,
  },
  {
    id: 2,
    title: "Ready to Ace Your Next Exam? Let's Go!",
    description:
      "Dive into your flashcard sets, track your progress, and get ready to achieve your learning targets!",
    image: images.onboarding3,
  },
];

export const initialCardDecks: CardDeck[] = [
  {
    id: 1,
    userId: 23,
    name: "Physics",
    createdAt: new Date(2023, 1, 3),
    repeatedAt: new Date(2023, 1, 10),
    isFavorite: true,
    cards: [
      {
        id: 0,
        term: "Newton’s First Law",
        definition:
          "An object in motion stays in motion unless acted upon by an external force.",
      },
      {
        id: 1,
        term: "Photosynthesis",
        definition:
          "The process by which green plants use sunlight to synthesize foods from carbon dioxide and water.",
      },
      {
        id: 2,
        term: "Pythagorean Theorem",
        definition:
          "In a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
      },
    ],
  },
  {
    id: 2,
    userId: 42,
    name: "Biology",
    createdAt: new Date(2023, 2, 14),
    repeatedAt: new Date(2023, 3, 5),
    isFavorite: true,
    cards: [
      {
        id: 0,
        term: "Mitochondria",
        definition:
          "The powerhouse of the cell, generating most of the cell’s supply of ATP.",
      },
      {
        id: 1,
        term: "DNA",
        definition:
          "Deoxyribonucleic acid, the molecule that carries genetic information in living organisms.",
      },
      {
        id: 2,
        term: "Genotype",
        definition: "The genetic constitution of an individual organism.",
      },
    ],
  },
  {
    id: 3,
    userId: 15,
    name: "History",
    createdAt: new Date(2023, 4, 21),
    repeatedAt: new Date(2023, 5, 3),
    isFavorite: true,
    cards: [
      {
        id: 0,
        term: "The Great Wall of China",
        definition:
          "A series of fortifications made of stone, brick, and other materials built to protect China from invasions.",
      },
      {
        id: 1,
        term: "Renaissance",
        definition:
          "A period in European history marking the transition from the Middle Ages to modernity.",
      },
      {
        id: 2,
        term: "Industrial Revolution",
        definition:
          "The period of rapid industrial growth that began in the late 18th century.",
      },
    ],
  },
  {
    id: 4,
    userId: 8,
    name: "Mathematics",
    createdAt: new Date(2023, 6, 9),
    repeatedAt: new Date(2023, 6, 22),
    isFavorite: true,
    cards: [
      {
        id: 0,
        term: "Algorithm",
        definition:
          "A step-by-step procedure for solving a problem or performing a task.",
      },
      {
        id: 1,
        term: "Binary Search",
        definition:
          "An efficient algorithm for finding an item in a sorted list by repeatedly dividing the search interval in half.",
      },
      {
        id: 2,
        term: "Recursion",
        definition:
          "A method where the solution to a problem depends on solutions to smaller instances of the same problem.",
      },
    ],
  },
  {
    id: 5,
    userId: 37,
    name: "Computer Science",
    createdAt: new Date(2023, 7, 17),
    repeatedAt: new Date(2023, 7, 29),
    isFavorite: false,
    cards: [],
  },
  {
    id: 6,
    userId: 29,
    name: "Chemistry",
    createdAt: new Date(2023, 8, 3),
    repeatedAt: new Date(2023, 8, 12),
    isFavorite: false,
    cards: [],
  },
  {
    id: 7,
    userId: 51,
    name: "Literature",
    createdAt: new Date(2023, 9, 5),
    repeatedAt: new Date(2023, 9, 20),
    isFavorite: false,
    cards: [],
  },
  {
    id: 8,
    userId: 12,
    name: "Art History",
    createdAt: new Date(2023, 10, 11),
    repeatedAt: new Date(2023, 10, 25),
    isFavorite: false,
    cards: [],
  },
  {
    id: 9,
    userId: 5,
    name: "Geography",
    createdAt: new Date(2023, 11, 2),
    repeatedAt: new Date(2023, 11, 10),
    isFavorite: false,
    cards: [],
  },
  {
    id: 10,
    userId: 39,
    name: "Psychology",
    createdAt: new Date(2023, 1, 15),
    repeatedAt: new Date(2023, 2, 1),
    isFavorite: false,
    cards: [],
  },
];

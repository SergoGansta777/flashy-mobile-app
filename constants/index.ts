import finish from "@/assets/images/finish.png";
import loginHeader from "@/assets/images/login.png";
import logupHeader from "@/assets/images/logup.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";

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

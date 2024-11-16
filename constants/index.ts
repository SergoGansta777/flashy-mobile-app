import loginHeader from '@/assets/images/login.png'
import logupHeader from '@/assets/images/logup.png'
import onboarding1 from '@/assets/images/onboarding1.png'
import onboarding2 from '@/assets/images/onboarding2.png'
import onboarding3 from '@/assets/images/onboarding3.png'

export const appName = 'Flashy'

export const images = {
	onboarding1,
	onboarding2,
	onboarding3,
	logupHeader,
	loginHeader,
}

export const onboarding = [
	{
		id: 1,
		title: 'Master Any Subject, One Card at a Time!',
		description:
			'Begin your learning journey by creating personalized flashcards and quizzes to fit your study goals.',
		image: images.onboarding1,
	},
	{
		id: 2,
		title: 'Learn Faster, Retain Better',
		description:
			'Use smart learning techniques like spaced repetition to ensure you remember what you study.',
		image: images.onboarding2,
	},
	{
		id: 3,
		title: "Ready to Ace Your Next Exam? Let's Go!",
		description:
			'Dive into your flashcard sets, track your progress, and get ready to achieve your learning targets!',
		image: images.onboarding3,
	},
]

export const initialCardsGroups = [
	{
		id: 1,
		name: 'Physics',
		cardsCount: 14,
		userId: 23,
		createdAt: new Date(2023, 1, 3),
		repeatedAt: new Date(2023, 1, 10),
		isFavorite: true,
	},
	{
		id: 2,
		name: 'Biology',
		cardsCount: 8,
		userId: 42,
		createdAt: new Date(2023, 2, 14),
		repeatedAt: new Date(2023, 3, 5),
		isFavorite: true,
	},
	{
		id: 3,
		name: 'History',
		cardsCount: 20,
		userId: 15,
		createdAt: new Date(2023, 4, 21),
		repeatedAt: new Date(2023, 5, 3),
		isFavorite: true,
	},
	{
		id: 4,
		name: 'Mathematics',
		cardsCount: 12,
		userId: 8,
		createdAt: new Date(2023, 6, 9),
		repeatedAt: new Date(2023, 6, 22),
		isFavorite: true,
	},
	{
		id: 5,
		name: 'Computer Science',
		cardsCount: 16,
		userId: 37,
		createdAt: new Date(2023, 7, 17),
		repeatedAt: new Date(2023, 7, 29),
		isFavorite: false,
	},
	{
		id: 6,
		name: 'Chemistry',
		cardsCount: 11,
		userId: 29,
		createdAt: new Date(2023, 8, 3),
		repeatedAt: new Date(2023, 8, 12),
		isFavorite: false,
	},
	{
		id: 7,
		name: 'Literature',
		cardsCount: 18,
		userId: 51,
		createdAt: new Date(2023, 9, 5),
		repeatedAt: new Date(2023, 9, 20),
		isFavorite: false,
	},
	{
		id: 8,
		name: 'Art History',
		cardsCount: 9,
		userId: 12,
		createdAt: new Date(2023, 10, 11),
		repeatedAt: new Date(2023, 10, 25),
		isFavorite: false,
	},
	{
		id: 9,
		name: 'Geography',
		cardsCount: 7,
		userId: 5,
		createdAt: new Date(2023, 11, 2),
		repeatedAt: new Date(2023, 11, 10),
		isFavorite: false,
	},
	{
		id: 10,
		name: 'Psychology',
		cardsCount: 15,
		userId: 39,
		createdAt: new Date(2023, 1, 15),
		repeatedAt: new Date(2023, 2, 1),
		isFavorite: false,
	},
]

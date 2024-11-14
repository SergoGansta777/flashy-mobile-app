import onboarding1 from '@/assets/images/idea1.png'
import onboarding2 from '@/assets/images/idea2.png'
import onboarding3 from '@/assets/images/idea3.png'

export const images = {
	onboarding1,
	onboarding2,
	onboarding3,
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

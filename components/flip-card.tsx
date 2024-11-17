import { FlashCard } from '@/types'
import type React from 'react'
import { Pressable } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { H1, Small } from './ui/typography'

type FlippableCardProps = {
	card: FlashCard
}

const FlippableCard: React.FC<FlippableCardProps> = ({ card }) => {
	const isFlipped = useSharedValue(false)

	const handlePress = () => {
		isFlipped.value = !isFlipped.value
	}

	const spinValue = useDerivedValue(() =>
		withTiming(isFlipped.value ? 180 : 0, { duration: 500 })
	)

	const frontCardStyle = useAnimatedStyle(() => {
		const rotateY = `${spinValue.value}deg`
		return {
			transform: [{ rotateY }],
			backfaceVisibility: 'hidden',
		}
	})

	const backCardStyle = useAnimatedStyle(() => {
		const rotateY = `${spinValue.value + 180}deg`
		return {
			transform: [{ rotateY }],
			backfaceVisibility: 'hidden',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		}
	})

	return (
		<Pressable
			onPress={handlePress}
			className='flex items-center justify-center'
		>
			{/* Front Side of the Card */}
			<Animated.View style={frontCardStyle}>
				<Card className='w-[350px] h-[600px]'>
					<CardHeader>
						<Small className='text-muted-foreground'>What is that?</Small>
					</CardHeader>
					<CardContent className='flex flex-col items-center justify-center my-auto'>
						<H1 className='flex font-medium text-4xl flex-col items-center justify-center'>
							{card.term}
						</H1>
					</CardContent>
					<CardFooter />
				</Card>
			</Animated.View>

			{/* Back Side of the Card */}
			<Animated.View style={backCardStyle}>
				<Card className='w-[350px] h-[600px]'>
					<CardHeader>
						<Small className='text-muted-foreground'>Correct answer is</Small>
					</CardHeader>
					<CardContent className='flex flex-col items-center justify-center my-auto'>
						<H1 className='flex font-medium text-3xl flex-col items-center justify-center'>
							{card.answer}
						</H1>
					</CardContent>
					<CardFooter />
				</Card>
			</Animated.View>
		</Pressable>
	)
}

export default FlippableCard

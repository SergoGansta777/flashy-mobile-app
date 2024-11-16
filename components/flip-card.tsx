import type React from 'react'
import { Pressable } from 'react-native'
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { H1, Small } from './ui/typography'

type FlippableCardProps = {
	item: { answer: string; term: string }
}

const FlippableCard: React.FC<FlippableCardProps> = ({ item }) => {
	const isFlipped = useSharedValue(false)

	// Function to toggle the flipped state
	const handlePress = () => {
		isFlipped.value = !isFlipped.value
	}

	// Animated styles for the front and back sides of the card
	const frontCardStyle = useAnimatedStyle(() => {
		const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180])
		const rotateY = withTiming(`${spinValue}deg`, { duration: 500 })
		return {
			transform: [{ rotateY }],
			backfaceVisibility: 'hidden',
		}
	})

	const backCardStyle = useAnimatedStyle(() => {
		const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360])
		const rotateY = withTiming(`${spinValue}deg`, { duration: 500 })
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
							{item.term}
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
							{item.answer}
						</H1>
					</CardContent>
					<CardFooter />
				</Card>
			</Animated.View>
		</Pressable>
	)
}

export default FlippableCard

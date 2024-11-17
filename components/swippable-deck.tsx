import type { FlashCard } from '@/types'
import type React from 'react'
import { useCallback, useMemo, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list'
import FlippableCard from './flip-card'
import SwipeInstructions from './swipe-instructions'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'

export type SwippableDeckProps = {
	handleSwipeToLeft: (index: number) => void
	handleSwipeToRight: (index: number) => void
	cards: FlashCard[]
}

const SwippableDeck: React.FC<SwippableDeckProps> = ({
	handleSwipeToLeft,
	handleSwipeToRight,
	cards,
}) => {
	const ref = useRef<SwiperCardRefType>()

	const renderCard = useCallback(
		(card: FlashCard) => <FlippableCard card={card} />,
		[]
	)

	const OverlayLabelRight = useMemo(
		() => (
			<Card className='w-[350px] h-[600px] border-solid border-green-500 bg-green-500/5'>
				<CardHeader />
				<CardContent className='flex flex-col items-center justify-center my-auto' />
				<CardFooter />
			</Card>
		),
		[]
	)

	const OverlayLabelLeft = useMemo(
		() => (
			<Card className='w-[350px] h-[600px] border-solid border-red-500 bg-red-500/5'>
				<CardHeader />
				<CardContent className='flex flex-col items-center justify-center my-auto' />
				<CardFooter />
			</Card>
		),
		[]
	)

	const handleSwipe = useCallback(
		(index: number, direction: 'left' | 'right') => {
			runOnJS(() => {
				if (direction === 'left') {
					handleSwipeToLeft(index)
				} else {
					handleSwipeToRight(index)
				}
			})()
		},
		[handleSwipeToLeft, handleSwipeToRight]
	)
	return (
		<>
			<GestureHandlerRootView className='w-full h-full flex items-center justify-center'>
				<Swiper
					ref={ref}
					data={cards}
					renderCard={renderCard}
					disableTopSwipe={true}
					OverlayLabelRight={() => OverlayLabelRight}
					OverlayLabelLeft={() => OverlayLabelLeft}
					onSwipeLeft={index => handleSwipe(index, 'left')}
					onSwipeRight={index => handleSwipe(index, 'right')}
				/>
			</GestureHandlerRootView>
			<SwipeInstructions />
		</>
	)
}

export default SwippableDeck

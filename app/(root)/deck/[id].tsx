import TopBar from '@/components/deck-card-top-bar'
import FlippableCard from '@/components/flip-card'
import ProgressBar from '@/components/progress-bar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { P } from '@/components/ui/typography'
import { cardDeck } from '@/constants'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list'

const DeckDetail = () => {
	const ref = useRef<SwiperCardRefType>()
	const { id } = useLocalSearchParams()
	const deckId = Number(id)
	const deckContent = cardDeck.find(item => item.deckId === deckId)

	const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([])
	const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([])

	const totalCards = deckContent?.cards.length ?? 0
	const totalSwiped = rightSwipedIds.length + leftSwipedIds.length

	const renderCard = useCallback(
		(item: any) => <FlippableCard item={item} />,
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
			if (direction === 'left') {
				setLeftSwipedIds(prev => [...prev, index])
			} else {
				setRightSwipedIds(prev => [...prev, index])
			}
		},
		[]
	)

	return (
		<SafeAreaView className='h-full w-full px-4 flex flex-col items-center'>
			<TopBar totalSwiped={totalSwiped} totalCards={totalCards} />
			<ProgressBar progress={(totalSwiped / totalCards) * 100} />
			<View className='w-full flex flex-row items-center justify-between mt-2'>
				<View className='border-solid border border-l-0 border-red-500 rounded-r-full bg-red-500/4'>
					<P className='p-2 pl-3 pr-4 text-red-500 text-lg ml-1 mr-2'>
						{leftSwipedIds.length}
					</P>
				</View>
				<View className='border-solid border border-r-0 border-green-500 rounded-l-full bg-green-500/4'>
					<P className='p-2 pl-4 pr-3 text-green-500 text-lg ml-2 mr-1'>
						{rightSwipedIds.length}
					</P>
				</View>
			</View>

			<GestureHandlerRootView className='w-full h-full flex items-center justify-center'>
				<Swiper
					ref={ref}
					data={deckContent?.cards}
					renderCard={renderCard}
					OverlayLabelRight={() => OverlayLabelRight}
					OverlayLabelLeft={() => OverlayLabelLeft}
					onSwipeLeft={index => handleSwipe(index, 'left')}
					onSwipeRight={index => handleSwipe(index, 'right')}
				/>
			</GestureHandlerRootView>
		</SafeAreaView>
	)
}

export default DeckDetail

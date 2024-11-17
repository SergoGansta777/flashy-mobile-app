import FlippableCard from '@/components/flip-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { H4 } from '@/components/ui/typography'
import { cardGroupsContents } from '@/constants'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list'

const GroupScreen = () => {
	const ref = useRef<SwiperCardRefType>()
	const { id } = useLocalSearchParams()
	const groupId = Number(id)
	const groupContent = cardGroupsContents.find(item => item.groupId === groupId)

	const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([])
	const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([])

	const totalCards = groupContent?.cards.length ?? 0
	const totalSwiped = rightSwipedIds.length + leftSwipedIds.length

	// Memoize the renderCard function to avoid unnecessary re-renders
	const renderCard = useCallback(
		(item: any) => <FlippableCard item={item} />,
		[]
	)

	// Overlay components for swipe directions
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

	// Handler to track swipes
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
		<SafeAreaView className='h-full w-full px-4 flex items-center'>
			<TopBar totalSwiped={totalSwiped} totalCards={totalCards} />
			<ProgressBar progress={(totalSwiped / totalCards) * 100} />

			<GestureHandlerRootView className='w-full h-full flex items-center justify-center'>
				<Swiper
					ref={ref}
					data={groupContent?.cards}
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

export default GroupScreen

// Extracted TopBar component
const TopBar = ({
	totalSwiped,
	totalCards,
}: {
	totalSwiped: number
	totalCards: number
}) => (
	<View className='flex flex-row items-center justify-between w-full'>
		<Button variant='ghost' onPress={() => router.back()}>
			<AntDesign name='back' size={24} color='black' />
		</Button>
		<H4>
			{totalSwiped} / {totalCards}
		</H4>
		<View className='pr-5'>
			<MaterialCommunityIcons name='dots-vertical' size={24} color='black' />
		</View>
	</View>
)

// Extracted ProgressBar component
const ProgressBar = ({ progress }: { progress: number }) => (
	<View className='w-full'>
		<Progress className='rounded-none h-2' value={progress} />
	</View>
)

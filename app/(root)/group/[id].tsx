import FlippableCard from '@/components/flip-card'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cardGroupsContents } from '@/constants'
import { useLocalSearchParams } from 'expo-router'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list'

const GroupScreen = () => {
	const ref = useRef<SwiperCardRefType>()
	const { id } = useLocalSearchParams()
	const groupId = Number(id)
	const groupContent = cardGroupsContents.find(item => item.groupId === groupId)

	return (
		<SafeAreaView className='h-full w-full'>
			<GestureHandlerRootView className='w-full h-full flex items-center justify-center px-4'>
				<Swiper
					ref={ref}
					data={groupContent?.cards}
					renderCard={item => {
						return <FlippableCard item={item} />
					}}
					OverlayLabelRight={() => (
						<Card className='w-[350px] h-[600px] border-solid border-green-500 bg-green-500/5'>
							<CardHeader />
							<CardContent className='flex flex-col items-center justify-center my-auto' />
							<CardFooter />
						</Card>
					)}
					OverlayLabelLeft={() => (
						<Card className='w-[350px] h-[600px] border-solid border-red-500 bg-red-500/5'>
							<CardHeader />
							<CardContent className='flex flex-col items-center justify-center my-auto' />
							<CardFooter />
						</Card>
					)}
				/>
			</GestureHandlerRootView>
		</SafeAreaView>
	)
}

export default GroupScreen

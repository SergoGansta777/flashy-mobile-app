import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { H1 } from '@/components/ui/typography'
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
						return (
							<Card className='w-[350px] h-[600px]'>
								<CardHeader />
								<CardContent className='flex flex-col items-center justify-center my-auto'>
									<H1 className='flex font-medium text-6xl flex-col items-center justify-center'>
										{item.term}
									</H1>
								</CardContent>
								<CardFooter />
							</Card>
						)
					}}
				/>
			</GestureHandlerRootView>
		</SafeAreaView>
	)
}

export default GroupScreen

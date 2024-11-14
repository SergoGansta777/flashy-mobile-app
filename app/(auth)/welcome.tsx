import { Button } from '@/components/ui/button'
import { H1, Large, P } from '@/components/ui/typography'
import { onboarding } from '@/constants'
import { router } from 'expo-router'
import React, { useMemo, useRef, useState } from 'react'
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'

const Welcome = () => {
	const swiperRef = useRef<Swiper>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	const isLastSlide = useMemo(
		() => activeIndex === onboarding.length - 1,
		[activeIndex]
	)
	return (
		<SafeAreaView className='flex h-full items-center justify-between'>
			<TouchableOpacity
				onPress={() => {
					router.replace('/(auth)/sign-up')
				}}
				className='w-11/12 flex justify-end items-end p-5'
			>
				<P className='text-primary'>Skip</P>
			</TouchableOpacity>

			<Swiper
				ref={swiperRef}
				loop={false}
				dot={
					<View className='w-[32px] h-[4px] mx-1 bg-gray-300 rounded-full' />
				}
				activeDot={
					<View className='w-[32px] h-[4px] mx-1 bg-primary rounded-full' />
				}
				onIndexChanged={index => setActiveIndex(index)}
			>
				{onboarding.map(item => (
					<View key={item.id} className='flex items-center justify-center p-5'>
						<Image
							source={item.image}
							className='w-full h-[350px]'
							resizeMode='contain'
						/>
						<View className='flex flex-row items-center justify-center w-full mt-10'>
							<H1 className='text-primary text-3xl font-bold mx-10 text-center'>
								{item.title}
							</H1>
						</View>
						<P className='text-slate-500 text-center  mx-10 mt-3'>
							{item.description}
						</P>
					</View>
				))}
			</Swiper>

			<Button
				className='w-10/12'
				size='lg'
				onPress={() => {
					isLastSlide
						? router.replace('/(auth)/sign-up')
						: swiperRef.current?.scrollBy(1)
				}}
			>
				<Large className='text-primary-foreground'>
					{isLastSlide ? 'Get Started' : 'Next'}
				</Large>
			</Button>
		</SafeAreaView>
	)
}

export default Welcome

import { images } from '@/constants'
import type React from 'react'
import { useMemo } from 'react'
import { Image, View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { Button } from './ui/button'
import { H3, H4, Large, Lead, P } from './ui/typography'

type CompletedDeckProps = {
	known: number
	stillLearning: number
	total: number
}

const CompletedDeck: React.FC<CompletedDeckProps> = ({
	known,
	stillLearning,
	total,
}) => {
	const totalSwiped = useMemo(
		() => known + stillLearning,
		[known, stillLearning]
	)

	return (
		<View className='flex items-center justify-start h-full w-full mt-16 px-8'>
			<View className='w-full flex flex-row items-center justify-between'>
				<H3 className='w-4/6'>
					You're doing brilliantly! Keep focusing on the touch terms.
				</H3>
				<Image
					className='w-24 h-24'
					source={images.finish}
					resizeMode='contain'
				/>
			</View>
			<View className='flex flex-row items-center justify-between gap-1  w-full mt-20'>
				<View className='w-2/5'>
					<PieChart
						donut
						radius={50}
						innerRadius={30}
						showGradient={true}
						centerLabelComponent={() => {
							return <Lead className='text-center align-middle'>70%</Lead>
						}}
						data={[
							{ value: known, color: '#44B56E' },
							{ value: stillLearning, color: '#E45858' },
							{ value: total - totalSwiped, color: '#8290A2' },
						]}
					/>
				</View>
				<View className='w-3/5 flex flex-col items-center justify-center gap-3 pr-2'>
					<View className='flex flex-row items-start justify-between w-full'>
						<H4 className='text-green-600/80 font-bold'>Known</H4>
						<H4 className='text-green-600/80 w-7 border border-solid border-green-600 rounded-full text-center'>
							{known}
						</H4>
					</View>
					<View className='flex flex-row items-start justify-between w-full'>
						<H4 className='text-red-600/80 font-bold'>Still learning</H4>
						<H4 className='text-red-600/80 w-7 border border-solid border-red-600 rounded-full text-center'>
							{stillLearning}
						</H4>
					</View>
					<View className='flex flex-row items-start justify-between w-full'>
						<H4 className='text-muted-foreground/80 font-bold'>
							Terms remaining
						</H4>
						<H4 className='text-muted-foreground/80 w-7 border border-solid border-muted-foreground rounded-full text-center'>
							{total - totalSwiped}
						</H4>
					</View>
				</View>
			</View>

			{stillLearning === 0 && (
				<View className='mt-24 w-3/4'>
					<P className='font-semibold text-4xl text-center'>Congratulations!</P>
					<Lead className='text-center mt-1'>You remember them all.</Lead>
				</View>
			)}

			{stillLearning > 0 && (
				<Button className='absolute bottom-40 w-full' size='lg'>
					{stillLearning === 1 ? (
						<Large className='text-primary-foreground font-medium'>
							Keep reviewing {stillLearning} term
						</Large>
					) : (
						<Large className='text-primary-foreground font-medium'>
							Keep reviewing {stillLearning} terms
						</Large>
					)}
				</Button>
			)}
			<Button className='absolute bottom-28 w-full' variant='ghost'>
				<Lead>Restart flashcards</Lead>
			</Button>
		</View>
	)
}

export default CompletedDeck

import { images } from '@/constants'
import type React from 'react'
import { useMemo } from 'react'
import { Image, View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import StatsSection from './stats-section'
import { Button } from './ui/button'
import { H3, Large, Lead, P } from './ui/typography'

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

	const completionPercentage = useMemo(
		() => Math.round((known / total) * 100) || 0,
		[known, total]
	)

	const pieChartData = useMemo(
		() => [
			{ value: known, color: '#44B56E' },
			{ value: stillLearning, color: '#E45858' },
			{ value: total - totalSwiped, color: '#8290A2' },
		],
		[known, stillLearning, total, totalSwiped]
	)

	return (
		<View className='flex items-center justify-start h-full w-full mt-16 px-8'>
			{/* Header Section */}
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

			{/* Pie Chart and Stats Section */}
			<View className='flex flex-row items-center justify-between gap-1 w-full mt-20'>
				<View className='w-2/5'>
					<PieChart
						donut
						radius={50}
						innerRadius={30}
						showGradient
						centerLabelComponent={() => (
							<Lead className='text-center align-middle'>
								{completionPercentage}%
							</Lead>
						)}
						data={pieChartData}
					/>
				</View>
				<StatsSection
					known={known}
					stillLearning={stillLearning}
					remaining={total - totalSwiped}
				/>
			</View>

			{/* Congratulatory Message or Review Button */}
			{stillLearning === 0 ? (
				<View className='mt-24 w-3/4'>
					<P className='font-semibold text-4xl text-center'>Congratulations!</P>
					<Lead className='text-center mt-1'>You remember them all.</Lead>
				</View>
			) : (
				<Button className='absolute bottom-40 w-full' size='lg'>
					<Large className='text-primary-foreground font-medium'>
						Keep reviewing {stillLearning}{' '}
						{stillLearning === 1 ? 'term' : 'terms'}
					</Large>
				</Button>
			)}

			{/* Restart Button */}
			<Button className='absolute bottom-28 w-full' variant='ghost'>
				<Lead>Restart flashcards</Lead>
			</Button>
		</View>
	)
}

export default CompletedDeck

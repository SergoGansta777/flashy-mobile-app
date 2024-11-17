import type React from 'react'
import { View } from 'react-native'
import { P } from './ui/typography'

type SwipeCounterBar = {
	leftCounter: number
	rightCounter: number
}

const SwipeCounterBar: React.FC<SwipeCounterBar> = ({
	leftCounter,
	rightCounter,
}) => {
	return (
		<View className='w-full flex flex-row items-center justify-between mt-2'>
			<View className='border-solid border border-l-0 border-red-500/80 rounded-r-full bg-red-500/4'>
				<P className='p-2 pl-3 pr-4 text-red-500/80 text-lg ml-1 mr-2'>
					{leftCounter}
				</P>
			</View>
			<View className='border-solid border border-r-0 border-green-500/80 rounded-l-full bg-green-500/4'>
				<P className='p-2 pl-4 pr-3 text-green-500/80 text-lg ml-2 mr-1'>
					{rightCounter}
				</P>
			</View>
		</View>
	)
}

export default SwipeCounterBar

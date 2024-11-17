import type React from 'react'
import { View } from 'react-native'
import StatItem from './stat-item'

type StatsProps = {
	known: number
	stillLearning: number
	remaining: number
}

const StatsSection: React.FC<StatsProps> = ({
	known,
	stillLearning,
	remaining,
}) => (
	<View className='w-3/5 flex flex-col items-center justify-center gap-3 pr-2'>
		<StatItem label='Known' value={known} color='text-green-600/80' />
		<StatItem
			label='Still learning'
			value={stillLearning}
			color='text-red-600/80'
		/>
		<StatItem
			label='Terms remaining'
			value={remaining}
			color='text-muted-foreground/80'
		/>
	</View>
)

export default StatsSection

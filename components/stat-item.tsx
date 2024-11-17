import type React from 'react'
import { View } from 'react-native'
import { H4 } from './ui/typography'

type StatItemProps = {
	label: string
	value: number
	color: string
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color }) => (
	<View className='flex flex-row items-start justify-between w-full'>
		<H4 className={`${color} text-left font-bold`}>{label}</H4>
		<H4 className={`${color} text-right`}> {value}</H4>
	</View>
)

export default StatItem

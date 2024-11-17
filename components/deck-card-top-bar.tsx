import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import { View } from 'react-native'
import { Button } from './ui/button'
import { H4 } from './ui/typography'

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

export default TopBar

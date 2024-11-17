import { View } from 'react-native'
import { Progress } from './ui/progress'

const ProgressBar = ({ progress }: { progress: number }) => (
	<View className='w-full'>
		<Progress className='rounded-none h-1' value={progress} />
	</View>
)

export default ProgressBar

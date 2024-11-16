import { cardGroupsContents } from '@/constants'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const GroupScreen = () => {
	const { id } = useLocalSearchParams()
	const groupId = Number(id)
	const groupContent = cardGroupsContents.find(item => item.groupId === groupId)

	return (
		<SafeAreaView>
			<Text>GroupScreen for id: {groupId}</Text>
			<Text>Group length {groupContent?.cards.length}</Text>
		</SafeAreaView>
	)
}

export default GroupScreen

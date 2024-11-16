import GroupCard from '@/components/cards-group-card'
import { H1 } from '@/components/ui/typography'
import { appName, initialCardsGroups } from '@/constants'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

const Home = () => {
	const [cardGroups, setCardGroups] = useState(initialCardsGroups)
	const handleToggleFavorite = (id: number) => {
		setCardGroups(prevGroups =>
			prevGroups.map(group =>
				group.id === id ? { ...group, isFavorite: !group.isFavorite } : group
			)
		)
	}

	return (
		<SafeAreaView className='h-full'>
			<View className='px-10 my-2'>
				<H1>{appName}</H1>
			</View>
			<View>
				<FlatList
					data={cardGroups}
					className='mb-20'
					renderItem={({ item }) => {
						return (
							<GroupCard
								group={item}
								onPress={() => handleToggleFavorite(item.id)}
							/>
						)
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

export default Home

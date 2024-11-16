import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { H1, H4, Small } from '@/components/ui/typography'
import { appName, initialCardsGroups } from '@/constants'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native'

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
					renderItem={({ item: group }) => {
						return (
							<Card className='mt-3 mx-6'>
								<CardHeader className='flex flex-row items-start justify-between'>
									<H4 className='font-medium'>{group.name}</H4>
									<TouchableOpacity
										key={group.id}
										onPress={() => handleToggleFavorite(group.id)}
									>
										<AntDesign
											name={group.isFavorite ? 'star' : 'staro'}
											size={20}
											color='black'
										/>
									</TouchableOpacity>
								</CardHeader>
								<CardContent>
									<Small className='text-primary/40'>
										Terms: {group.cardsCount}
									</Small>
									<Small className='text-primary/40 pt-3'>
										Created at {group.createdAt.toLocaleDateString()}
									</Small>
								</CardContent>
							</Card>
						)
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

export default Home

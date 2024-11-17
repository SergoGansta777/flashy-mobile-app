import DeckCard from '@/components/deck-card'
import { H1 } from '@/components/ui/typography'
import { appName, initialCardDecks } from '@/constants'
import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

const Home = () => {
	const [cardDecks, setCardDecks] = useState(initialCardDecks)
	const handleToggleFavorite = (id: number) => {
		setCardDecks(prev =>
			prev.map(deck =>
				deck.id === id ? { ...deck, isFavorite: !deck.isFavorite } : deck
			)
		)
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
	}

	return (
		<SafeAreaView className='h-full'>
			<View className='px-10 my-2'>
				<H1>{appName}</H1>
			</View>
			<View>
				<FlatList
					data={cardDecks}
					className='mb-20'
					renderItem={({ item }) => {
						return (
							<DeckCard
								deckMetadata={item}
								handleToggleFavorite={() => handleToggleFavorite(item.id)}
							/>
						)
					}}
				/>
			</View>
		</SafeAreaView>
	)
}

export default Home

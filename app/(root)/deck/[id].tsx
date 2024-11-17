import CompletedDeck from '@/components/completed-deck'
import TopBar from '@/components/deck-card-top-bar'
import ProgressBar from '@/components/progress-bar'
import SwipeCounterBar from '@/components/swipe-counter-bar'
import SwippableDeck from '@/components/swippable-deck'
import { cardDeck } from '@/constants'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'

const DeckDetail = () => {
	const { id } = useLocalSearchParams()
	const deckId = Number(id)
	const deckContent = cardDeck.find(item => item.deckId === deckId)

	const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([])
	const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([])

	const totalCards = deckContent?.cards.length ?? 0
	const totalSwiped = rightSwipedIds.length + leftSwipedIds.length

	return (
		<SafeAreaView className='px-4 flex flex-1 flex-col items-center'>
			<TopBar totalSwiped={totalSwiped} totalCards={totalCards} />

			{totalSwiped !== totalCards ? (
				<>
					<ProgressBar value={totalSwiped} total={totalCards} />
					<SwipeCounterBar
						leftCounter={leftSwipedIds.length}
						rightCounter={rightSwipedIds.length}
					/>
					<SwippableDeck
						cards={deckContent?.cards || []}
						handleSwipeToLeft={(index: number) =>
							setLeftSwipedIds(prev => [...prev, index])
						}
						handleSwipeToRight={(index: number) =>
							setRightSwipedIds(prev => [...prev, index])
						}
					/>
				</>
			) : (
				<CompletedDeck
					known={rightSwipedIds.length}
					stillLearning={leftSwipedIds.length}
					total={totalCards}
				/>
			)}
		</SafeAreaView>
	)
}

export default DeckDetail

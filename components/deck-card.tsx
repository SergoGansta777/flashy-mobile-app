import type { CardDeckMetadata } from '@/types'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import type React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from './ui/context-menu'
import { H4, Small } from './ui/typography'

type DeckCardProps = {
	deckMetadata: CardDeckMetadata
	handleToggleFavorite: () => void
}

const DeckCard: React.FC<DeckCardProps> = ({
	deckMetadata,
	handleToggleFavorite,
}) => {
	const insets = useSafeAreaInsets()
	const contentInsets = {
		top: insets.top,
		bottom: insets.bottom,
		left: 12,
		right: 12,
	}

	return (
		<ContextMenu>
			<Link
				asChild
				href={{
					pathname: '/deck/[id]',
					params: { id: deckMetadata.id },
				}}
			>
				<ContextMenuTrigger>
					<Card className='mt-3 mx-6'>
						<CardHeader>
							<View className='flex flex-row items-start justify-between'>
								<H4 className='font-medium'>{deckMetadata.name}</H4>
								<TouchableOpacity
									key={deckMetadata.id}
									onPress={handleToggleFavorite}
									className='p-1'
								>
									<AntDesign
										name={deckMetadata.isFavorite ? 'star' : 'staro'}
										size={20}
									/>
								</TouchableOpacity>
							</View>

							<CardDescription>
								Terms: {deckMetadata.cardsCount}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Small className='text-muted-foreground'>
								Created at {deckMetadata.createdAt.toLocaleDateString()}
							</Small>
						</CardContent>
					</Card>
				</ContextMenuTrigger>
			</Link>

			<ContextMenuContent
				align='start'
				insets={contentInsets}
				className='w-64 native:w-72'
			>
				<ContextMenuItem inset>
					<Text>Edit</Text>
				</ContextMenuItem>
				<ContextMenuItem inset>
					<Text>Delete</Text>
				</ContextMenuItem>
				<ContextMenuItem inset>
					<Text>Toggle favorite</Text>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}

export default DeckCard

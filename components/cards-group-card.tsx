import type { CardGroup } from '@/types'
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

type GroupCardProps = {
	group: CardGroup
	handleToggleFavorite: () => void
}

const GroupCard: React.FC<GroupCardProps> = ({
	group,
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
					pathname: '/group/[id]',
					params: { id: group.id },
				}}
			>
				<ContextMenuTrigger>
					<Card className='mt-3 mx-6'>
						<CardHeader>
							<View className='flex flex-row items-start justify-between'>
								<H4 className='font-medium'>{group.name}</H4>
								<TouchableOpacity key={group.id} onPress={handleToggleFavorite}>
									<AntDesign
										name={group.isFavorite ? 'star' : 'staro'}
										size={20}
										color='black'
									/>
								</TouchableOpacity>
							</View>

							<CardDescription>Terms: {group.cardsCount}</CardDescription>
						</CardHeader>
						<CardContent>
							<Small className='text-primary/40'>
								Created at {group.createdAt.toLocaleDateString()}
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

export default GroupCard

import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'
import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

type NavBarIconWrapperProps = PropsWithChildren & {
	focused: boolean
}

const NavBarIconWrapper: React.FC<NavBarIconWrapperProps> = ({
	focused,
	children,
}) => {
	return (
		<View
			className={`flex flex-row justify-center items-center rounded-full ${
				focused ? 'bg-general-300' : ''
			}`}
		>
			<View
				className={`rounded-full w-16 h-16  items-center justify-center ${
					focused ? 'bg-secondary' : ''
				}`}
			>
				{children}
			</View>
		</View>
	)
}

export default function Layout() {
	return (
		<Tabs
			initialRouteName='home'
			screenOptions={{
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'black',
				tabBarShowLabel: true,
				tabBarStyle: {
					backgroundColor: '#333333',
					borderRadius: 50,
					overflow: 'hidden',
					marginHorizontal: 20,
					marginBottom: 20,
					paddingHorizontal: 14,
					height: 78,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
					position: 'absolute',
				},
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<NavBarIconWrapper focused={focused}>
							<AntDesign
								name='home'
								size={34}
								color={focused ? 'black' : 'white'}
							/>
						</NavBarIconWrapper>
					),
				}}
			/>
			<Tabs.Screen
				name='new-card'
				options={{
					title: 'New',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<NavBarIconWrapper focused={focused}>
							<AntDesign
								name='pluscircleo'
								size={34}
								color={focused ? 'black' : 'white'}
							/>
						</NavBarIconWrapper>
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ focused }) => {
						return (
							<NavBarIconWrapper focused={focused}>
								{/* <Avatar alt='user avatar'>
									<AvatarImage source={{ uri: '' }} />
									<AvatarFallback>
										<Text>SN</Text>
									</AvatarFallback>
								</Avatar> */}
								<AntDesign
									name='user'
									size={34}
									color={focused ? 'black' : 'white'}
								/>
							</NavBarIconWrapper>
						)
					},
				}}
			/>
		</Tabs>
	)
}

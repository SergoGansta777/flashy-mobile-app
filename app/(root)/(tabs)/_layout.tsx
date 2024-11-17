import NavBarIconWrapper from '@/components/nav-bar-icon-wrapper'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Tabs } from 'expo-router'

export default function Layout() {
	return (
		<Tabs
			initialRouteName='home'
			screenOptions={{
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'black',
				tabBarShowLabel: false,
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

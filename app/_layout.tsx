import { PortalHost } from '@rn-primitives/portal'
import { Stack } from 'expo-router'
import React from 'react'
import '../global.css'

export const RootLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='(auth)' options={{ headerShown: false }} />
				<Stack.Screen name='(root)' options={{ headerShown: false }} />
				<Stack.Screen name='+not-found' />
			</Stack>
			<PortalHost />
		</>
	)
}

export default RootLayout

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

export default NavBarIconWrapper

import { cn } from '@/lib/utils'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as React from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	TouchableWithoutFeedback,
	View,
	type TextInputProps,
} from 'react-native'

type InputProps = TextInputProps & {
	icon?: any
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	({ className, placeholderClassName, icon, ...props }, ref) => {
		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className='my-2 w-full'>
						<View className='rounded-full border border-input bg-background flex flex-row justify-start items-center relative focus:border-primary-500 w-full'>
							{icon && (
								<AntDesign
									name={icon}
									size={24}
									className='ml-4'
									color='gray'
								/>
							)}

							<TextInput
								ref={ref}
								className={cn(
									'h-10 w-full native:h-12 px-3 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground file:border-0 file:bg-transparent file:font-medium',
									props.editable === false && 'opacity-50',
									className
								)}
								placeholderClassName={cn(
									'text-muted-foreground',
									placeholderClassName
								)}
								{...props}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		)
	}
)

Input.displayName = 'Input'

export { Input }

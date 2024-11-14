import { cn } from '@/lib/utils'
import * as React from 'react'
import { TextInput, type TextInputProps } from 'react-native'

const Input = React.forwardRef<
	React.ElementRef<typeof TextInput>,
	TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
	return (
		<TextInput
			ref={ref}
			className={cn(
				'h-10 native:h-12 rounded-full border border-input bg-background px-3 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground file:border-0 file:bg-transparent file:font-medium',
				props.editable === false && 'opacity-50',
				className
			)}
			placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
			{...props}
		/>
	)
})

Input.displayName = 'Input'

export { Input }

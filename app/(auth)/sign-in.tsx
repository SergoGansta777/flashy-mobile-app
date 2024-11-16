import FormField from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { H1, Large, P } from '@/components/ui/typography'
import { images } from '@/constants'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link, Redirect } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'

const SignIn = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	})
	const [isSignedIn, setIsSignedIn] = useState(false)

	if (isSignedIn) return <Redirect href='/(root)/(tabs)/home' />

	return (
		<ScrollView className='flex-1 h-full'>
			<StatusBar />
			<View className='flex-1 h-full'>
				<View className='relative w-full h-[250px]'>
					<Image source={images.loginHeader} className='z-0 w-full h-[250px]' />
					<H1 className='text-primary font-semibold absolute bottom-3.5 left-5'>
						Welcome 👋
					</H1>
				</View>
				<View className='p-5 flex flex-col mt-2'>
					<View className='flex flex-col gap-3'>
						<FormField
							label='Email'
							value={form.email}
							placeholder='Enter email'
							icon='mail'
							onChangeText={value => setForm({ ...form, email: value })}
						/>
						<FormField
							label='Password'
							value={form.password}
							placeholder='Enter password'
							icon='lock'
							onChangeText={value => setForm({ ...form, password: value })}
						/>
					</View>

					<View className='flex flex-col gap-5 mt-40'>
						<Button size='lg'>
							<Large className='text-primary-foreground'>Log In</Large>
						</Button>

						<View className='flex flex-row justify-center items-center gap-x-3 my-1'>
							<Separator />
							<Text className='text-lg'>Or</Text>
							<Separator />
						</View>

						<Button
							variant='outline'
							size='lg'
							onPress={() => setIsSignedIn(true)}
						>
							<View className='flex flex-row items-center'>
								<AntDesign name='google' size={24} color='bg-primary' />
								<Large className='text-primary'> Log in with Google</Large>
							</View>
						</Button>

						<P className='text-lg text-center text-general-200 mt-4'>
							Don't have an account?{' '}
							<Link href='/sign-up'>
								<P className='text-gray-500 text-lg'>Sign Up</P>
							</Link>
						</P>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

export default SignIn

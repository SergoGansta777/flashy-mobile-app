import FormField from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { H1, Large, P } from '@/components/ui/typography'
import { images } from '@/constants'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'

const SignUp = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	})

	return (
		<ScrollView className='flex-1'>
			<StatusBar />
			<View className='flex-1 '>
				<View className='relative w-full h-[250px]'>
					<Image source={images.logupHeader} className='z-0 w-full h-[250px]' />
					<H1 className='text-primary font-semibold absolute bottom-3.5 left-5'>
						Create Your Account
					</H1>
				</View>
				<View className='p-5 flex flex-col gap-5'>
					<View className='flex flex-col gap-3 mb-10'>
						<FormField
							label='Name'
							value={form.name}
							placeholder='Enter name'
							icon='user'
							onChangeText={value => setForm({ ...form, name: value })}
						/>
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
					<Button size='lg'>
						<Large className='text-primary-foreground'>Sign Up</Large>
					</Button>

					<View className='flex flex-row justify-center items-center gap-x-3 my-1'>
						<Separator />
						<Text className='text-lg'>Or</Text>
						<Separator />
					</View>

					<Button variant='outline' size='lg'>
						<View className='flex flex-row items-center'>
							<AntDesign name='google' size={24} color='bg-primary' />
							<Large className='text-primary'> Sign up with Google</Large>
						</View>
					</Button>

					<P className='text-lg text-center text-general-200 mt-4'>
						Already have an account?{' '}
						<Link href='/sign-in'>
							<P className='text-gray-500 text-lg'>Sign In</P>
						</Link>
					</P>
				</View>
			</View>
		</ScrollView>
	)
}

export default SignUp

import { Button } from "@/components/ui/button";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const isLastSlide = useMemo(
		() => activeIndex === onboarding.length - 1,
		[activeIndex],
	);
	return (
		<SafeAreaView className="flex h-full items-center justify-between ">
			<TouchableOpacity
				onPress={() => {
					router.replace("/(auth)/sign-up");
				}}
				className="w-full flex justify-end items-end p-5"
			>
				<Text className="text-black text-md font-JakartaBold">Skip</Text>
			</TouchableOpacity>

			<Swiper
				ref={swiperRef}
				loop={false}
				dot={
					<View className="w-[32px] h-[4px] mx-1 bg-gray-300 rounded-full" />
				}
				activeDot={
					<View className="w-[32px] h-[4px] mx-1 bg-primary rounded-full" />
				}
				onIndexChanged={(index) => setActiveIndex(index)}
			>
				{onboarding.map((item) => (
					<View key={item.id} className="flex items-center justify-center p-5">
						{/* <Image
							source={item.image}
							className="w-full h-[300px]"
							resizeMode="contain"
						/> */}
						<View className="flex flex-row items-center justify-center w-full mt-10">
							<Text className="text-black text-3xl font-bold mx-10 text-center">
								{item.title}
							</Text>
						</View>
						<Text className="text-md font-JakartaSemiBold text-center text-slate-500 mx-10 mt-3">
							{item.description}
						</Text>
					</View>
				))}
			</Swiper>

			<Button
				className="w-10/12"
				size="lg"
				onPress={() => {
					isLastSlide
						? router.replace("/(auth)/sign-up")
						: swiperRef.current?.scrollBy(1);
				}}
			>
				<Text className="text-white text-xl font-semibold">
					{isLastSlide ? "Get Started" : "Next"}
				</Text>
			</Button>
		</SafeAreaView>
	);
};

export default Welcome;

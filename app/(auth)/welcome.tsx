import React from "react";
import { SafeAreaView, Text } from "react-native";

const Welcome = () => {
	return (
		<SafeAreaView className="w-full h-full">
			<Text className="flex items-center justify-center text-4xl text-red-600 text-center">
				Welcome
			</Text>
		</SafeAreaView>
	);
};

export default Welcome;

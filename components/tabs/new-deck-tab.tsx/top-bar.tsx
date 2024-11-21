import { Button } from "@/components/ui/button";
import { Small } from "@/components/ui/typography";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const TopBar = () => {
  return (
    <View className="mb-1 flex h-14 w-full flex-row items-center justify-between">
      <Button
        variant="ghost"
        className="flex flex-row items-center justify-center"
        onPress={() => router.back()}
      >
        <AntDesign name="close" className="-mt-0.5" size={24} />
      </Button>

      <Small className="text-md mt-1 font-medium text-primary/80">
        Create new flash card deck
      </Small>

      <Button
        variant="ghost"
        className="flex flex-row items-center justify-center"
      >
        <AntDesign name="check" className="-mt-0.5" size={24} />
      </Button>
    </View>
  );
};

export default TopBar;

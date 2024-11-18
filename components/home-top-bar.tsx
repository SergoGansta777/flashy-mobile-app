import { appName } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";
import { Input } from "./ui/input";
import { H1 } from "./ui/typography";

const TopBar = () => {
  return (
    <View className="my-2 h-auto w-full rounded-b-full px-10">
      <View className="flex flex-row items-center justify-between">
        <H1>{appName}</H1>
        <Ionicons name="notifications" size={22} />
      </View>
      <View className="mt-2 flex w-full flex-row items-center justify-between">
        <Input
          icon="search1"
          placeholder="Decks, terms, definitions"
          className="w-3/4"
        />
        <Ionicons name="filter-outline" size={22} />
      </View>
    </View>
  );
};

export default TopBar;

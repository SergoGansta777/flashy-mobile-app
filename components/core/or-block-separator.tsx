import React from "react";
import { Text, View } from "react-native";
import { Separator } from "../ui/separator";

const OrBlockSeparator = () => {
  return (
    <View className="mx-auto my-1 flex w-10/12 flex-row items-center justify-center gap-x-3">
      <Separator className="w-1/2" />
      <Text className="text-lg">Or</Text>
      <Separator className="w-1/2" />
    </View>
  );
};

export default OrBlockSeparator;

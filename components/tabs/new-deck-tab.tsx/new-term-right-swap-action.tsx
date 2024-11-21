import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type NewTermRightSwipeActionProps = {
  handleDelete: () => void;
};

const NewTermRightSwipeAction: React.FC<NewTermRightSwipeActionProps> = ({
  handleDelete,
}) => {
  return (
    <View className="mr-4 flex h-full w-28 flex-col items-center justify-center rounded-2xl py-4">
      <TouchableOpacity
        className="mr-2 flex h-full items-center justify-center rounded-2xl bg-destructive px-6"
        onPress={handleDelete}
      >
        <AntDesign name="minuscircleo" size={24} color="#F6C9CB" />
        <Text className="mt-1.5 text-destructive-foreground">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTermRightSwipeAction;

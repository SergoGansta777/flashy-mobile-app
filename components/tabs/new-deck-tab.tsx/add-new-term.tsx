import ColorForIconWrapper from "@/components/core/color-for-icon-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { View } from "react-native";

type AddNewTermProps = {
  handleAddNew: () => void;
};

const AddNewTerm: React.FC<AddNewTermProps> = ({ handleAddNew }) => {
  return (
    <View className="mb-24 mt-6 flex w-full flex-row items-center justify-between pl-6">
      <Separator className="w-5/6" />
      <Button variant="ghost" className="mx-0 px-0" onPress={handleAddNew}>
        <ColorForIconWrapper className="text-primary">
          <AntDesign name="plus" size={24} />
        </ColorForIconWrapper>
      </Button>
    </View>
  );
};

export default AddNewTerm;

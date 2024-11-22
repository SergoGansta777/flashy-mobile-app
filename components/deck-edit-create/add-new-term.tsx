import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "@/lib/icons/Plus";
import React from "react";
import { View } from "react-native";

type AddNewTermProps = {
  handleAddNew: () => void;
};

const AddNewTerm: React.FC<AddNewTermProps> = ({ handleAddNew }) => {
  return (
    <View className="mb-24 mt-6 flex w-full flex-row items-center justify-between px-6">
      <Separator className="w-5/6" />
      <Button variant="ghost" size="icon" onPress={handleAddNew}>
        <Plus className="text-primary" size={28} />
      </Button>
    </View>
  );
};

export default AddNewTerm;

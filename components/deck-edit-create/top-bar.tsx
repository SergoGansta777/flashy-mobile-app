import { Button } from "@/components/ui/button";
import { Small } from "@/components/ui/typography";
import { Check } from "@/lib/icons/Check";
import { X } from "@/lib/icons/X";
import React from "react";
import { View } from "react-native";

type TopBarProps = {
  handleSaveDeck?: () => void;
  handleResetDeck?: () => void;
  headerText?: string;
};

const TopBar: React.FC<TopBarProps> = ({
  handleSaveDeck,
  handleResetDeck,
  headerText,
}) => {
  return (
    <View className="mb-1 flex h-14 w-full flex-row items-center justify-between px-5">
      <Button
        variant="ghost"
        size="icon"
        className="flex flex-row items-center justify-center"
        onPress={handleResetDeck}
      >
        <X className="text-destructive" size={28} />
      </Button>

      <Small className="text-md mt-1 font-medium text-primary/80">
        {headerText}
      </Small>

      <Button
        variant="ghost"
        size="icon"
        className="flex flex-row items-center justify-center"
        onPress={handleSaveDeck}
      >
        <Check className="text-green-500" size={28} />
      </Button>
    </View>
  );
};

export default TopBar;

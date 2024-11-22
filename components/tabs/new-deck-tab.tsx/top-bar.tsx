import { Button } from "@/components/ui/button";
import { Small } from "@/components/ui/typography";
import { Check } from "@/lib/icons/Check";
import { X } from "@/lib/icons/X";
import React from "react";
import { View } from "react-native";

type TopBarProps = {
  handleSaveDeck: () => void;
  handleResetNewDeck: () => void;
};

const TopBar: React.FC<TopBarProps> = ({
  handleSaveDeck,
  handleResetNewDeck,
}) => {
  return (
    <View className="mb-1 flex h-14 w-full flex-row items-center justify-between px-5">
      <Button
        variant="ghost"
        size="icon"
        className="flex flex-row items-center justify-center"
        onPress={handleResetNewDeck}
      >
        <X className="text-primary" size={28} />
      </Button>

      <Small className="text-md mt-1 font-medium text-primary/80">
        Create new flash card deck
      </Small>

      <Button
        variant="ghost"
        size="icon"
        className="flex flex-row items-center justify-center"
        onPress={handleSaveDeck}
      >
        <Check className="text-primary" size={28} />
      </Button>
    </View>
  );
};

export default TopBar;

import ColorForIconWrapper from "@/components/core/color-for-icon-wrapper";
import { Button } from "@/components/ui/button";
import { Small } from "@/components/ui/typography";
import AntDesign from "@expo/vector-icons/AntDesign";
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
    <View className="mb-1 flex h-14 w-full flex-row items-center justify-between">
      <Button
        variant="ghost"
        className="flex flex-row items-center justify-center"
        onPress={handleResetNewDeck}
      >
        <ColorForIconWrapper className="text-primary">
          <AntDesign name="close" className="-mt-0.5" size={24} />
        </ColorForIconWrapper>
      </Button>

      <Small className="text-md mt-1 font-medium text-primary/80">
        Create new flash card deck
      </Small>

      <Button
        variant="ghost"
        className="flex flex-row items-center justify-center"
        onPress={handleSaveDeck}
      >
        <ColorForIconWrapper className="mb-0.5 text-primary">
          <AntDesign className="" name="check" size={24} />
        </ColorForIconWrapper>
      </Button>
    </View>
  );
};

export default TopBar;

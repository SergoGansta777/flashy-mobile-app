import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ColorForIconWrapper from "../core/color-for-icon-wrapper";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { P, Small } from "../ui/typography";

const TopBar = ({
  totalSwiped,
  totalCards,
}: {
  totalSwiped: number;
  totalCards: number;
}) => {
  const safeInsets = useSafeAreaInsets();

  return (
    <View className="flex w-full flex-row items-center justify-between text-muted">
      <Button
        variant="ghost"
        className="flex items-center justify-center"
        onPress={() => router.back()}
      >
        <ColorForIconWrapper className="text-primary opacity-50">
          <MaterialCommunityIcons name="keyboard-backspace" size={28} />
        </ColorForIconWrapper>
      </Button>
      {totalCards === 0 ? (
        <P className="pt-2 text-center align-bottom font-semibold text-muted-foreground">
          It&apos;s empty
        </P>
      ) : (
        <P className="pt-2 text-center align-bottom font-semibold text-muted-foreground">
          {totalSwiped} / {totalCards}
        </P>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center justify-center">
            <ColorForIconWrapper className="text-primary opacity-50">
              <MaterialCommunityIcons name="dots-horizontal" size={28} />
            </ColorForIconWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={safeInsets}>
          <DropdownMenuItem>
            <Small>Change card flip direction</Small>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Small>Edit this deck</Small>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
};

export default TopBar;

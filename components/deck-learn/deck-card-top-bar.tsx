import { Ellipsis } from "@/lib/icons/Ellipsis";
import { MoveLeft } from "@/lib/icons/MoveLeft";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Muted, P, Small } from "../ui/typography";

const TopBar = ({
  totalSwiped,
  totalCards,
}: {
  totalSwiped: number;
  totalCards: number;
}) => {
  const safeInsets = useSafeAreaInsets();

  return (
    <View className="flex w-full flex-row items-center justify-between px-5">
      <Button variant="ghost" size="icon" onPress={() => router.back()}>
        <MoveLeft className="text-muted-foreground" size={28} />
      </Button>
      {totalCards === 0 && (
        <P className="pt-2 text-center align-bottom font-semibold text-muted-foreground">
          It&apos;s empty
        </P>
      )}
      {totalSwiped !== totalCards ? (
        <Muted className="pt-2 text-center align-middle text-lg font-semibold">
          {totalSwiped} / {totalCards}
        </Muted>
      ) : (
        <P className="pt-2 text-center align-bottom font-semibold text-muted-foreground">
          Completed!
        </P>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis className="text-muted-foreground" size={28} />
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

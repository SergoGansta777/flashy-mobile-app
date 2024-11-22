import { Ellipsis } from "@/lib/icons/Ellipsis";
import { FlipHorizontal } from "@/lib/icons/FlipHorizontal";
import { FlipVertical } from "@/lib/icons/FlipVertical";
import { MoveLeft } from "@/lib/icons/MoveLeft";
import { Pencil } from "@/lib/icons/Pencil";
import { useSettingsStore } from "@/store/settings-store";
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
import { Muted, P } from "../ui/typography";

const TopBar = ({
  totalSwiped,
  totalCards,
  deckId,
}: {
  deckId?: string;
  totalSwiped: number;
  totalCards: number;
}) => {
  const safeInsets = useSafeAreaInsets();
  const { cardFlipDirection, setCardFlipDirection } = useSettingsStore();

  const toggleCardFlipDirection = () => {
    setCardFlipDirection(
      cardFlipDirection === "horizontal" ? "vertical" : "horizontal",
    );
  };

  const handleEdit = () => {
    router.push("/(root)/deck/edit");
  };

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
          <DropdownMenuItem
            className="flex flex-row items-center"
            onPress={toggleCardFlipDirection}
          >
            {cardFlipDirection === "horizontal" && (
              <FlipVertical className="text-foreground" size={20} />
            )}
            {cardFlipDirection === "vertical" && (
              <FlipHorizontal className="text-foreground" size={20} />
            )}
            <P className="align-middle">Change flip direction</P>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-row items-center"
            onPress={handleEdit}
          >
            <Pencil className="text-foreground" size={20} />
            <P className="align-middle">Edit this deck</P>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
};

export default TopBar;

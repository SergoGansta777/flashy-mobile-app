import ActionButton from "@/components/core/action-button";
import ColorForIconWrapper from "@/components/core/color-for-icon-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CardDeck } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { H2, Small } from "../../ui/typography";

type DeckCardProps = {
  deck: CardDeck;
  handleToggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  handleChangeCurrentDeck: (id: string) => void;
};

const DeckCard: React.FC<DeckCardProps> = ({
  deck,
  handleToggleFavorite,
  handleDelete,
  handleEdit,
  handleChangeCurrentDeck,
}) => {
  const swipeRef = useRef<SwipeableMethods>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleAction = useCallback(
    (action: string) => {
      switch (action) {
        case "favorite":
          handleToggleFavorite(deck.id);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case "edit":
          handleEdit(deck.id);
          break;
        case "delete":
          handleDelete(deck.id);
          break;
        default:
          break;
      }
      swipeRef?.current?.close();
    },
    [deck.id, handleToggleFavorite, handleDelete, handleEdit],
  );

  const renderRightActions = useCallback(
    () => (
      <View className="my-3 mr-3 flex w-32 flex-row items-center justify-center bg-none px-4">
        <ActionButton
          onPress={() => handleAction("favorite")}
          icon={deck.isFavorite ? "star" : "staro"}
          label="Favorite"
          width="w-full"
          bgColor="bg-primary"
          textColor="text-primary-foreground"
        />
      </View>
    ),
    [handleAction, deck.isFavorite],
  );

  const renderLeftActions = useCallback(
    () => (
      <View className="my-3 -mr-1 ml-2 flex w-48 flex-row items-center justify-center gap-3 bg-none px-4">
        <ActionButton
          onPress={() => handleAction("edit")}
          icon="edit"
          label="Edit"
          width="w-1/2"
          bgColor="bg-secondary"
          textColor="text-secondary-foreground"
        />
        <Dialog className="w-1/2">
          <DialogTrigger asChild>
            <ActionButton
              icon="delete"
              label="Delete"
              width="w-full"
              bgColor="bg-destructive"
              textColor="text-destructive-foreground"
            />
          </DialogTrigger>
          <DialogContent className="mx-2">
            <DialogHeader>
              <DialogTitle>Delete Deck</DialogTitle>
              <DialogDescription>
                Are you sure? This action is permanent and will delete all terms
                and data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onPress={() => handleAction("delete")}
                >
                  <Text className="text-destructive-foreground">OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    ),
    [handleAction],
  );

  const handleCardPress = useCallback(() => {
    if (!isSwiping) {
      handleChangeCurrentDeck(deck.id);
      router.push({ pathname: "/deck/learn" });
    }
  }, [isSwiping, deck.id, handleChangeCurrentDeck]);

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableWillOpen={() => setIsSwiping(true)}
      onSwipeableClose={() => setIsSwiping(false)}
      onSwipeableOpen={() =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
      }
    >
      <TouchableOpacity activeOpacity={1} onPress={handleCardPress}>
        <Card className="mx-6 my-2">
          <CardHeader>
            <View className="flex flex-row items-start justify-between">
              <H2 className="border-b-0 pb-1.5 font-medium tracking-wide">
                {deck.name}
              </H2>
              <TouchableOpacity onPress={() => handleToggleFavorite(deck.id)}>
                <ColorForIconWrapper className="text-accent-foreground">
                  <AntDesign
                    name={deck.isFavorite ? "star" : "staro"}
                    size={22}
                  />
                </ColorForIconWrapper>
              </TouchableOpacity>
            </View>
            <CardDescription>Terms: {deck.cards.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <Small className="text-muted-foreground">
              Created at:{" "}
              {deck.createdAt
                ? new Date(deck.createdAt).toLocaleDateString()
                : "Unknown"}
            </Small>
          </CardContent>
        </Card>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default DeckCard;

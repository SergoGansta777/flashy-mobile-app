import type { CardDeck } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import type React from "react";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { H2, Small } from "./ui/typography";

type DeckCardProps = {
  deck: CardDeck;
  handleToggleFavorite: (id: number) => void;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  handleChangeCurrentDeck: (id: number) => void;
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

  const renderRightActions = () => (
    <View className="my-3 mr-3 flex w-32 flex-col items-center justify-center bg-none px-4">
      <TouchableOpacity
        className="item-center mx-auto mr-8 flex h-full w-full flex-col justify-center rounded-2xl bg-primary px-3"
        onPress={() => {
          handleToggleFavorite(deck.id);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          swipeRef?.current?.close();
        }}
      >
        <AntDesign
          name={deck.isFavorite ? "star" : "staro"}
          size={24}
          className="mx-auto"
          color="white"
        />
        <Text className="mx-auto mt-1.5 text-primary-foreground">Favorite</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLeftActions = () => (
    <View className="my-3 -mr-1 ml-2 flex w-48 flex-row items-center justify-center gap-3 bg-none px-4">
      <TouchableOpacity
        className="item-center mx-auto flex h-full w-1/2 flex-col justify-center rounded-2xl bg-secondary px-3"
        onPress={() => {
          handleEdit(deck.id);
        }}
      >
        <AntDesign className="mx-auto" name="edit" size={24} color="#192133" />
        <Text className="mx-auto mt-1.5 text-secondary-foreground">Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="item-center mx-auto flex h-full w-1/2 flex-col justify-center rounded-2xl bg-destructive px-3"
        onPress={() => {
          handleDelete(deck.id);
          swipeRef?.current?.close();
        }}
      >
        <AntDesign
          className="mx-auto"
          name="delete"
          size={24}
          color="#F8F7F9"
        />
        <Text className="mx-auto text-destructive-foreground">Delete</Text>
      </TouchableOpacity>
    </View>
  );

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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!isSwiping) {
            handleChangeCurrentDeck(deck.id);
            router.push({
              pathname: "/deck/learn",
            });
          }
        }}
      >
        <Card className="mx-6 my-2">
          <CardHeader>
            <View className="flex flex-row items-start justify-between">
              <H2 className="border-b-0 pb-1.5 font-medium tracking-wide">
                {deck.name}
              </H2>
              <TouchableOpacity
                key={deck.id}
                onPress={() => handleToggleFavorite(deck.id)}
              >
                <AntDesign
                  name={deck.isFavorite ? "star" : "staro"}
                  size={22}
                />
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

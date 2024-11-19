import NewDeckInput from "@/components/new-deck-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Small } from "@/components/ui/typography";
import type { CardDeck } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

const NewDeck = () => {
  const [newDeck, setNewDeck] = useState<CardDeck>({
    id: 100,
    userId: 23,
    name: "",
    isFavorite: false,
    cards: [{ term: "", answer: "" }],
    createdAt: new Date(),
    repeatedAt: new Date(),
  });

  const handleAddNewCard = () => {
    setNewDeck((prev) => ({
      ...prev,
      cards: [...prev.cards, { term: "", answer: "" }],
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleUpdateCard = (
    index: number,
    key: "term" | "answer",
    value: string,
  ) => {
    setNewDeck((prev) => {
      const updatedCards = [...prev.cards];
      updatedCards[index] = { ...updatedCards[index], [key]: value };
      return { ...prev, cards: updatedCards };
    });
  };

  const swipeRef = useRef<SwipeableMethods>();

  return (
    <SafeAreaView className="mt-1 flex h-full w-full flex-col bg-background">
      <View className="mb-1 flex h-14 w-full flex-row items-center justify-between">
        <Button
          variant="ghost"
          className="flex flex-row items-center justify-center"
          onPress={() => router.back()}
        >
          <AntDesign name="close" className="-mt-0.5" size={24} />
        </Button>

        <Small className="text-md mt-1 font-medium text-primary/80">
          Create new flash card deck
        </Small>

        <Button
          variant="ghost"
          className="flex flex-row items-center justify-center"
        >
          <AntDesign name="check" className="-mt-0.5" size={24} />
        </Button>
      </View>

      <View className="mt-3 h-full w-full">
        <View className="px-6">
          <NewDeckInput
            placeholder="Subject, chapter, unit"
            value={newDeck.name}
            label="Title"
            onChangeText={(text) =>
              setNewDeck((prev) => ({ ...prev, name: text }))
            }
            isBold
          />
        </View>

        <View className="mt-8 h-[78%] w-full">
          <GestureHandlerRootView className="h-ful w-full">
            <FlatList
              data={newDeck.cards}
              keyExtractor={(_, index) => index.toString()}
              className="w-full bg-background"
              renderItem={({ item: card, index }) => (
                <Swipeable
                  ref={swipeRef}
                  renderRightActions={() => (
                    <View className="mr-4 flex h-full w-28 flex-col items-center justify-center rounded-2xl py-4">
                      <TouchableOpacity className="mr-2 flex h-full items-center justify-center rounded-2xl bg-destructive px-6">
                        <AntDesign
                          name="minuscircleo"
                          size={24}
                          color="#F6C9CB"
                        />
                        <Text className="mt-1.5 text-destructive-foreground">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  onSwipeableOpen={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                  }
                >
                  <Card className="mx-6 my-4">
                    <CardContent className="gap-6 py-6">
                      <NewDeckInput
                        placeholder=""
                        value={card.term}
                        label="Term"
                        onChangeText={(text) =>
                          handleUpdateCard(index, "term", text)
                        }
                      />

                      <NewDeckInput
                        placeholder=""
                        value={card.answer}
                        label="Definition"
                        onChangeText={(text) =>
                          handleUpdateCard(index, "answer", text)
                        }
                      />
                    </CardContent>
                  </Card>
                </Swipeable>
              )}
              ListFooterComponent={() => (
                <View className="mb-24 mt-6 flex w-full flex-row items-center justify-between pl-6">
                  <Separator className="w-5/6" />
                  <Button
                    variant="ghost"
                    className="mx-0 px-0"
                    onPress={handleAddNewCard}
                  >
                    <AntDesign name="plus" size={24} />
                  </Button>
                </View>
              )}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewDeck;

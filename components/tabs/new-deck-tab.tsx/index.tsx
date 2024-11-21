import { CardDeck } from "@/types";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import AddNewTerm from "./add-new-term";
import NewTermCard from "./new-term-card";
import NewTermRightSwipeAction from "./new-term-right-swap-action";
import RenameDeck from "./rename-deck";
import TopBar from "./top-bar";

const NewDeckTab = () => {
  const [newDeck, setNewDeck] = useState<CardDeck>({
    id: 100,
    userId: 23,
    name: "",
    isFavorite: false,
    cards: [{ id: 0, term: "", definition: "" }],
    createdAt: new Date(),
    repeatedAt: new Date(),
  });

  const handleAddNewCard = () => {
    setNewDeck((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        { id: prev.cards.length, term: "", definition: "" },
      ],
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleDeleteCard = (cardId: number) => {
    setNewDeck((prev) => ({
      ...prev,
      cards: prev.cards.filter((x) => x.id !== cardId),
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleUpdateCard = (
    index: number,
    key: "term" | "definition",
    value: string,
  ) => {
    setNewDeck((prev) => {
      const updatedCards = [...prev.cards];
      updatedCards[index] = { ...updatedCards[index], [key]: value };
      return { ...prev, cards: updatedCards };
    });
  };

  const swipeRef = useRef<SwipeableMethods>(null);

  return (
    <SafeAreaView className="mt-1 flex h-full w-full flex-col bg-background">
      <TopBar />

      <View className="mt-3 h-full w-full">
        <RenameDeck
          name={newDeck.name}
          handleRename={(text) =>
            setNewDeck((prev) => ({ ...prev, name: text }))
          }
        />

        <View className="mt-8 h-[78%] w-full">
          <GestureHandlerRootView className="h-ful w-full">
            <FlatList
              data={newDeck.cards}
              keyExtractor={(card, _) => card.id.toString()}
              className="w-full bg-background"
              renderItem={({ item: card }) => (
                <Swipeable
                  ref={swipeRef}
                  renderRightActions={() => (
                    <NewTermRightSwipeAction
                      handleDelete={() => handleDeleteCard(card.id)}
                    />
                  )}
                  onSwipeableOpen={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                  }
                >
                  <NewTermCard
                    cardId={card.id}
                    term={card.term}
                    definition={card.definition}
                    handleUpdateCard={handleUpdateCard}
                  />
                </Swipeable>
              )}
              ListFooterComponent={() => (
                <AddNewTerm handleAddNew={handleAddNewCard} />
              )}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewDeckTab;

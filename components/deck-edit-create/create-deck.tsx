import ActionButton from "@/components/core/action-button";
import { useSupabase } from "@/context/supabase-provider";
import { BadgeX } from "@/lib/icons/BadgeX";
import { getEmptyDeck, getRandomUuid } from "@/lib/utils";
import { useDeckStore } from "@/store/deck-store";
import { CardDeck } from "@/types";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import AddNewTerm from "./add-new-term";
import NewTermCard from "./new-term-card";
import RenameDeck from "./rename-deck";
import TopBar from "./top-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const NewDeckTab = () => {
  const { user } = useSupabase();
  const [newDeck, setNewDeck] = useState<CardDeck>(
    getEmptyDeck(user?.id as string),
  );

  const saveDeck = useDeckStore((state) => state.addDeck);

  const handleSaveDeck = () => {
    saveDeck(newDeck);
    setNewDeck(getEmptyDeck(user?.id as string));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then();
    router.replace("/(root)/(tabs)/home");
  };

  const handleResetNewDeck = () => {
    setNewDeck(getEmptyDeck(user?.id as string));
    router.replace("/(root)/(tabs)/home");
  };

  const handleAddNewCard = () => {
    setNewDeck((prev) => ({
      ...prev,
      cards: [...prev.cards, { id: getRandomUuid(), term: "", definition: "" }],
    }));
  };

  const handleDeleteCard = (cardId: string) => {
    setNewDeck((prev) => ({
      ...prev,
      cards: prev.cards.filter((x) => x.id !== cardId),
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then();
  };

  const handleUpdateCard = (
    cardId: string,
    key: "term" | "definition",
    value: string,
  ) => {
    setNewDeck((prev) => {
      const updatedCards = prev.cards.map((card) =>
        card.id === cardId ? { ...card, [key]: value } : card,
      );
      return { ...prev, cards: updatedCards };
    });
  };

  const swipeRef = useRef<SwipeableMethods>(null);

  return (
    <SafeAreaView className="mt-1 flex h-full w-full flex-col bg-background">
      <TopBar
        handleSaveDeck={handleSaveDeck}
        handleResetDeck={handleResetNewDeck}
        headerText="Create new deck of flash cards"
      />

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
              automaticallyAdjustKeyboardInsets
              keyExtractor={(item) => item.id}
              className="w-full bg-background"
              renderItem={({ item: card }) => (
                <Swipeable
                  ref={swipeRef}
                  renderRightActions={() => (
                    <View className="my-3 mr-3 flex w-32 flex-row items-center justify-center bg-none px-4 pb-1.5 pt-1">
                      <ActionButton
                        onPress={() => handleDeleteCard(card.id)}
                        label="Delete"
                        bgColor="bg-destructive"
                        textColor="text-destructive-foreground"
                        width="w-full"
                        Icon={BadgeX}
                      />
                    </View>
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

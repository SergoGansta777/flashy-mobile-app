import { shuffle } from "@/lib/utils";
import { useDeckStore } from "@/store/deck-store";
import { Redirect } from "expo-router";
import React, { useMemo, useState } from "react";
import EmptyDeck from "./empty-deck";
import LearnCards from "./learn-cards";
import TopBar from "./top-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

const DeckLearn = () => {
  const { getFilteredCardsForDeck, setCardFilter, cardFilter, currentDeckId } =
    useDeckStore();

  if (!currentDeckId) <Redirect href="/(root)/(tabs)/home" />;

  const cards = useMemo(
    () => getFilteredCardsForDeck(currentDeckId as string),
    [cardFilter, currentDeckId],
  );

  const [rightSwipedIds, setRightSwipedIds] = useState<string[]>([]);
  const [leftSwipedIds, setLeftSwipedIds] = useState<string[]>([]);

  const shuffledCards = useMemo(() => shuffle(cards || []), [cards]);

  const handleLearnFurther = () => {
    setCardFilter(leftSwipedIds);
  };

  const totalCards = shuffledCards.length ?? 0;
  const totalSwiped = rightSwipedIds.length + leftSwipedIds.length;

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center bg-background px-4">
      <TopBar totalSwiped={totalSwiped} totalCards={totalCards} />

      <View className="flex-1">
        {totalCards > 0 ? (
          <LearnCards
            cards={shuffledCards}
            totalSwiped={totalSwiped}
            totalCards={totalCards}
            known={rightSwipedIds.length}
            stillLearning={leftSwipedIds.length}
            addToStillLearning={(cardId: string) =>
              setLeftSwipedIds((prev) => [...prev, cardId])
            }
            addToKnown={(cardId: string) =>
              setRightSwipedIds((prev) => [...prev, cardId])
            }
            handleLearnFurther={handleLearnFurther}
          />
        ) : (
          <EmptyDeck />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DeckLearn;

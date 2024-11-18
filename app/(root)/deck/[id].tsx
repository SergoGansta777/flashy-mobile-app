import TopBar from "@/components/deck-card-top-bar";
import EmptyDeck from "@/components/empty-deck";
import LearnCards from "@/components/learn-cards";
import { initialCardDecks } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

const DeckDetail = () => {
  const { id } = useLocalSearchParams();
  const deckId = Number(id);
  const deckContent = initialCardDecks.find((item) => item.id === deckId);

  const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([]);
  const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([]);

  const totalCards = deckContent?.cards.length ?? 0;
  const totalSwiped = rightSwipedIds.length + leftSwipedIds.length;

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center bg-background px-4">
      <TopBar totalSwiped={totalSwiped} totalCards={totalCards} />

      {totalCards > 0 ? (
        <LearnCards
          cards={deckContent?.cards || []}
          totalSwiped={totalSwiped}
          totalCards={totalCards}
          known={rightSwipedIds.length}
          stillLearning={leftSwipedIds.length}
          addToStillLearning={(index: number) =>
            setLeftSwipedIds((prev) => [...prev, index])
          }
          addToKnown={(index: number) =>
            setRightSwipedIds((prev) => [...prev, index])
          }
        />
      ) : (
        <EmptyDeck />
      )}
    </SafeAreaView>
  );
};

export default DeckDetail;

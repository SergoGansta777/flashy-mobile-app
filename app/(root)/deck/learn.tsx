import TopBar from "@/components/deck-card-top-bar";
import EmptyDeck from "@/components/empty-deck";
import LearnCards from "@/components/learn-cards";
import { useDeckStore } from "@/store/deck-store";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

const DeckLearn = () => {
  const deck = useDeckStore(
    (state) =>
      state.decks.find((deck) => deck.id === state.currentDeckId) || null,
  );

  const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([]);
  const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([]);

  const totalCards = deck?.cards.length ?? 0;
  const totalSwiped = rightSwipedIds.length + leftSwipedIds.length;

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center bg-background px-4">
      <TopBar totalSwiped={totalSwiped} totalCards={totalCards} />

      {totalCards > 0 ? (
        <LearnCards
          cards={deck?.cards || []}
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

export default DeckLearn;

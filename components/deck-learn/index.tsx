import { shuffle } from "@/lib/utils";
import { useDeckStore } from "@/store/deck-store";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import TopBar from "./deck-card-top-bar";
import EmptyDeck from "./empty-deck";
import LearnCards from "./learn-cards";

const DeckLearn = () => {
  const deck = useDeckStore(
    (state) =>
      state.decks.find((deck) => deck.id === state.currentDeckId) || null,
  );
  const setFilter = useDeckStore((state) => state.setCurrentDeckCardFilter);

  const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([]);
  const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([]);

  const cards = deck?.cards;
  const shuffledCards = useMemo(() => shuffle(cards || []), [cards]);

  const handleSetFilter = () => {
    setFilter(leftSwipedIds);
  };

  const totalCards = shuffledCards.length ?? 0;
  const totalSwiped = rightSwipedIds.length + leftSwipedIds.length;

  return (
    <SafeAreaView className="flex flex-1 flex-col items-center bg-background px-4">
      <TopBar totalSwiped={totalSwiped} totalCards={totalCards} />
      {totalCards > 0 ? (
        <LearnCards
          cards={shuffledCards}
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
          handleSetFilters={handleSetFilter}
        />
      ) : (
        <EmptyDeck />
      )}
    </SafeAreaView>
  );
};

export default DeckLearn;

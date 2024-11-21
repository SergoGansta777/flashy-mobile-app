import TopBar from "@/components/deck-card-top-bar";
import EmptyDeck from "@/components/empty-deck";
import LearnCards from "@/components/learn-cards";
import { shuffle } from "@/lib/utils";
import { useDeckStore } from "@/store/deck-store";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";

const DeckLearn = () => {
  const deck = useDeckStore(
    (state) =>
      state.decks.find((deck) => deck.id === state.currentDeckId) || null,
  );
  const filter = useDeckStore((state) => state.currentDeckCardFilter);
  const setFilter = useDeckStore((state) => state.setCurrentDeckCardFilter);

  const [rightSwipedIds, setRightSwipedIds] = useState<number[]>([]);
  const [leftSwipedIds, setLeftSwipedIds] = useState<number[]>([]);

  // Use useEffect to log the filter value when it changes
  useEffect(() => {
    console.log("Current Filter:", filter);
  }, [filter]); // Runs when filter changes

  // Apply the filter only if it's not empty
  const cards = deck?.cards.filter((card) => {
    if (filter && filter.length > 0) {
      return filter.includes(card.id); // Only show cards matching the filter
    }
    return true; // If no filter, show all cards
  });

  const shuffledCards = useMemo(() => shuffle(cards || []), [cards]);

  const handleSetFilter = () => {
    console.log("Setting Filter to leftSwipedIds:", leftSwipedIds);
    setFilter(leftSwipedIds); // Update filter with leftSwipedIds
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

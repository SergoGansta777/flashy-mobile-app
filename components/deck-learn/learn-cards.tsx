import type { FlashCard } from "@/types";
import type React from "react";
import CompletedDeck from "./completed-deck";
import ProgressBar from "./progress-bar";
import SwipeCounterBar from "./swipe-counter-bar";
import SwippableDeck from "./swippable-deck";

type LearnCardsProps = {
  cards: FlashCard[];
  totalSwiped: number;
  totalCards: number;
  known: number;
  stillLearning: number;
  addToStillLearning: (cardId: string) => void;
  addToKnown: (cardId: string) => void;
  handleSetFilters: () => void;
};

const LearnCards: React.FC<LearnCardsProps> = ({
  cards,
  totalSwiped,
  totalCards,
  known,
  stillLearning,
  addToKnown,
  addToStillLearning,
  handleSetFilters,
}) => {
  return (
    <>
      {totalSwiped !== totalCards ? (
        <>
          <ProgressBar value={totalSwiped} total={totalCards} />

          <SwipeCounterBar leftCounter={stillLearning} rightCounter={known} />
          <SwippableDeck
            cards={cards}
            handleSwipeToLeft={addToStillLearning}
            handleSwipeToRight={addToKnown}
          />
        </>
      ) : (
        <CompletedDeck
          known={known}
          stillLearning={stillLearning}
          total={totalCards}
          handleSetFilters={handleSetFilters}
        />
      )}
    </>
  );
};

export default LearnCards;

import type { FlashCard } from "@/types";
import type React from "react";
import CompletedDeck from "./completed-deck";
import TopBar from "./deck-card-top-bar";
import ProgressBar from "./progress-bar";
import SwipeCounterBar from "./swipe-counter-bar";
import SwippableDeck from "./swippable-deck";

type LearnCardsProps = {
  cards: FlashCard[];
  totalSwiped: number;
  totalCards: number;
  known: number;
  stillLearning: number;
  addToStillLearning: (index: number) => void;
  addToKnown: (index: number) => void;
};

const LearnCards: React.FC<LearnCardsProps> = ({
  cards,
  totalSwiped,
  totalCards,
  known,
  stillLearning,
  addToKnown,
  addToStillLearning,
}) => {
  return (
    <>
      <TopBar totalSwiped={totalSwiped} totalCards={totalCards} />

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
        />
      )}
    </>
  );
};

export default LearnCards;

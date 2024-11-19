import type { FlashCard } from "@/types";
import * as Haptics from "expo-haptics";
import type React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import FlippableCard from "./flip-card";
import SwipeInstructions from "./swipe-instructions";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export type SwippableDeckProps = {
  handleSwipeToLeft: (index: number) => void;
  handleSwipeToRight: (index: number) => void;
  cards: FlashCard[];
};

const SwippableDeck: React.FC<SwippableDeckProps> = ({
  handleSwipeToLeft,
  handleSwipeToRight,
  cards,
}) => {
  const swiperRef = useRef<SwiperCardRefType>();
  const [isSwiping, setIsSwiping] = useState(false);

  const renderCard = useCallback(
    (card: FlashCard) => <FlippableCard card={card} isSwiping={isSwiping} />,
    [isSwiping],
  );

  const OverlayLabelRight = useMemo(
    () => (
      <Card className="h-[600px] w-[350px] border-solid border-green-500 bg-green-500/5">
        <CardHeader />
        <CardContent className="my-auto flex flex-col items-center justify-center" />
        <CardFooter />
      </Card>
    ),
    [],
  );

  const OverlayLabelLeft = useMemo(
    () => (
      <Card className="h-[600px] w-[350px] border-solid border-red-500 bg-red-500/5">
        <CardHeader />
        <CardContent className="my-auto flex flex-col items-center justify-center" />
        <CardFooter />
      </Card>
    ),
    [],
  );

  const handleSwipe = useCallback(
    (index: number, direction: "left" | "right") => {
      runOnJS(() => {
        if (direction === "left") {
          handleSwipeToLeft(index);
        } else {
          handleSwipeToRight(index);
        }
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      })();
    },
    [handleSwipeToLeft, handleSwipeToRight],
  );
  return (
    <>
      <GestureHandlerRootView className="flex h-full w-full items-center justify-center">
        <Swiper
          ref={swiperRef}
          data={cards}
          renderCard={renderCard}
          disableTopSwipe={true}
          OverlayLabelRight={() => OverlayLabelRight}
          OverlayLabelLeft={() => OverlayLabelLeft}
          onSwipeStart={() => setIsSwiping(true)}
          onSwipeEnd={() => setIsSwiping(false)}
          onSwipeLeft={(index) => handleSwipe(index, "left")}
          onSwipeRight={(index) => handleSwipe(index, "right")}
          onSwipedAll={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        />
      </GestureHandlerRootView>
      <SwipeInstructions />
    </>
  );
};

export default SwippableDeck;

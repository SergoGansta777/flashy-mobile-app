import type { FlashCard } from "@/types";
import * as Haptics from "expo-haptics";
import type React from "react";
import { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
  runOnJS,
  useSharedValue,
} from "react-native-reanimated";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { H1, Muted, P } from "../ui/typography";
import SwipeInstructions from "./swipe-instructions";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export type SwippableDeckProps = {
  handleSwipeToLeft: (cardId: string) => void;
  handleSwipeToRight: (cardId: string) => void;
  cards: FlashCard[];
};

const SwippableDeck: React.FC<SwippableDeckProps> = ({
  handleSwipeToLeft,
  handleSwipeToRight,
  cards,
}) => {
  const swiperRef = useRef<SwiperCardRefType>();
  const isSwiping = useSharedValue(false);

  const OverlayLabelRight = useMemo(
    () => (
      <Card className="h-[600px] w-[350px] border-solid border-green-500 bg-green-500/5 shadow-md shadow-green-500">
        <CardHeader />
        <CardContent className="my-auto flex flex-col items-center justify-center" />
        <CardFooter />
      </Card>
    ),
    [],
  );

  const OverlayLabelLeft = useMemo(
    () => (
      <Card className="shadow-reg-500 h-[600px] w-[350px] border-solid border-red-500 bg-red-500/5 shadow-md">
        <CardHeader />
        <CardContent className="my-auto flex flex-col items-center justify-center" />
        <CardFooter />
      </Card>
    ),
    [],
  );

  const handleSwipe = useCallback(
    (cardId: string, direction: "left" | "right") => {
      runOnJS(() => {
        if (direction === "left") {
          handleSwipeToLeft(cardId);
        } else {
          handleSwipeToRight(cardId);
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
          renderCard={(card) => {
            return (
              <FlipCard
                flipVertical={false}
                flipHorizontal
                friction={15}
                clickable={!isSwiping.value}
              >
                <View>
                  <Card className="h-[600px] w-[350px] px-2 shadow">
                    <CardHeader>
                      <Muted>What is that?</Muted>
                    </CardHeader>
                    <CardContent className="my-auto flex flex-col items-center justify-center">
                      <H1 className="text-center text-4xl font-semibold tracking-wide">
                        {card.term}
                      </H1>
                    </CardContent>
                    <CardFooter />
                  </Card>
                </View>

                <View>
                  <Card className="h-[600px] w-[350px] px-2 shadow">
                    <CardHeader>
                      <Muted>Correct answer is</Muted>
                    </CardHeader>
                    <CardContent className="mx-auto my-auto flex w-full flex-col items-center justify-center">
                      <P className="w-auto text-2xl font-medium tracking-tight">
                        {card.definition}
                      </P>
                    </CardContent>
                    <CardFooter />
                  </Card>
                </View>
              </FlipCard>
            );
          }}
          disableTopSwipe={true}
          OverlayLabelRight={() => OverlayLabelRight}
          OverlayLabelLeft={() => OverlayLabelLeft}
          onSwipeStart={() => (isSwiping.value = true)}
          onSwipeEnd={() => (isSwiping.value = false)}
          onSwipeLeft={(index) => handleSwipe(cards[index].id, "left")}
          onSwipeRight={(index) => handleSwipe(cards[index].id, "right")}
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

import type { FlashCard } from "@/types";
import * as Haptics from "expo-haptics";
import type React from "react";
import { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { H1, Muted, P } from "../ui/typography";
import SwipeInstructions from "./swipe-instructions";

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
                  <Card className="h-[600px] w-[350px] shadow">
                    <CardHeader>
                      <Muted>What is that?</Muted>
                    </CardHeader>
                    <CardContent className="my-auto flex flex-col items-center justify-center">
                      <H1 className="flex flex-col items-center justify-center text-4xl font-semibold">
                        {card.term}
                      </H1>
                    </CardContent>
                    <CardFooter />
                  </Card>
                </View>

                <View>
                  <Card className="h-[600px] w-[350px] shadow">
                    <CardHeader>
                      <Muted>Correct answer is</Muted>
                    </CardHeader>
                    <CardContent className="my-auto flex flex-col items-center justify-center">
                      <P className="mx-auto flex w-11/12 flex-col items-center justify-center text-3xl font-medium">
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

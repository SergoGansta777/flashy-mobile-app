import { Button } from "@/components/ui/button";
import type { OnboardingContent } from "@/types";
import { router } from "expo-router";
import type React from "react";
import { useMemo, useRef, useState } from "react";
import { Image, View } from "react-native";
import Swiper from "react-native-swiper";
import { H1, Large, P } from "../../ui/typography";

type OnboardingSwiperProps = {
  onboardingItems: OnboardingContent[];
};

const OnboardingSwiper: React.FC<OnboardingSwiperProps> = ({
  onboardingItems,
}) => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = useMemo(
    () => activeIndex === onboardingItems.length - 1,
    [activeIndex, onboardingItems],
  );

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-gray-300" />
        }
        activeDot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-primary" />
        }
        onIndexChanged={handleIndexChange}
      >
        {onboardingItems.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="h-[350px] w-full"
              resizeMode="contain"
            />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <H1 className="mx-10 text-center text-3xl font-bold text-primary">
                {item.title}
              </H1>
            </View>
            <P className="mx-10 mt-3 text-center text-slate-500">
              {item.description}
            </P>
          </View>
        ))}
      </Swiper>

      <Button
        className="w-10/12"
        size="lg"
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1);
        }}
      >
        <Large className="text-primary-foreground">
          {isLastSlide ? "Get Started" : "Next"}
        </Large>
      </Button>
    </>
  );
};

export default OnboardingSwiper;

import { Button } from "@/components/ui/button";
import { H1, Large, P } from "@/components/ui/typography";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = useMemo(
    () => activeIndex === onboarding.length - 1,
    [activeIndex],
  );
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-background">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="flex w-11/12 items-end justify-end p-5"
      >
        <P className="text-primary">Skip</P>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-gray-300" />
        }
        activeDot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-primary" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
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
    </SafeAreaView>
  );
};

export default Welcome;

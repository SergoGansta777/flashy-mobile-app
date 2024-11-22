import { onboarding } from "@/constants";
import React from "react";
import { SafeAreaView } from "react-native";
import OnboardingSwiper from "./onboarding-swiper";
import SkipButtonBar from "./skip-button";

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-background/95">
      <SkipButtonBar />

      <OnboardingSwiper onboardingItems={onboarding} />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

import { onboarding } from "@/constants";
import React from "react";
import OnboardingSwiper from "./onboarding-swiper";
import SkipButtonBar from "./skip-button";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-background">
      <SkipButtonBar />

      <OnboardingSwiper onboardingItems={onboarding} />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

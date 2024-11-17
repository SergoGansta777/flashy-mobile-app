import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lead } from "./ui/typography";

const EmptyDeck = () => {
  return (
    <SafeAreaView className="flex flex-col items-center justify-center">
      <Lead>Ooops</Lead>
    </SafeAreaView>
  );
};

export default EmptyDeck;

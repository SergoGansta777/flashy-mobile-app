import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./ui/button";
import { BlockQuote, H3, Large, Lead } from "./ui/typography";

const EmptyDeck = () => {
  return (
    <SafeAreaView className="relative flex h-full w-full flex-col items-center justify-start px-8">
      <H3 className="mb-10 mt-7 w-full text-center text-3xl">
        It seems you haven't added any cards here yet.
      </H3>
      <BlockQuote className="w-3/4">
        Flashcards aren’t just for memorizing facts—they’re powerful tools that
        turn active recall into a habit, making learning stick longer and
        deeper.
      </BlockQuote>
      <Button size="lg" className="absolute bottom-24 w-full">
        <Large className="text-primary-foreground">Go to card editing</Large>
      </Button>
      <Button
        size="lg"
        variant="ghost"
        className="absolute bottom-10 w-full"
        onPress={() => router.back()}
      >
        <Lead>Return back</Lead>
      </Button>
    </SafeAreaView>
  );
};

export default EmptyDeck;

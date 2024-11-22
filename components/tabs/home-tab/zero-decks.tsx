import { Button } from "@/components/ui/button";
import { H3, Muted, P } from "@/components/ui/typography";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const ZeroDecks = () => {
  return (
    <View className="flex h-2/3 w-full items-center justify-center gap-1.5 px-20">
      <H3 className="mb-4 text-center">
        It seems you haven’t created any cards to it.
      </H3>

      <P className="pt-1">
        Tap the &quot;+&quot; icon in the navigation bar to create your first
        deck and start adding flashcards to it.
      </P>
      <Button
        variant="link"
        onPress={() => router.push("/(root)/(tabs)/new-deck")}
      >
        <Muted>Or simply click here to get started!</Muted>
      </Button>
    </View>
  );
};

export default ZeroDecks;

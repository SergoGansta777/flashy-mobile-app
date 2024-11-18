import DeckCard from "@/components/deck-card";
import TopBar from "@/components/home-top-bar";
import { initialCardDecks } from "@/constants";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

const Home = () => {
  const [cardDecks, setCardDecks] = useState(initialCardDecks);
  const handleToggleFavorite = (id: number) => {
    setCardDecks((prev) =>
      prev.map((deck) =>
        deck.id === id ? { ...deck, isFavorite: !deck.isFavorite } : deck,
      ),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <TopBar />
      <FlatList
        data={cardDecks}
        className="mb-18 overflow-hidden rounded-t-2xl"
        renderItem={({ item }) => {
          return (
            <DeckCard
              deckMetadata={item}
              handleToggleFavorite={() => handleToggleFavorite(item.id)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

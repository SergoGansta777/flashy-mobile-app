import DeckCard from "@/components/deck-card";
import { Input } from "@/components/ui/input";
import { H1 } from "@/components/ui/typography";
import { appName, initialCardDecks } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";

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
      <View className="my-2 h-auto w-full rounded-b-full px-10">
        <View className="flex flex-row items-center justify-between">
          <H1>{appName}</H1>
          <Ionicons name="notifications" size={22} />
        </View>
        <View className="mt-2 flex w-full flex-row items-center justify-between">
          <Input
            icon="search1"
            placeholder="Decks, terms, definitions"
            className="w-3/4"
          />
          <Ionicons name="filter-outline" size={22} />
        </View>
      </View>
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

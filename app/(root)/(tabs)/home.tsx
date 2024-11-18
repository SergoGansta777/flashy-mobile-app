import DeckCard from "@/components/deck-card";
import TopBar from "@/components/home-top-bar";
import { appName, initialCardDecks } from "@/constants";
import { CardDeckMetadata } from "@/types";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";

const Home = () => {
  const [cardDecks, setCardDecks] =
    useState<CardDeckMetadata[]>(initialCardDecks);

  const handleToggleFavorite = (id: number) => {
    setCardDecks((prev) =>
      prev.map((deck) =>
        deck.id === id ? { ...deck, isFavorite: !deck.isFavorite } : deck,
      ),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const sortOptions = [
    {
      label: "Created at",
      sortFunction: (a: CardDeckMetadata, b: CardDeckMetadata) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    },
    {
      label: "Favorite",
      sortFunction: (a: CardDeckMetadata, b: CardDeckMetadata) =>
        Number(b.isFavorite) - Number(a.isFavorite),
    },
    {
      label: "Terms",
      sortFunction: (a: CardDeckMetadata, b: CardDeckMetadata) =>
        b.cardsCount - a.cardsCount,
    },
    {
      label: "Name",
      sortFunction: (a: CardDeckMetadata, b: CardDeckMetadata) =>
        a.name.localeCompare(b.name),
    },
  ];

  const filterItems = (query: string) => {
    if (!query) return initialCardDecks;
    return initialCardDecks.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <TopBar
        appName={appName}
        items={cardDecks}
        setItems={setCardDecks}
        sortOptions={sortOptions}
        filterItems={filterItems}
      />
      <FlatList
        data={cardDecks}
        className="mb-18 overflow-hidden rounded-t-2xl"
        renderItem={({ item }) => (
          <DeckCard
            deckMetadata={item}
            handleToggleFavorite={() => handleToggleFavorite(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

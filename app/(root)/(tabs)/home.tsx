import DeckCard from "@/components/deck-card";
import TopBar from "@/components/home-top-bar";
import { appName } from "@/constants";
import { useDeckStore } from "@/store";
import type { CardDeck } from "@/types";
import * as Haptics from "expo-haptics";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  const decks = useDeckStore((state) => state.decks);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);
  const toggleFavorite = useDeckStore((state) => state.toggleFavorite);

  const [cardDecks, setCardDecks] = React.useState(decks);

  React.useEffect(() => {
    setCardDecks(decks);
  }, [decks]);

  const handleToggleFavorite = (deckId: number) => {
    toggleFavorite(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDelete = (deckId: number) => {
    deleteDeck(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleEdit = (deckId: number) => {
    console.log("not implemented yet, edit action for deckId", deckId);
  };

  const sortOptions = [
    {
      label: "Created at",
      sortFunction: (a: CardDeck, b: CardDeck) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    },
    {
      label: "Favorite",
      sortFunction: (a: CardDeck, b: CardDeck) =>
        Number(b.isFavorite) - Number(a.isFavorite),
    },
    {
      label: "Terms",
      sortFunction: (a: CardDeck, b: CardDeck) =>
        b.cards.length - a.cards.length,
    },
    {
      label: "Name",
      sortFunction: (a: CardDeck, b: CardDeck) => a.name.localeCompare(b.name),
    },
  ];

  const filterItems = (query: string) => {
    if (!query) return decks;
    return decks.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <GestureHandlerRootView className="h-ful w-full">
        <TopBar
          appName={appName}
          items={cardDecks}
          setItems={setCardDecks}
          sortOptions={sortOptions}
          filterItems={filterItems}
        />
        <FlatList
          data={cardDecks}
          className="mb-18 rounded-t-2xl"
          renderItem={({ item: deck }) => (
            <DeckCard
              deck={deck}
              handleToggleFavorite={handleToggleFavorite}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
          ListFooterComponent={<View className="h-24"></View>}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;

import { appName } from "@/constants";
import { deckSortOptions } from "@/lib/sort";
import { useDeckStore } from "@/store/deck-store";
import * as Haptics from "expo-haptics";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeckCard from "../deck-card";
import TopBar from "../home-top-bar";

const HomeTab = () => {
  const decks = useDeckStore((state) => state.decks);
  const deleteDeck = useDeckStore((state) => state.deleteDeck);
  const toggleFavorite = useDeckStore((state) => state.toggleFavorite);
  const setCurrentDeck = useDeckStore((state) => state.setCurrentDeck);

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

  const handleChangeCurrentDeck = (deckId: number) => {
    setCurrentDeck(deckId);
  };

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
          sortOptions={deckSortOptions}
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
              handleChangeCurrentDeck={handleChangeCurrentDeck}
            />
          )}
          ListFooterComponent={<View className="h-24" />}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeTab;

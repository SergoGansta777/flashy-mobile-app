import { appName } from "@/constants";
import { deckSortOptions } from "@/lib/sort";
import { useDeckStore } from "@/store/deck-store";
import type { CardDeck, SortDirection, SortOption } from "@/types";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeckCard from "./deck-card";
import TopBar from "./top-bar";

const HomeTab = () => {
  const { decks, deleteDeck, toggleFavorite, setCurrentDeck } = useDeckStore();

  const [cardDecks, setCardDecks] = useState<CardDeck[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>(
    deckSortOptions[0].label,
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortAndSetDecks = (items: CardDeck[], query: string) => {
    const filteredItems = filterItems(query, items);
    const sortOptionConfig = deckSortOptions.find(
      (option) => option.label === sortOption,
    );

    if (sortOptionConfig) {
      const sortedItems = [...filteredItems].sort(
        sortOptionConfig.sortFunction,
      );
      if (sortDirection === "desc") {
        sortedItems.reverse();
      }
      setCardDecks(sortedItems);
    } else {
      setCardDecks(filteredItems);
    }
  };

  useEffect(() => {
    sortAndSetDecks(decks, searchQuery);
  }, [decks, searchQuery]);

  const handleToggleFavorite = (deckId: number) => {
    toggleFavorite(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDelete = (deckId: number) => {
    deleteDeck(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleEdit = (deckId: number) => {
    console.log("Edit action not implemented for deckId:", deckId);
  };

  const handleChangeCurrentDeck = (deckId: number) => {
    setCurrentDeck(deckId);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    sortAndSetDecks(decks, query);
  };

  const handleSortChange = (option: SortOption<CardDeck>) => {
    const newDirection =
      option.label === sortOption
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setSortOption(option.label);
    setSortDirection(newDirection);
  };

  const filterItems = (query: string, items = decks) => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((deck) => deck.name.toLowerCase().includes(lowerQuery));
  };

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <GestureHandlerRootView className="h-full w-full">
        <TopBar
          appName={appName}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          currentSortOptionLabel={sortOption}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
          sortOptions={deckSortOptions}
        />

        <FlatList
          data={cardDecks}
          className="mb-18 rounded-t-2xl"
          keyExtractor={(item) => item.id.toString()}
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

import { Button } from "@/components/ui/button";
import { H3, Muted, P } from "@/components/ui/typography";
import { appName } from "@/constants";
import { deckSortOptions } from "@/lib/sort";
import { useDeckStore } from "@/store/deck-store";
import type { CardDeck, SortDirection, SortOption } from "@/types";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
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

  const handleToggleFavorite = (deckId: string) => {
    toggleFavorite(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDelete = (deckId: string) => {
    deleteDeck(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleEdit = (deckId: string) => {
    console.log("Edit action not implemented for deckId:", deckId);
  };

  const handleChangeCurrentDeck = (deckId: string) => {
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

        {cardDecks.length > 0 ? (
          <FlatList
            data={cardDecks}
            className="mb-18 rounded-t-2xl"
            keyExtractor={(item) => item.id}
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
        ) : (
          <View className="flex h-2/3 w-full items-center justify-center gap-1.5 px-20">
            <H3 className="mb-4 text-center">
              It seems you haven’t created any decks yehcards to it.
            </H3>

            <P className="pt-1">
              Tap the &quot;+&quot; icon in the navigation bar to create your
              first deck and start adding flashcards to it.
            </P>
            <Button
              variant="link"
              onPress={() => router.push("/(root)/(tabs)/new-deck")}
            >
              <Muted>Or simply click here to get started!</Muted>
            </Button>
          </View>
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeTab;

import { appName } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import { deckSortOptions } from "@/lib/sort";
import { useDeckStore } from "@/store/deck-store";
import { useSettingsStore } from "@/store/settings-store";
import type { CardDeck, SortOption } from "@/types";
import * as Haptics from "expo-haptics";
import { Redirect, router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeckCard from "./deck-card";
import TopBar from "./top-bar";
import ZeroDecks from "./zero-decks";
import ZeroSearchResult from "./zero-search-results";

const HomeTab = () => {
  const { user } = useSupabase();
  if (!user) return <Redirect href="/(auth)/sign-in" />;

  const {
    decks: stateDecks,
    getDecksForUser,
    deleteDeck,
    toggleFavorite,
    setCurrentDeck,
  } = useDeckStore();
  const {
    decksSortOptionId,
    decksSortDirection,
    setDecksSortOptionId,
    setDecksSortDirection,
  } = useSettingsStore();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const decks = useMemo(
    () => getDecksForUser(user?.id),
    [user?.id, getDecksForUser, stateDecks],
  );

  const filterItems = useCallback(
    (query: string, items = decks) => {
      if (!query.trim()) return items;
      const lowerQuery = query.toLowerCase();
      return items.filter((deck) =>
        deck.name.toLowerCase().includes(lowerQuery),
      );
    },
    [decks],
  );

  const sortAndSetDecks = useCallback(
    (query: string) => {
      const filteredItems = filterItems(query);

      const sortOptionConfig = deckSortOptions.find(
        (option) => option.id === decksSortOptionId,
      );

      if (sortOptionConfig) {
        const sortedItems = [...filteredItems].sort(
          sortOptionConfig.sortFunction,
        );
        if (decksSortDirection === "desc") {
          sortedItems.reverse();
        }
        return sortedItems;
      }

      return filteredItems;
    },
    [filterItems, decksSortOptionId, decksSortDirection, decks],
  );

  const cardDecks = useMemo(
    () => sortAndSetDecks(searchQuery),
    [decks, searchQuery, sortAndSetDecks],
  );

  const handleSortChange = (option: SortOption<CardDeck>) => {
    const newDirection =
      option.id === decksSortOptionId
        ? decksSortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setDecksSortOptionId(option.id);
    setDecksSortDirection(newDirection);
  };

  const handleToggleFavorite = (deckId: string) => {
    toggleFavorite(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDelete = (deckId: string) => {
    deleteDeck(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleEdit = (deckId: string) => {
    setCurrentDeck(deckId);
    router.push("/(root)/deck/edit");
  };

  const handleChangeCurrentDeck = (deckId: string) => {
    setCurrentDeck(deckId);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <GestureHandlerRootView className="h-full w-full">
        <TopBar
          appName={appName}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          deckSortDirectionId={decksSortOptionId}
          sortDirection={decksSortDirection}
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
        ) : searchQuery === "" ? (
          <ZeroDecks />
        ) : (
          <ZeroSearchResult />
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeTab;

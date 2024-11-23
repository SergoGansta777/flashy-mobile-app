import { appName } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import { useDecks } from "@/hooks/useDecks";
import { deckSortOptions } from "@/lib/sort";
import { useSettingsStore } from "@/store/settings-store";
import type { CardDeck, SortOption } from "@/types";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeckCard from "./deck-card";
import TopBar from "./top-bar";
import ZeroDecks from "./zero-decks";
import ZeroSearchResult from "./zero-search-results";

const HomeTab = () => {
  const { user } = useSupabase();

  const {
    decksSortOptionId,
    decksSortDirection,
    setDecksSortOptionId,
    setDecksSortDirection,
  } = useSettingsStore();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { cardDecks, deleteDeck, toggleFavorite, setCurrentDeck } = useDecks(
    user?.id,
    searchQuery,
    decksSortOptionId,
    decksSortDirection,
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then();
  };

  const handleDelete = (deckId: string) => {
    deleteDeck(deckId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then();
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

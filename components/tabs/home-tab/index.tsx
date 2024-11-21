import { appName } from "@/constants";
import { deckSortOptions } from "@/lib/sort";
import { decks$, toggleFavorite } from "@/store/legend-store";
import type { DeckDb, SortDirection } from "@/types";
import { observer } from "@legendapp/state/react";
import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeckCard from "./deck-card";
import TopBar from "./top-bar";

const HomeTab = observer(() => {
  const rawDecks = decks$.get();
  const decks = Object.values(rawDecks ?? {}) as DeckDb[];

  console.log("raw", rawDecks);
  console.log("deck", decks);

  const [cardDecks, setCardDecks] = useState<DeckDb[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>(
    deckSortOptions[0].label,
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // const sortAndSetDecks = (items: DeckDb[], query: string) => {
  //   // const filteredItems = filterItems(query, items);
  //   const filteredItems = items;
  //   const sortOptionConfig = deckSortOptions.find(
  //     (option) => option.label === sortOption,
  //   );

  //   if (sortOptionConfig) {
  //     // const sortedItems = [...filteredItems].sort(
  //     //   sortOptionConfig.sortFunction,
  //     // );

  //     // const sortedItems = [...filteredItems].sort(
  //     //   sortOptionConfig.sortFunction,
  //     // );
  //     // if (sortDirection === "desc") {
  //     //   sortedItems.reverse();
  //     // }
  //     // setCardDecks(sortedItems);
  //     setCardDecks(filteredItems);
  //   } else {
  //     setCardDecks(filteredItems);
  //   }
  // };

  // useEffect(() => {
  //   sortAndSetDecks(decks, searchQuery);
  // }, [decks, searchQuery]);

  // const handleToggleFavorite = (deckId: string) => {
  //   // decks$[deckId].set({
  //   //   ...decks$[deckId],
  //   //   is_favorite: true,
  //   // });
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  // };

  // const handleDelete = (deckId: string) => {
  //   // deleteDeck(deckId);
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  // };

  // const handleEdit = (deckId: string) => {
  //   console.log("Edit action not implemented for deckId:", deckId);
  // };

  // const handleChangeCurrentDeck = (deckId: string) => {
  //   // setCurrentDeck(deckId);
  // };

  // const handleSearchChange = (query: string) => {
  //   setSearchQuery(query);
  //   sortAndSetDecks(decks, query);
  // };

  // const handleSortChange = (option: SortOption<CardDeck>) => {
  //   const newDirection =
  //     option.label === sortOption
  //       ? sortDirection === "asc"
  //         ? "desc"
  //         : "asc"
  //       : "asc";

  //   setSortOption(option.label);
  //   setSortDirection(newDirection);
  // };

  // const filterItems = (query: string, items = decks) => {
  //   if (!query.trim()) return items;
  //   const lowerQuery = query.toLowerCase();
  //   return items.filter((deck) => deck.name.toLowerCase().includes(lowerQuery));
  // };

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <GestureHandlerRootView className="h-full w-full">
        <TopBar
          appName={appName}
          searchQuery={searchQuery}
          // handleSearchChange={handleSearchChange}
          handleSearchChange={() => {}}
          currentSortOptionLabel={sortOption}
          sortDirection={sortDirection}
          // handleSortChange={handleSortChange}
          handleSortChange={() => {}}
          sortOptions={deckSortOptions}
        />

        <FlatList
          data={decks}
          className="mb-18 rounded-t-2xl"
          keyExtractor={(item) => item.id}
          renderItem={({ item: deck }) => {
            return (
              <DeckCard
                deck={deck}
                // handleToggleFavorite={handleToggleFavorite}
                // handleDelete={handleDelete}
                // handleEdit={handleEdit}
                // handleChangeCurrentDeck={handleChangeCurrentDeck}
                handleToggleFavorite={() => toggleFavorite(deck.id)}
                handleDelete={(t: string) => {}}
                handleEdit={(t: string) => {}}
                handleChangeCurrentDeck={(t: string) => {}}
              />
            );
          }}
          ListFooterComponent={<View className="h-24" />}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
});

export default HomeTab;

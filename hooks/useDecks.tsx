import { deckSortOptions } from "@/lib/sort";
import { useDeckStore } from "@/store/deck-store";
import { useCallback, useMemo } from "react";

export const useDecks = (
  userId: string | undefined,
  searchQuery: string,
  decksSortOptionId: number,
  decksSortDirection: "asc" | "desc",
) => {
  const { decks, getDecksForUser, deleteDeck, toggleFavorite, setCurrentDeck } =
    useDeckStore();

  const decksList = useMemo(
    () => getDecksForUser(userId),
    [userId, getDecksForUser, decks],
  );

  const filterItems = useCallback(
    (query: string, items = decksList) => {
      if (!query.trim()) return items;
      const lowerQuery = query.toLowerCase();
      return items.filter((deck) =>
        deck.name.toLowerCase().includes(lowerQuery),
      );
    },
    [decksList],
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
    [filterItems, decksSortOptionId, decksSortDirection],
  );

  const cardDecks = useMemo(
    () => sortAndSetDecks(searchQuery),
    [searchQuery, sortAndSetDecks],
  );

  return {
    cardDecks,
    deleteDeck,
    toggleFavorite,
    setCurrentDeck,
  };
};

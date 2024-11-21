import { supabase } from "@/lib/supabase";
import { observable } from "@legendapp/state";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { configureSynced } from "@legendapp/state/sync";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const generateId = () => uuidv4();

const customSynced = configureSynced(syncedSupabase, {
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage,
    }),
  },
  generateId,
  supabase,
  changesSince: "last-sync",
  fieldCreatedAt: "created_at",
  fieldUpdatedAt: "updated_at",
  fieldDeleted: "deleted",
});

export const decks$ = observable(
  customSynced({
    supabase,
    collection: "deck",
    select: (from) =>
      from.select(
        `id, name, created_at, cards:flash_card(id, term, definition)`,
      ),
    persist: {
      name: "decks-local-test-31",
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  }),
);

export const toggleFavorite = (deckId: string) => {
  console.log(deckId);
  decks$[deckId].set((prev) => ({
    ...prev, // Spread the previous state to keep other properties
    is_favorite: !prev.is_favorite, // Toggle the 'is_favorite' field
  }));
};

export const cards$ = observable(
  customSynced({
    supabase,
    collection: "flash_card",
    persist: {
      name: "cards-local",
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
  }),
);

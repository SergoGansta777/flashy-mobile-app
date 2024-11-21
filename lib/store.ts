import { initialCardDecks } from "@/constants";
import { useDeckStore } from "@/store/deck-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearDeckStore = async () => {
  try {
    // Clear persistent storage
    await AsyncStorage.removeItem("deck-storage");

    // Reset Zustand state
    useDeckStore.setState({
      decks: initialCardDecks,
      currentDeckId: null,
      currentDeckCardFilter: null,
    });

    console.log("Deck store and storage cleared.");
  } catch (error) {
    console.error("Failed to clear deck store:", error);
  }
};

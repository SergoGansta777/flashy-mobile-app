import { initialCardDecks } from "@/constants";
import { useDeckStore } from "@/store/deck-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();

    useDeckStore.setState({
      decks: initialCardDecks,
      currentDeckId: null,
      cardFilter: null,
    });

    console.log("Deck store and storage cleared.");
  } catch (error) {
    console.error("Failed to clear deck store:", error);
  }
};

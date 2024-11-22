import { ColorScheme, SortDirection } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { CardFlipDirection } from "./../types/index";

type SettingsStore = {
  decksSortDirection: SortDirection;
  cardFlipDirection: CardFlipDirection;
  preferredColorTheme: ColorScheme;
  setDecksSortDirection: (direction: SortDirection) => void;
  setCardFlipDirection: (direction: CardFlipDirection) => void;
  setPreferredColorTheme: (theme: ColorScheme) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        decksSortDirection: "asc",
        cardFlipDirection: "horizontal",
        preferredColorTheme: "system",

        setDecksSortDirection: (direction) =>
          set({ decksSortDirection: direction }),
        setCardFlipDirection: (direction) =>
          set({ cardFlipDirection: direction }),
        setPreferredColorTheme: (theme) => set({ preferredColorTheme: theme }),
      }),
      {
        name: "setting-storage-local",
        version: 1,
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

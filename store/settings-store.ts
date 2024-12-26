import { CardFlipDirection, ColorScheme, SortDirection } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SettingsStore = {
  decksSortDirection: SortDirection;
  cardFlipDirection: CardFlipDirection;
  preferredColorTheme: ColorScheme;
  decksSortOptionId: number;
  setDecksSortDirection: (direction: SortDirection) => void;
  setCardFlipDirection: (direction: CardFlipDirection) => void;
  setPreferredColorTheme: (theme: ColorScheme) => void;
  setDecksSortOptionId: (id: number) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        decksSortDirection: "asc",
        cardFlipDirection: "horizontal",
        preferredColorTheme: "system",
        decksSortOptionId: 1,

        setDecksSortDirection: (direction) =>
          set({ decksSortDirection: direction }),
        setCardFlipDirection: (direction) =>
          set({ cardFlipDirection: direction }),
        setPreferredColorTheme: (theme) => set({ preferredColorTheme: theme }),
        setDecksSortOptionId: (id) => set({ decksSortOptionId: id }),
      }),
      {
        name: "setting-storage-local",
        version: 1,
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

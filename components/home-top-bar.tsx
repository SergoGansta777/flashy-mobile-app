import type { SortOption } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { H1, Small } from "./ui/typography";

type TopBarProps<T> = {
  appName: string;
  items: T[];
  setItems: (items: T[]) => void;
  sortOptions: SortOption<T>[];
  filterItems: (query: string) => T[]; // Add a filter function
};

const TopBar = <T,>({
  appName,
  items,
  setItems,
  sortOptions,
  filterItems,
}: TopBarProps<T>) => {
  const [sortOption, setSortOption] = useState(sortOptions[0].label);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to store search query
  const insets = useSafeAreaInsets();

  const handleSortChange = (option: SortOption<T>) => {
    // Toggle the direction if the same sort option is clicked
    if (option.label === sortOption) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortOption(option.label);
      setSortDirection("asc"); // Reset to "asc" when changing sort option
    }

    // Sort items based on the selected option
    const sortedItems = [...items].sort(option.sortFunction);

    // Reverse the order based on the selected direction
    if (sortDirection === "desc") {
      sortedItems.reverse();
    }

    // Update the items state with the sorted items
    setItems(sortedItems);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const filteredItems = filterItems(query);
    setItems(filteredItems);
  };

  return (
    <View className="my-2 h-auto w-full rounded-b-full px-10">
      {/* Top Bar with App Name and Notification Icon */}
      <View className="flex flex-row items-center justify-between">
        <H1>{appName}</H1>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-row items-center px-0"
        >
          <Ionicons name="notifications" size={22} />
        </Button>
      </View>

      {/* Search Input and Sort Dropdown */}
      <View className="mt-2 flex w-full flex-row items-center justify-between">
        <Input
          icon="search1"
          placeholder="Decks, terms, definitions"
          className="w-3/4"
          value={searchQuery} // Bind value to the state
          onChangeText={handleSearchChange} // Handle search query change
        />

        {/* Dropdown Menu for Sorting */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-row items-center px-0"
            >
              <Octicons
                name={`${sortDirection === "asc" ? "sort-asc" : "sort-desc"}`}
                size={22}
                color="#64738B"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent insets={insets} className="-mx-2.5">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onPress={() => handleSortChange(option)}
              >
                <Small
                  className={`${option.label === sortOption ? "font-bold" : ""}`}
                >
                  {option.label}
                </Small>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </View>
  );
};

export default TopBar;

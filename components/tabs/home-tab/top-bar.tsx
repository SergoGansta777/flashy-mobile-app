import { ArrowDownWideNarrow } from "@/lib/icons/ArrowDownWideNarrow";
import { ArrowUpNarrowWide } from "@/lib/icons/ArrowUpNarrowWide";
import { Bell } from "@/lib/icons/Bell";
import { Search } from "@/lib/icons/Search";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { CardDeck, SortDirection, SortOption } from "@/types";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { H1, Small } from "../../ui/typography";

type TopBarProps<T> = {
  appName: string;
  deckSortDirectionId: number;
  sortOptions: SortOption<T>[];
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  sortDirection: SortDirection;
  handleSortChange: (sortOption: SortOption<T>) => void;
};

const TopBar: React.FC<TopBarProps<CardDeck>> = ({
  appName,
  deckSortDirectionId,
  sortOptions,
  searchQuery,
  handleSearchChange,
  sortDirection,
  handleSortChange,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="my-2 h-auto w-full rounded-b-full px-10">
      {/* Top Bar Header: App Name and Notification Icon */}
      <View className="flex flex-row items-center justify-between">
        <H1 className="align-middle">{appName}</H1>
        <Button variant="ghost" size="icon" className="-mb-0.5">
          <Bell className="text-primary" />
        </Button>
      </View>

      {/* Search and Sort Section */}
      <View className="-ml-4 mt-2 flex w-full flex-row items-center gap-4">
        {/* Search Input */}
        <Input
          Icon={Search}
          placeholder="Decks, terms, definitions"
          className="w-4/5"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />

        {/* Sort Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-row items-center px-2"
            >
              {sortDirection === "asc" ? (
                <ArrowUpNarrowWide
                  className="text-muted-foreground"
                  size={26}
                />
              ) : (
                <ArrowDownWideNarrow
                  className="text-muted-foreground"
                  size={26}
                />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent insets={insets} className="-mx-2.5">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                onPress={() => handleSortChange(option)}
                className="flex flex-row items-center"
              >
                <option.icon
                  className={`text-foreground ${option.id === deckSortDirectionId ? "" : "opacity-80"}`}
                  size={20}
                />
                <Small
                  className={`text-md px-0.5 py-1 ${
                    option.id === deckSortDirectionId ? "font-bold" : ""
                  }`}
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

import { H3, P } from "@/components/ui/typography";
import React from "react";
import { View } from "react-native";

const ZeroSearchResult = () => {
  return (
    <View className="flex h-2/3 w-full items-center justify-center gap-1.5 px-7">
      <H3 className="mb-4 text-center">No decks match your search.</H3>

      <P className="pt-1">
        Try using different keywords or creating a new deck.
      </P>
    </View>
  );
};

export default ZeroSearchResult;

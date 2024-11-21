import React from "react";
import { View } from "react-native";
import NewDeckInput from "./new-deck-input";

type RenameCardProps = {
  name: string;
  handleRename: (text: string) => void;
};

const RenameDeck: React.FC<RenameCardProps> = ({ name, handleRename }) => {
  return (
    <View className="px-6">
      <NewDeckInput
        placeholder="Subject, chapter, unit"
        value={name}
        label="Title"
        onChangeText={handleRename}
        isBold
      />
    </View>
  );
};

export default RenameDeck;

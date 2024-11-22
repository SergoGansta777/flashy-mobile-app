import type React from "react";
import { Text, TextInput, View } from "react-native";

type NewDeckInputProps = {
  placeholder: string;
  value: string;
  label: string;
  onChangeText: (text: string) => void;
  isBold?: boolean;
};

const NewDeckInput: React.FC<NewDeckInputProps> = ({
  placeholder,
  value,
  label,
  onChangeText,
  isBold = false,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        className={`h-auto min-h-12 border-b-2 border-primary/70 px-1.5 pb-1.5 text-xl ${isBold ? "font-semibold" : "font-medium"} text-accent-foreground`}
        value={value}
        onChangeText={onChangeText}
        multiline
      />
      <Text className="mt-0.5 text-sm font-normal tracking-wide text-primary">
        {label}
      </Text>
    </View>
  );
};

export default NewDeckInput;

import AntDesign from "@expo/vector-icons/AntDesign";
import type React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Large } from "../ui/typography";
import ColorForIconWrapper from "./color-for-icon-wrapper";

type GoogleButtonProps = {
  text: string;
  handlePress?: () => void;
};

const GoogleButton: React.FC<GoogleButtonProps> = ({ text, handlePress }) => {
  return (
    <Button variant="outline" size="lg" onPress={handlePress}>
      <View className="flex flex-row items-center gap-0.5">
        <ColorForIconWrapper className="text-primary">
          <AntDesign name="google" size={24} />
        </ColorForIconWrapper>
        <Large className="text-primary"> {`${text} with Google`}</Large>
      </View>
    </Button>
  );
};

export default GoogleButton;

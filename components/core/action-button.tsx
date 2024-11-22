import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ColorForIconWrapper from "./color-for-icon-wrapper";

type ActionButtonProps = {
  onPress?: () => void;
  label: string;
  bgColor: string;
  textColor: string;
  width: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  icon,
  label,
  width,
  bgColor,
  textColor,
}) => (
  <TouchableOpacity
    className={`mx-auto flex h-full flex-col justify-center rounded-2xl ${bgColor} ${width} px-3`}
    onPress={onPress}
  >
    <ColorForIconWrapper className={`mx-auto ${textColor}`}>
      <AntDesign name={icon} size={24} />
    </ColorForIconWrapper>
    <Text className={`mx-auto mt-1.5 ${textColor}`}>{label}</Text>
  </TouchableOpacity>
);

export default ActionButton;

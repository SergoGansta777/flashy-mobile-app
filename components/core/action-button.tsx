import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type ActionButtonProps = {
  onPress: () => void;
  label: string;
  bgColor: string;
  textColor: string;
  width: string;
  iconColor: string;
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
  iconColor,
}) => (
  <TouchableOpacity
    className={`mx-auto flex h-full flex-col justify-center rounded-2xl ${bgColor} ${width} px-3`}
    onPress={onPress}
  >
    <AntDesign className="mx-auto" name={icon} size={24} color={iconColor} />
    <Text className={`mx-auto mt-1.5 ${textColor}`}>{label}</Text>
  </TouchableOpacity>
);

export default ActionButton;

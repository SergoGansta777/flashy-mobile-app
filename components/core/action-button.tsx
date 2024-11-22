import { LucideIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { P } from "../ui/typography";

type ActionButtonProps = {
  onPress?: () => void;
  label: string;
  bgColor: string;
  textColor: string;
  width: string;
  Icon?: LucideIcon;
  fillIcon?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  Icon,
  label,
  width,
  bgColor,
  textColor,
  fillIcon = false,
}) => (
  <TouchableOpacity
    className={`mx-auto flex h-full flex-col justify-center rounded-2xl ${bgColor} ${width} px-3`}
    onPress={onPress}
  >
    {Icon && fillIcon && (
      <Icon className={`mx-auto ${textColor}`} fill="yellow" />
    )}
    {Icon && !fillIcon && (
      <Icon className={`mx-auto ${textColor}`} fill="none" />
    )}
    <P className={`mx-auto mt-1.5 ${textColor}`}>{label}</P>
  </TouchableOpacity>
);

export default ActionButton;

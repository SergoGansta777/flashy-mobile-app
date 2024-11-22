import React, { PropsWithChildren } from "react";
import { Text } from "react-native";

type ColorForIconWrapperProps = {
  className?: string;
};

const ColorForIconWrapper: React.FC<
  PropsWithChildren<ColorForIconWrapperProps>
> = ({ children, className = "" }) => {
  return <Text className={className}>{children}</Text>;
};

export default ColorForIconWrapper;

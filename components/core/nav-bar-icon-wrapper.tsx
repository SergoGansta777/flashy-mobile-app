import type { PropsWithChildren } from "react";
import React from "react";
import { View } from "react-native";

type NavBarIconWrapperProps = PropsWithChildren & {
  focused: boolean;
};

const NavBarIconWrapper: React.FC<
  PropsWithChildren<NavBarIconWrapperProps>
> = ({ focused, children }) => {
  return (
    <View
      className={`h-20 w-20 items-center justify-center rounded-full ${
        focused ? "bg-secondary" : ""
      }`}
    >
      {children}
    </View>
  );
};

export default NavBarIconWrapper;

import type { PropsWithChildren } from "react";
import { View } from "react-native";

type NavBarIconWrapperProps = PropsWithChildren & {
  focused: boolean;
};

const NavBarIconWrapper: React.FC<NavBarIconWrapperProps> = ({
  focused,
  children,
}) => {
  return (
    <View
      className={`flex flex-row items-center justify-center rounded-full ${
        focused ? "bg-general-300" : ""
      }`}
    >
      <View
        className={`h-16 w-16 items-center justify-center rounded-full ${
          focused ? "bg-secondary" : ""
        }`}
      >
        {children}
      </View>
    </View>
  );
};

export default NavBarIconWrapper;

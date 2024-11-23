import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { P } from "../../ui/typography";

const SkipButtonBar = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.replace("/(auth)/sign-in");
      }}
      className="flex w-11/12 items-end justify-end p-5"
    >
      <P className="text-medium text-primary">Skip</P>
    </TouchableOpacity>
  );
};

export default SkipButtonBar;

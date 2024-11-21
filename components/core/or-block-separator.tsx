import React from "react";
import { Text } from "react-native";
import { Separator } from "../ui/separator";

const OrBlockSeparator = () => {
  return (
    <>
      <Separator className="w-1/2" />
      <Text className="text-lg">Or</Text>
      <Separator className="w-1/2" />
    </>
  );
};

export default OrBlockSeparator;

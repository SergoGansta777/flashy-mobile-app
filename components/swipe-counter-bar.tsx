import type React from "react";
import { View } from "react-native";
import { P } from "./ui/typography";

type SwipeCounterBar = {
  leftCounter: number;
  rightCounter: number;
};

const SwipeCounterBar: React.FC<SwipeCounterBar> = ({
  leftCounter,
  rightCounter,
}) => {
  return (
    <View className="mt-2 flex w-full flex-row items-center justify-between">
      <View className="bg-red-500/4 rounded-r-full border border-l-0 border-solid border-red-500/80">
        <P className="ml-1 mr-2 p-2 pl-3 pr-4 text-lg text-red-500/80">
          {leftCounter}
        </P>
      </View>
      <View className="bg-green-500/4 rounded-l-full border border-r-0 border-solid border-green-500/80">
        <P className="ml-2 mr-1 p-2 pl-4 pr-3 text-lg text-green-500/80">
          {rightCounter}
        </P>
      </View>
    </View>
  );
};

export default SwipeCounterBar;

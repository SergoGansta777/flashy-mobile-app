import type React from "react";
import { Image, View } from "react-native";
import { H1 } from "../ui/typography";

type TopHeaderImageProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  imageSource: any;
  headerText: string;
};

const TopHeaderImage: React.FC<TopHeaderImageProps> = ({
  imageSource,
  headerText,
}) => {
  return (
    <View className="relative h-[250px] w-full">
      <Image source={imageSource} className="z-0 h-[250px] w-full" />
      <H1 className="absolute bottom-3.5 left-5 font-semibold text-primary">
        {headerText}
      </H1>
    </View>
  );
};

export default TopHeaderImage;

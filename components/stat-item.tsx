import type React from "react";
import { View } from "react-native";
import { H4 } from "./ui/typography";

type StatItemProps = {
  label: string;
  value: number;
  labelColor: string;
  valueColor: string;
};

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  labelColor,
  valueColor,
}) => (
  <View className="flex w-full flex-row items-start justify-between">
    <H4 className={`${labelColor} text-left font-semibold`}>{label}</H4>
    <H4 className={`${valueColor} text-right`}> {value}</H4>
  </View>
);

export default StatItem;

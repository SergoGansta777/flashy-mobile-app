import type React from "react";
import { View } from "react-native";
import StatItem from "./stat-item";

type StatsProps = {
  known: number;
  stillLearning: number;
  remaining: number;
};

const StatsSection: React.FC<StatsProps> = ({
  known,
  stillLearning,
  remaining,
}) => (
  <View className="flex w-3/5 flex-col items-center justify-center gap-3 pr-2">
    <StatItem
      label="Known"
      value={known}
      valueColor="text-green-500/80"
      labelColor="text-primary"
    />
    <StatItem
      label="Still learning"
      value={stillLearning}
      valueColor="text-red-500/80"
      labelColor="text-primary/70"
    />
    <StatItem
      label="Terms remaining"
      value={remaining}
      valueColor="text-muted-foreground/80"
      labelColor="text-primary/50"
    />
  </View>
);

export default StatsSection;

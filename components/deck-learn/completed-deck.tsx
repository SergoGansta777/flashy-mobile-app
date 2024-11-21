import { images } from "@/constants";
import { router } from "expo-router";
import type React from "react";
import { useCallback, useMemo } from "react";
import { Image, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Button } from "../ui/button";
import { H3, Large, Lead, P } from "../ui/typography";
import StatsSection from "./stats-section";

type CompletedDeckProps = {
  known: number;
  stillLearning: number;
  total: number;
  handleSetFilters: () => void;
};

const CompletedDeck: React.FC<CompletedDeckProps> = ({
  known,
  stillLearning,
  total,
  handleSetFilters,
}) => {
  const totalSwiped = useMemo(
    () => known + stillLearning,
    [known, stillLearning],
  );

  const completionPercentage = useMemo(
    () => Math.round((known / total) * 100) || 0,
    [known, total],
  );

  const pieChartData = useMemo(
    () => [
      { value: known, color: "#000" },
      { value: stillLearning, color: "#FFF" },
    ],
    [known, stillLearning],
  );

  const handleRelearnPress = useCallback(() => {
    handleSetFilters();
    router.replace("/(root)/deck/learn");
  }, [handleSetFilters]);

  const handleRestartPress = useCallback(() => {
    router.replace("/(root)/deck/learn");
  }, []);

  return (
    <View className="mt-16 flex h-full w-full items-center justify-start px-8">
      {/* Header Section */}
      <View className="flex w-full flex-row items-center justify-between">
        <H3 className="w-4/6">
          You're doing brilliantly! Keep focusing on the touch terms.
        </H3>
        <Image
          className="h-24 w-24"
          source={images.finish}
          resizeMode="contain"
        />
      </View>

      {/* Pie Chart and Stats Section */}
      <View className="mt-20 flex w-full flex-row items-center justify-between gap-1">
        <View className="w-2/5">
          <PieChart
            donut
            radius={52}
            innerRadius={36}
            showGradient
            shadow={true}
            centerLabelComponent={() => (
              <Lead
                className={`text-center align-middle ${completionPercentage === 100 ? "text-bold font-primary" : ""}`}
              >
                {completionPercentage}%
              </Lead>
            )}
            data={pieChartData}
          />
        </View>

        <StatsSection
          known={known}
          stillLearning={stillLearning}
          remaining={total - totalSwiped}
        />
      </View>

      {/* Congratulatory Message or Review Button */}
      {stillLearning === 0 && known === total ? (
        <View className="mt-24 w-3/4">
          <P className="text-center text-4xl font-semibold">Congratulations!</P>
          <Lead className="mt-1 text-center">You remember them all.</Lead>
        </View>
      ) : (
        <>
          {stillLearning === total && (
            <View className="mt-20 w-3/4">
              <P className="text-center text-4xl font-semibold">Keep Going!</P>
              <Lead className="mt-1 text-center">
                Each attempt brings you closer!
              </Lead>
            </View>
          )}
          <Button
            className="absolute bottom-40 w-full"
            size="lg"
            onPress={handleRelearnPress}
          >
            <Large className="font-medium text-primary-foreground">
              Keep reviewing {stillLearning}{" "}
              {stillLearning === 1 ? "term" : "terms"}
            </Large>
          </Button>
        </>
      )}

      {/* Restart Button */}
      <Button
        className="absolute bottom-28 w-full"
        variant="ghost"
        onPress={handleRestartPress}
      >
        <Lead>Restart flashcards</Lead>
      </Button>
    </View>
  );
};

export default CompletedDeck;

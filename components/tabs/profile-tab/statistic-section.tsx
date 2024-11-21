import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { H4, Large, P } from "@/components/ui/typography";
import React from "react";
import { View } from "react-native";

const StatisticSection = () => {
  return (
    <View className="mt-6 flex w-full flex-row items-center justify-center gap-4 px-10">
      <Card className="w-3/5">
        <CardHeader>
          <H4>On this week</H4>
        </CardHeader>
        <CardDescription className="-mt-6 mb-4 pl-6">
          Some statistics
        </CardDescription>
        <CardContent>
          <P>Reviewed - 17</P>
          <P>Remembered - 10</P>
          <P>New - 14</P>
        </CardContent>
      </Card>

      <Card className="h-full w-2/5">
        <CardHeader>
          <H4>Today</H4>
        </CardHeader>
        <CardDescription className="-mt-6 mb-4 pl-6">
          Learn time
        </CardDescription>
        <CardContent>
          <Large className="mt-4 font-normal">50 min</Large>
        </CardContent>
      </Card>
    </View>
  );
};

export default StatisticSection;

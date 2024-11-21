import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { H4, P } from "@/components/ui/typography";
import React from "react";
import { View } from "react-native";
import EmptyAchievements from "./empty-achievements";

type AchievementsSectionProps = {
  isNoneAchievements: boolean;
};

const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  isNoneAchievements,
}) => {
  return (
    <View className="h-80 w-full px-8 pt-4">
      <Card className="h-full">
        <CardHeader>
          <H4>All achievements</H4>
        </CardHeader>
        <CardDescription className="-mt-6 mb-4 pl-6">
          Track your top actions here
        </CardDescription>
        <CardContent className="mt-10">
          {isNoneAchievements ? (
            <EmptyAchievements />
          ) : (
            <P>Your achievements will appear here.</P>
          )}
        </CardContent>
      </Card>
    </View>
  );
};

export default AchievementsSection;

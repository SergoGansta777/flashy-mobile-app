import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { BlockQuote, H4, Large, Lead, P } from "@/components/ui/typography";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { SafeAreaView, View } from "react-native";

const Profile = () => {
  const { name, lastName, avatarUrl } = {
    name: "Sergey",
    lastName: "Nechoroshev",
    avatarUrl: "",
  };

  const isNoneAchievements = true;

  // Reusable styles
  const sectionPadding = "px-10";
  const cardPadding = "-mt-6 mb-4 pl-6";

  return (
    <SafeAreaView className="relative flex h-full w-full flex-col items-center bg-background">
      <View className={`ml-auto mt-4 ${sectionPadding}`}>
        <Fontisto name="player-settings" size={22} color="black" />
      </View>

      {/* User Profile */}
      <View className="mt-7 flex items-center">
        <View className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="rounded-full" />
          ) : (
            <Large className="text-3xl">SN</Large>
          )}
        </View>
        <H4 className="mb-4 mt-6">
          {name} {lastName}
        </H4>
      </View>

      <View
        className={`mt-6 flex w-full flex-row items-center justify-center gap-4 ${sectionPadding}`}
      >
        <Card className="w-3/5">
          <CardHeader>
            <H4>On this week</H4>
          </CardHeader>
          <CardDescription className={cardPadding}>
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
          <CardDescription className={cardPadding}>Learn time</CardDescription>
          <CardContent>
            <Large className="mt-4 font-normal">50 min</Large>
          </CardContent>
        </Card>
      </View>

      <View className="h-80 w-full px-8 pt-4">
        <Card className="h-full">
          <CardHeader>
            <H4>All achievements</H4>
          </CardHeader>
          <CardDescription className={cardPadding}>
            Track your top actions here
          </CardDescription>
          <CardContent className="mt-10">
            {isNoneAchievements ? (
              <>
                <Lead>No achievements yet! 📚✨</Lead>
                <BlockQuote>
                  "Keep practicing with your flashcards to unlock new
                  achievements. Learning is a journey—start earning rewards
                  today!"
                </BlockQuote>
              </>
            ) : (
              <P>Your achievements will appear here.</P>
            )}
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

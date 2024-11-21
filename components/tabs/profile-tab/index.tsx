import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { SafeAreaView, View } from "react-native";
import AchievementsSection from "./achievements-section";
import ProfileAvatar from "./profile-avatar";
import StatisticSection from "./statistic-section";

const ProfileTab = () => {
  const { name, lastName, avatarUrl } = {
    name: "Sergey",
    lastName: "Nechoroshev",
    avatarUrl: "",
  };

  const isNoneAchievements = true;

  return (
    <SafeAreaView className="relative flex h-full w-full flex-col items-center bg-background">
      <View className="ml-auto mt-4 px-10">
        <Fontisto name="player-settings" size={22} color="black" />
      </View>

      <View className="mt-7 flex items-center">
        <ProfileAvatar name={name} lastName={lastName} avatarUrl={avatarUrl} />
      </View>

      <StatisticSection />

      <AchievementsSection isNoneAchievements={isNoneAchievements} />
    </SafeAreaView>
  );
};

export default ProfileTab;

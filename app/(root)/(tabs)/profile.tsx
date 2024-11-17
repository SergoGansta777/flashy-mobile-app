import { H4, Large, P } from "@/components/ui/typography";
import React from "react";
import { SafeAreaView, View } from "react-native";

const Profile = () => {
  const user = {
    name: "Sergey",
    lastName: "Nechoroshev",
    avatarUrl: "",
  };
  return (
    <SafeAreaView className="flex h-full w-full flex-col items-center justify-start bg-background">
      <View className="mt-8 flex items-center">
        <View className="flex size-24 items-center justify-center rounded-full bg-secondary">
          <Large className="flex text-center text-3xl">SN</Large>
        </View>
        <H4 className="mt-6">
          {user.name} {user.lastName}
        </H4>
      </View>
      <View className="mt-10">
        <P>Hello, there will be information about your profile!</P>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

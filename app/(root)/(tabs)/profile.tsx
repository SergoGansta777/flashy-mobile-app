import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { P } from "@/components/ui/typography";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView className="flex flex-col items-center justify-start bg-background">
      <View className="flex items-center">
        <Avatar alt="user avatar">
          <AvatarImage source={{ uri: "" }} />
          <AvatarFallback>
            <Text>SN</Text>
          </AvatarFallback>
        </Avatar>
        <P>You name will be here</P>
      </View>
      <View className="mt-10">
        <P>Hello, there will be information about your profile!</P>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

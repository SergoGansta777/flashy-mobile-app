import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { P } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { LogOut } from "@/lib/icons/LogOut";
import React from "react";
import { View } from "react-native";
import AchievementsSection from "./achievements-section";
import ProfileAvatar from "./profile-avatar";
import StatisticSection from "./statistic-section";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const isNoneAchievements = true;
  const { signOut, user } = useSupabase();

  return (
    <SafeAreaView className="relative flex h-full w-full flex-col items-center bg-background">
      <Dialog className="ml-auto">
        <DialogTrigger asChild>
          <Button className="mx-6 ml-auto px-3" variant="ghost" size="icon">
            <LogOut className="mr-1 mt-1 text-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent className="mx-10">
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out from account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 flex w-full flex-row items-center justify-around gap-3">
            <DialogClose asChild>
              <Button onPress={() => signOut()}>
                <P className="px-6 text-primary-foreground">Yes</P>
              </Button>
            </DialogClose>
            <DialogClose>
              <Button variant="secondary">
                <P className="px-6 text-secondary-foreground">No</P>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <View className="mt-7 flex items-center">
        <ProfileAvatar email={user?.email} />
      </View>

      <StatisticSection />

      <AchievementsSection isNoneAchievements={isNoneAchievements} />
    </SafeAreaView>
  );
};

export default ProfileTab;

import { H4, Large } from "@/components/ui/typography";
import { getAvatarFallback } from "@/lib/utils";
import React from "react";
import { View } from "react-native";

type ProfileAvatarProps = {
  name: string;
  lastName: string;
  avatarUrl?: string;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  lastName,
  avatarUrl,
}) => {
  return (
    <>
      <View className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="rounded-full" />
        ) : (
          <Large className="text-3xl">
            {getAvatarFallback(name, lastName)}
          </Large>
        )}
      </View>
      <H4 className="mb-4 mt-6">
        {name} {lastName}
      </H4>
    </>
  );
};

export default ProfileAvatar;

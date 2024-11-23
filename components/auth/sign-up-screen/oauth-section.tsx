import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import React from "react";
import { View } from "react-native";

type OAuthSectionProps = {
  text: string;
  onOAuth: () => void;
  isLoading: boolean;
};

const OAuthSection: React.FC<OAuthSectionProps> = ({
  text,
  onOAuth,
  isLoading,
}) => (
  <View className="mt-5 flex flex-col gap-5">
    <OrBlockSeparator />
    <GoogleButton text={text} handlePress={onOAuth} disabled={isLoading} />
  </View>
);

export default OAuthSection;

import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import React from "react";
import { View } from "react-native";

type OAuthSectionProps = {
  onSignInWithGoogle: () => void;
  isLoading: boolean;
};

const OAuthSection: React.FC<OAuthSectionProps> = ({
  onSignInWithGoogle,
  isLoading,
}) => (
  <View className="mt-5 flex flex-col gap-5">
    <OrBlockSeparator />
    <GoogleButton
      text="Log In"
      handlePress={onSignInWithGoogle}
      disabled={isLoading}
    />
  </View>
);

export default OAuthSection;

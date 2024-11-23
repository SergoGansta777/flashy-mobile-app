import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import { P } from "@/components/ui/typography";
import { Link } from "expo-router";
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
    <View className="mx-auto my-1 flex w-10/12 flex-row items-center justify-center gap-x-3">
      <OrBlockSeparator />
    </View>
    <GoogleButton
      text="Log In"
      handlePress={onSignInWithGoogle}
      disabled={isLoading}
    />
    <P className="text-general-200 mb-1 mt-3 text-center text-lg">
      Don&apos;t have an account?{" "}
      <Link href="/sign-up">
        <P className="text-lg text-secondary-foreground/70">Sign Up</P>
      </Link>
    </P>
  </View>
);

export default OAuthSection;

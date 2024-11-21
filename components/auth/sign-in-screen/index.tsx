import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import TopHeaderImage from "@/components/core/top-header-image";
import { Button } from "@/components/ui/button";
import { Large, P } from "@/components/ui/typography";
import { images } from "@/constants";
import type { SignInFormType } from "@/types";
import { Link } from "expo-router";
import type React from "react";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import SignInForm from "./sign-in-form";

type SignInScreenProps = {
  handleSignInButtonPress: () => void;
};

const SignInScreen: React.FC<SignInScreenProps> = ({
  handleSignInButtonPress,
}) => {
  const [form, setForm] = useState<SignInFormType>({
    email: "",
    password: "",
  });

  return (
    <ScrollView className="h-full flex-1 bg-background">
      <TopHeaderImage
        headerText="Welcome 👋"
        imageSource={images.loginHeader}
      />

      <View className="h-full flex-1">
        <View className="mt-2 flex flex-col p-5">
          <SignInForm form={form} setForm={setForm} />

          <View className="mt-40 flex flex-col gap-5">
            <Button size="lg">
              <Large className="text-primary-foreground">Log In</Large>
            </Button>

            <View className="mx-auto my-1 flex w-10/12 flex-row items-center justify-center gap-x-3">
              <OrBlockSeparator />
            </View>

            <GoogleButton text="Log In" handlePress={handleSignInButtonPress} />

            <P className="text-general-200 mt-4 text-center text-lg">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up">
                <P className="text-lg text-gray-500">Sign Up</P>
              </Link>
            </P>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

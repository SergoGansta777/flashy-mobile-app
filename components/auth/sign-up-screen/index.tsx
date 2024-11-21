import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import TopHeaderImage from "@/components/core/top-header-image";
import { Button } from "@/components/ui/button";
import { Large, P } from "@/components/ui/typography";
import { images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import SignUpForm from "./sign-up-form";

const SignUpScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1">
        <TopHeaderImage
          imageSource={images.logupHeader}
          headerText="Create Your Account"
        />
        <View className="flex flex-col gap-5 p-5">
          <SignUpForm form={form} setForm={setForm} />

          <Button size="lg">
            <Large className="text-primary-foreground">Sign Up</Large>
          </Button>

          <View className="mx-auto my-1 flex w-10/12 flex-row items-center justify-center gap-x-3">
            <OrBlockSeparator />
          </View>

          <GoogleButton text="Sign up" />

          <P className="text-general-200 mt-4 text-center text-lg">
            Already have an account?{" "}
            <Link href="/sign-in">
              <P className="text-lg text-gray-500">Sign In</P>
            </Link>
          </P>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

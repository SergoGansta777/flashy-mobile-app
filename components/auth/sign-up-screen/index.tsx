import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import TopHeaderImage from "@/components/core/top-header-image";
import { P } from "@/components/ui/typography";

import { images } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import OAuthSection from "./oauth-section";
import SignUpForm, { userFormSchema, UserFormType } from "./sign-up-form";

const SignUpScreen = () => {
  const { signUp } = useSupabase();
  const { handleGoogleSignIn, isLoading: isOAuthLoading } = useGoogleOAuth();

  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UserFormType) => {
    try {
      await signUp(data.email, data.password);
      form.reset();
      router.replace("/(auth)/sign-in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View className="h-full bg-background">
      <TopHeaderImage
        imageSource={images.logupHeader}
        headerText="Create Your Account"
      />
      <View className="flex-1 flex-col p-5">
        <SignUpForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isOAuthLoading}
        />
        <OAuthSection
          text="Sign up"
          onOAuth={handleGoogleSignIn}
          isLoading={isOAuthLoading || form.formState.isSubmitting}
        />
        <P className="text-general-200 mt-8 text-center text-lg">
          Already have an account?{" "}
          <Link href="/sign-in">
            <P className="text-lg text-secondary-foreground/70">Sign In</P>
          </Link>
        </P>
      </View>
    </View>
  );
};

export default SignUpScreen;

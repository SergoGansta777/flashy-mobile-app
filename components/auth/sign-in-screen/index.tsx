import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import TopHeaderImage from "@/components/core/top-header-image";

import { P } from "@/components/ui/typography";
import { images } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import useGoogleOAuth from "@/hooks/useGoogleOAuth";
import { Link } from "expo-router";
import OAuthSection from "./oauth-section";
import SignInForm, { userFormSchema, UserFormType } from "./sign-in-form";

const SignInScreen = () => {
  const { signInWithPassword } = useSupabase();
  const { handleGoogleSignIn, isLoading: isOAuthLoading } = useGoogleOAuth();

  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormType) => {
    try {
      await signInWithPassword(data.email, data.password);
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
      form.reset();
    }
  };

  return (
    <View className="h-full flex-1 bg-background">
      <TopHeaderImage
        headerText="Welcome 👋"
        imageSource={images.loginHeader}
      />
      <View className="h-full flex-1 p-5">
        <SignInForm
          form={form}
          onSubmit={onSubmit}
          isLoading={isOAuthLoading}
        />
        <OAuthSection
          onSignInWithGoogle={handleGoogleSignIn}
          isLoading={isOAuthLoading || form.formState.isSubmitting}
        />
        <P className="text-general-200 mb-1 mt-7 text-center text-lg">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <P className="text-lg text-secondary-foreground/70">Sign Up</P>
          </Link>
        </P>
      </View>
    </View>
  );
};

export default SignInScreen;

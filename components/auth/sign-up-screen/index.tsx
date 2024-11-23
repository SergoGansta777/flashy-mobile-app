import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import TopHeaderImage from "@/components/core/top-header-image";
import { P } from "@/components/ui/typography";

import { images } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import OAuthSection from "./oauth-section";
import SignUpForm, { userFormSchema, UserFormType } from "./sign-up-form";

const SignUpScreen = () => {
  const { signUp, getGoogleOAuthUrl, setOAuthSession } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const url = await getGoogleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(
        url,
        "flashyapp://google-auth?",
        { showInRecents: true },
      );

      if (result.type === "success") {
        const data = extractParamsFromUrl(result.url);
        if (data.access_token && data.refresh_token) {
          setOAuthSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractParamsFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split("#")[1]);
    return {
      access_token: params.get("access_token"),
      refresh_token: params.get("refresh_token"),
      token_type: params.get("token_type"),
      provider_token: params.get("provider_token"),
      expires_in: parseInt(params.get("expires_in") || "0"),
    };
  };

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync().catch((err) =>
        console.error("Failed to cool down WebBrowser:", err),
      );
    };
  }, []);

  return (
    <View className="h-full bg-background">
      <TopHeaderImage
        imageSource={images.logupHeader}
        headerText="Create Your Account"
      />
      <View className="flex-1 flex-col p-5">
        <SignUpForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
        <OAuthSection
          text="Sign up"
          onOAuth={onSignInWithGoogle}
          isLoading={isLoading || form.formState.isSubmitting}
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

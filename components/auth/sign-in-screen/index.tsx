import { zodResolver } from "@hookform/resolvers/zod";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import TopHeaderImage from "@/components/core/top-header-image";

import { P } from "@/components/ui/typography";
import { images } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import { Link } from "expo-router";
import OAuthSection from "./oauth-section";
import SignInForm, { userFormSchema, UserFormType } from "./sign-in-form";

const SignInScreen = () => {
  const { signInWithPassword, getGoogleOAuthUrl, setOAuthSession } =
    useSupabase();
  const [isLoading, setIsLoading] = useState(false);

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
    <View className="h-full flex-1 bg-background">
      <TopHeaderImage
        headerText="Welcome 👋"
        imageSource={images.loginHeader}
      />
      <View className="h-full flex-1 p-5">
        <SignInForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
        <OAuthSection
          onSignInWithGoogle={onSignInWithGoogle}
          isLoading={isLoading || form.formState.isSubmitting}
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

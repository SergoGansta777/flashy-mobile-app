import FormField from "@/components/core/form-field";
import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import TopHeaderImage from "@/components/core/top-header-image";
import { Button } from "@/components/ui/button";
import { Large, Muted, P } from "@/components/ui/typography";
import { images } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import { Lock } from "@/lib/icons/Lock";
import { Mail } from "@/lib/icons/Mail";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

const userFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Please enter at least 6 characters.")
    .max(64, "Please enter fewer than 64 characters."),
});

type userFormType = z.infer<typeof userFormSchema>;

const SignInScreen = () => {
  const { signInWithPassword, getGoogleOAuthUrl, setOAuthSession } =
    useSupabase();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<userFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    try {
      await signInWithPassword(data.email, data.password);

      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any) {
      alert(error.message);
      form.reset();
    }
  };

  React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const onSignInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const url = await getGoogleOAuthUrl();
      if (!url) return;

      const result = await WebBrowser.openAuthSessionAsync(
        url,
        "flashyapp://google-auth?",
        {
          showInRecents: true,
        },
      );

      if (result.type === "success") {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractParamsFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split("#")[1]);
    const data = {
      access_token: params.get("access_token"),
      expires_in: parseInt(params.get("expires_in") || "0"),
      refresh_token: params.get("refresh_token"),
      token_type: params.get("token_type"),
      provider_token: params.get("provider_token"),
    };

    return data;
  };

  return (
    <View className="h-full flex-1 bg-background">
      <TopHeaderImage
        headerText="Welcome 👋"
        imageSource={images.loginHeader}
      />

      <View className="h-full flex-1">
        <View className="mt-2 flex flex-col p-5">
          <View className="mb-1 flex flex-col gap-2">
            <FormProvider {...form}>
              <Controller
                control={form.control}
                name="email"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => {
                  return (
                    <FormField
                      label="Email"
                      value={value}
                      placeholder="Enter email"
                      Icon={Mail}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={error?.message}
                      textContentType="email"
                    />
                  );
                }}
              />
              <Controller
                control={form.control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => {
                  return (
                    <FormField
                      label="Password"
                      value={value}
                      placeholder="Enter password"
                      Icon={Lock}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={error?.message}
                      secureTextEntry
                      textContentType="password"
                    />
                  );
                }}
              />
            </FormProvider>

            <Button className="-mt-6 ml-auto" size="sm" variant="ghost">
              <Muted>Reset password</Muted>
            </Button>
          </View>

          <View className="mt-32 flex flex-col gap-5">
            <Button
              size="lg"
              onPress={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting || isLoading}
            >
              <Large className="text-primary-foreground">Log In</Large>
            </Button>

            <View className="mx-auto my-1 flex w-10/12 flex-row items-center justify-center gap-x-3">
              <OrBlockSeparator />
            </View>

            <GoogleButton
              text="Log In"
              handlePress={onSignInWithGoogle}
              disabled={form.formState.isSubmitting || isLoading}
            />

            <P className="text-general-200 mb-1 mt-3 text-center text-lg">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up">
                <P className="text-lg text-gray-500">Sign Up</P>
              </Link>
            </P>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

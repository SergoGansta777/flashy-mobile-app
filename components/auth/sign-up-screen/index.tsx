import FormField from "@/components/core/form-field";
import GoogleButton from "@/components/core/google-button";
import OrBlockSeparator from "@/components/core/or-block-separator";
import TopHeaderImage from "@/components/core/top-header-image";
import { Button } from "@/components/ui/button";
import { Large, P } from "@/components/ui/typography";
import { images } from "@/constants";
import { useSupabase } from "@/context/supabase-provider";
import { Lock } from "@/lib/icons/Lock";
import { LockKeyhole } from "@/lib/icons/LockKeychole";
import { Mail } from "@/lib/icons/Mail";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

const userFormSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Please enter at least 6 characters.")
      .max(64, "Please enter fewer than 64 characters.")
      .regex(
        /^(?=.*[a-z])/,
        "Your password must have at least one lowercase letter.",
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Your password must have at least one uppercase letter.",
      )
      .regex(/^(?=.*[0-9])/, "Your password must have at least one number."),
    confirmPassword: z.string().min(8, "Please enter at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });

type userFormType = z.infer<typeof userFormSchema>;

const SignUpScreen = () => {
  const { signUp } = useSupabase();

  const form = useForm<userFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    try {
      await signUp(data.email, data.password);

      form.reset();
      router.replace("/(auth)/sign-in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any) {
      console.log(error.message);
    }
  };

  return (
    <View className="h-full bg-background">
      <View className="flex-1">
        <TopHeaderImage
          imageSource={images.logupHeader}
          headerText="Create Your Account"
        />
        <View className="flex flex-col gap-5 p-5">
          <View className="mb-7 flex flex-col gap-1.5">
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
                      secureTextEntry={true}
                      textContentType="newPassword"
                    />
                  );
                }}
              />
              <Controller
                control={form.control}
                name="confirmPassword"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => {
                  return (
                    <FormField
                      label="Confirm password"
                      value={value}
                      placeholder="Confirm password"
                      Icon={LockKeyhole}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      errorMessage={error?.message}
                      secureTextEntry={true}
                      textContentType="newPassword"
                    />
                  );
                }}
              />
            </FormProvider>
          </View>

          <Button
            size="lg"
            onPress={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
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
    </View>
  );
};

export default SignUpScreen;

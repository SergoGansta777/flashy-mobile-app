import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

import FormField from "@/components/core/form-field";
import { Button } from "@/components/ui/button";
import { Large } from "@/components/ui/typography";

import { Lock } from "@/lib/icons/Lock";
import { LockKeyhole } from "@/lib/icons/LockKeychole";
import { Mail } from "@/lib/icons/Mail";

export const userFormSchema = z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });

export type UserFormType = z.infer<typeof userFormSchema>;

type SignUpFormProps = {
  form: ReturnType<typeof useForm<UserFormType>>;
  onSubmit: (data: UserFormType) => void;
  isLoading: boolean;
};

const SignUpForm: React.FC<SignUpFormProps> = ({
  form,
  onSubmit,
  isLoading,
}) => (
  <FormProvider {...form}>
    <View className="mb-7 flex flex-col gap-1.5">
      <Controller
        control={form.control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
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
        )}
      />
      <Controller
        control={form.control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormField
            label="Password"
            value={value}
            placeholder="Enter password"
            Icon={Lock}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
            secureTextEntry
            textContentType="newPassword"
          />
        )}
      />
      <Controller
        control={form.control}
        name="confirmPassword"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormField
            label="Confirm password"
            value={value}
            placeholder="Confirm password"
            Icon={LockKeyhole}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
            secureTextEntry
            textContentType="newPassword"
          />
        )}
      />
    </View>
    <Button
      size="lg"
      onPress={form.handleSubmit(onSubmit)}
      disabled={form.formState.isSubmitting || isLoading}
      className="mt-10"
    >
      <Large className="text-primary-foreground">Sign Up</Large>
    </Button>
  </FormProvider>
);

export default SignUpForm;

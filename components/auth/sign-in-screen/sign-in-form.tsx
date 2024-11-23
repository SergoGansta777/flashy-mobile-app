import FormField from "@/components/core/form-field";
import { Button } from "@/components/ui/button";
import { Large, Muted } from "@/components/ui/typography";
import { Lock } from "@/lib/icons/Lock";
import { Mail } from "@/lib/icons/Mail";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

export const userFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Please enter at least 6 characters.")
    .max(64, "Please enter fewer than 64 characters."),
});

export type UserFormType = z.infer<typeof userFormSchema>;

type SignInFormProps = {
  form: ReturnType<typeof useForm<UserFormType>>;
  onSubmit: (data: UserFormType) => void;
  isLoading: boolean;
};

const SignInForm: React.FC<SignInFormProps> = ({
  form,
  onSubmit,
  isLoading,
}) => (
  <FormProvider {...form}>
    <View className="mb-1 flex flex-col gap-2">
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
            textContentType="password"
          />
        )}
      />
      <Button className="-mt-6 ml-auto" size="sm" variant="ghost">
        <Muted>Reset password</Muted>
      </Button>
    </View>
    <Button
      size="lg"
      onPress={form.handleSubmit(onSubmit)}
      disabled={form.formState.isSubmitting || isLoading}
      className="mt-36"
    >
      <Large className="text-primary-foreground">Log In</Large>
    </Button>
  </FormProvider>
);

export default SignInForm;

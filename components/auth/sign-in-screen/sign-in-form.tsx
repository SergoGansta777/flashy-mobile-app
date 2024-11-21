import FormField from "@/components/core/form-field";
import type { SignInFormType } from "@/types";
import type React from "react";
import { View } from "react-native";

type SignInFormProps = {
  form: SignInFormType;
  setForm: (newForm: SignInFormType) => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ form, setForm }) => {
  return (
    <View className="flex flex-col gap-3">
      <FormField
        label="Email"
        value={form.email}
        placeholder="Enter email"
        icon="mail"
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <FormField
        label="Password"
        value={form.password}
        placeholder="Enter password"
        icon="lock"
        onChangeText={(value) => setForm({ ...form, password: value })}
      />
    </View>
  );
};

export default SignInForm;

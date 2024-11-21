import FormField from "@/components/core/form-field";
import type { SignUpFormType } from "@/types";
import type React from "react";
import { View } from "react-native";

type SignUpFormProps = {
  form: SignUpFormType;
  setForm: (newForm: SignUpFormType) => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ form, setForm }) => {
  return (
    <View className="mb-10 flex flex-col gap-3">
      <FormField
        label="Name"
        value={form.name}
        placeholder="Enter name"
        icon="user"
        onChangeText={(value) => setForm({ ...form, name: value })}
      />
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

export default SignUpForm;

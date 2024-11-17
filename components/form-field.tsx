import type React from "react";
import { View } from "react-native";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  icon,
  onChangeText,
}) => {
  return (
    <View className="flex w-full flex-col gap-1.5">
      <Label className="text-4xl font-semibold text-primary">{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        icon={icon}
      />
    </View>
  );
};

export default FormField;

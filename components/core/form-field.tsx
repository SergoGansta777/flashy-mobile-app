import { LucideIcon } from "lucide-react-native";
import type React from "react";
import { View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Small } from "../ui/typography";

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
  textContentType?: string;
  Icon?: LucideIcon;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  Icon,
  onChangeText,
  onBlur,
  errorMessage,
  secureTextEntry,
  textContentType,
}) => {
  return (
    <View className="flex w-full flex-col gap-1">
      <Label className="text-4xl font-semibold text-primary">{label}</Label>
      <Input
        className="overflow-hidden"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        Icon={Icon}
        autoCorrect={false}
        autoCapitalize="none"
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={label === "Email" ? "email-address" : undefined}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        textContentType={textContentType as any}
      />
      <Small className="-mt-1 pl-4 text-destructive">{errorMessage}</Small>
    </View>
  );
};

export default FormField;

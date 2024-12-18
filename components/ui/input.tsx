import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react-native";
import * as React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  type TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type InputProps = TextInputProps & {
  Icon?: LucideIcon;
};

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderClassName, Icon, ...props }, ref) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="my-2 w-full">
            <View className="focus:border-primary-500 relative flex w-full flex-row items-center justify-start rounded-full border border-input bg-background">
              {Icon && (
                <View className="ml-3.5 mr-0.5">
                  <Icon className="text-foreground opacity-80" />
                </View>
              )}

              <TextInput
                ref={ref}
                className={cn(
                  "native:h-12 native:text-lg native:leading-[1.25] h-10 w-full px-3 text-base text-foreground file:border-0 file:bg-transparent file:font-medium lg:text-sm",
                  props.editable === false && "opacity-50",
                  className,
                )}
                placeholderClassName={cn(
                  "text-muted-foreground",
                  placeholderClassName,
                )}
                {...props}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  },
);

Input.displayName = "Input";

export { Input };

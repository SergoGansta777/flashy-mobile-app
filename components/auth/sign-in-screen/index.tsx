import TopHeaderImage from "@/components/core/top-header-image";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Large, P } from "@/components/ui/typography";
import { images } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import type React from "react";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

type SignInScreenProps = {
  handleSignInButtonPress: () => void;
};

const SignInScreen: React.FC<SignInScreenProps> = ({
  handleSignInButtonPress,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="h-full flex-1 bg-background">
      <TopHeaderImage
        headerText="Welcome 👋"
        imageSource={images.loginHeader}
      />

      <View className="h-full flex-1">
        <View className="mt-2 flex flex-col p-5">
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

          <View className="mt-40 flex flex-col gap-5">
            <Button size="lg">
              <Large className="text-primary-foreground">Log In</Large>
            </Button>

            <View className="my-1 flex flex-row items-center justify-center gap-x-3">
              <Separator />
              <Text className="text-lg">Or</Text>
              <Separator />
            </View>

            <Button
              variant="outline"
              size="lg"
              onPress={handleSignInButtonPress}
            >
              <View className="flex flex-row items-center">
                <AntDesign name="google" size={24} />
                <Large className="text-primary"> Log in with Google</Large>
              </View>
            </Button>

            <P className="text-general-200 mt-4 text-center text-lg">
              Don't have an account?{" "}
              <Link href="/sign-up">
                <P className="text-lg text-gray-500">Sign Up</P>
              </Link>
            </P>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

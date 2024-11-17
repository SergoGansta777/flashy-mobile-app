import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H1, Large, P } from "@/components/ui/typography";
import { images } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  return (
    <ScrollView className="h-full flex-1 bg-background">
      <View className="h-full flex-1">
        <View className="relative h-[250px] w-full">
          <Image source={images.loginHeader} className="z-0 h-[250px] w-full" />
          <H1 className="absolute bottom-3.5 left-5 font-semibold text-primary">
            Welcome 👋
          </H1>
        </View>
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
              onPress={() => setIsSignedIn(true)}
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

export default SignIn;

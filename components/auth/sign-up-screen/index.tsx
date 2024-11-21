import TopHeaderImage from "@/components/core/top-header-image";
import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Large, P } from "@/components/ui/typography";
import { images } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const SignUpScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1">
        <TopHeaderImage
          imageSource={images.loginHeader}
          headerText="Create Your Text"
        />
        <View className="flex flex-col gap-5 p-5">
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
          <Button size="lg">
            <Large className="text-primary-foreground">Sign Up</Large>
          </Button>

          <View className="my-1 flex flex-row items-center justify-center gap-x-3">
            <Separator />
            <Text className="text-lg">Or</Text>
            <Separator />
          </View>

          <Button variant="outline" size="lg">
            <View className="flex flex-row items-center">
              <AntDesign name="google" size={24} />
              <Large className="text-primary"> Sign up with Google</Large>
            </View>
          </Button>

          <P className="text-general-200 mt-4 text-center text-lg">
            Already have an account?{" "}
            <Link href="/sign-in">
              <P className="text-lg text-gray-500">Sign In</P>
            </Link>
          </P>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

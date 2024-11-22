import SignInScreen from "@/components/auth/sign-in-screen";
import { useSupabase } from "@/context/supabase-provider";
import { Redirect } from "expo-router";
import React from "react";

const SignIn = () => {
  const { user } = useSupabase();

  if (user) return <Redirect href="/(root)/(tabs)/home" />;

  return <SignInScreen />;
};

export default SignIn;

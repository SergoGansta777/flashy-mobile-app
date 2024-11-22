import SignUpScreen from "@/components/auth/sign-up-screen";
import { useSupabase } from "@/context/supabase-provider";
import { Redirect } from "expo-router";
import React from "react";

const SignUp = () => {
  const { user } = useSupabase();

  if (user) return <Redirect href="/(root)/(tabs)/home" />;

  return <SignUpScreen />;
};

export default SignUp;

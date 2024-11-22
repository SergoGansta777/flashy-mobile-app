import { useSupabase } from "@/context/supabase-provider";
import { Redirect } from "expo-router";
import React from "react";

const Page = () => {
  const { user } = useSupabase();

  if (user) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;

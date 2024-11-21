import { Redirect } from "expo-router";
import React from "react";

const Page = () => {
  const isSignedIn = true;

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;

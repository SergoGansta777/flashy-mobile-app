import SignInScreen from "@/components/auth/sign-in-screen";
import { Redirect } from "expo-router";
import React, { useState } from "react";

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (isSignedIn) return <Redirect href="/(root)/(tabs)/home" />;

  const handleSignUpButtonPress = () => {
    setIsSignedIn(true);
  };

  return <SignInScreen handleSignInButtonPress={handleSignUpButtonPress} />;
};

export default SignIn;

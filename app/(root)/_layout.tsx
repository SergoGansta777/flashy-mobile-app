import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="deck/learn" options={{ headerShown: false }} />
      <Stack.Screen name="deck/edit" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

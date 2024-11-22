import { SupabaseProvider } from "@/context/supabase-provider";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import "../global.css";

export const RootLayout = () => {
  return (
    <SupabaseProvider>
      <StatusBar />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <PortalHost />
    </SupabaseProvider>
  );
};

export default RootLayout;

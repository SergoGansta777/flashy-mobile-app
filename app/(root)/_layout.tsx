import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="deck/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

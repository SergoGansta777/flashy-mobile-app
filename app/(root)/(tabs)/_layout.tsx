import NavBarIconWrapper from "@/components/core/nav-bar-icon-wrapper";
import { BadgePlus } from "@/lib/icons/BadgePlus";
import { House } from "@/lib/icons/House";
import { User } from "@/lib/icons/User";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: Platform.OS === "ios" ? 20 : 10,
          paddingBottom: Platform.OS === "ios" ? 0 : 30,
          height: 88,
          paddingHorizontal: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ focused }) => (
            <NavBarIconWrapper focused={focused}>
              <House
                className={`${focused ? "text-accent-foreground" : "text-secondary"}`}
                size={45}
              />
            </NavBarIconWrapper>
          ),
        }}
      />
      <Tabs.Screen
        name="new-deck"
        options={{
          title: "New",
          headerShown: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ focused }) => (
            <NavBarIconWrapper focused={focused}>
              <BadgePlus
                className={`${focused ? "text-accent-foreground" : "text-secondary"}`}
                size={45}
              />
            </NavBarIconWrapper>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ focused }) => {
            return (
              <NavBarIconWrapper focused={focused}>
                <User
                  className={`${focused ? "text-accent-foreground" : "text-secondary"}`}
                  size={45}
                />
              </NavBarIconWrapper>
            );
          },
        }}
      />
    </Tabs>
  );
}

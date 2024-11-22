import NavBarIconWrapper from "@/components/core/nav-bar-icon-wrapper";
import { BadgePlus } from "@/lib/icons/BadgePlus";
import { House } from "@/lib/icons/House";
import { User } from "@/lib/icons/User";
import { Tabs } from "expo-router";
import React from "react";

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
          marginBottom: 20,
          paddingHorizontal: 14,
          height: 78,
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
          tabBarIcon: ({ focused }) => (
            <NavBarIconWrapper focused={focused}>
              <House
                className={`${focused ? "text-accent-foreground" : "text-secondary"}`}
                size={38}
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
          tabBarIcon: ({ focused }) => (
            <NavBarIconWrapper focused={focused}>
              <BadgePlus
                className={`${focused ? "text-accent-foreground" : "text-secondary"}`}
                size={38}
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
          tabBarIcon: ({ focused }) => {
            return (
              <NavBarIconWrapper focused={focused}>
                <User
                  className={`${focused ? "text-accent-foreground" : "text-secondary"}`}
                  size={38}
                />
              </NavBarIconWrapper>
            );
          },
        }}
      />
    </Tabs>
  );
}

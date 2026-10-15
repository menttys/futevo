import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useUnistyles } from "react-native-unistyles"

import { FloatingTabBar } from "@/components/FloatingTabBar"
import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { LayoutDashboard, Settings as SettingsIcon, Users } from "@/lib/icons"

import { MatchesStack } from "./MatchesStack"
import { PlayersStack } from "./PlayersStack"
import { TabRoutes } from "./routes"
import { SettingsStack } from "./SettingsStack"
import { TabParamList } from "./types/navigation"

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const { theme } = useUnistyles()

  return (
    <Tab.Navigator
      detachInactiveScreens={DETACH_INACTIVE_SCREENS}
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarPosition: IS_WEB ? "left" : "bottom",
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tab.Screen
        name={TabRoutes.MATCHES}
        component={MatchesStack}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.PLAYERS}
        component={PlayersStack}
        options={{
          tabBarLabel: "Players",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.SETTINGS}
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

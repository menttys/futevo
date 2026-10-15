import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useUnistyles } from "react-native-unistyles"

import { FloatingTabBar } from "@/components/FloatingTabBar"
import { DETACH_INACTIVE_SCREENS } from "@/constants/Platform"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useLanguage } from "@/i18n"
import { LayoutDashboard, Settings as SettingsIcon, Trophy, Users } from "@/lib/icons"
import { DashboardScreen } from "@/screens/DashboardScreen"
import { MatchesListScreen } from "@/screens/MatchesListScreen"

import { MatchesStack } from "./MatchesStack"
import { PlayersStack } from "./PlayersStack"
import { TabRoutes } from "./routes"
import { SettingsStack } from "./SettingsStack"
import { TabParamList } from "./types/navigation"

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const sideBar = useSideTabBar()

  return (
    <Tab.Navigator
      initialRouteName={TabRoutes.MATCHES}
      detachInactiveScreens={DETACH_INACTIVE_SCREENS}
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarPosition: sideBar ? "left" : "bottom",
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tab.Screen
        name={TabRoutes.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: t("tabs.dashboard"),
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.MATCHES}
        component={MatchesListScreen}
        options={{
          tabBarLabel: t("tabs.matches"),
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tab.Screen name={TabRoutes.MATCH_FLOW} component={MatchesStack} />
      <Tab.Screen
        name={TabRoutes.PLAYERS}
        component={PlayersStack}
        options={{
          tabBarLabel: t("tabs.players"),
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.SETTINGS}
        component={SettingsStack}
        options={{
          tabBarLabel: t("tabs.settings"),
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

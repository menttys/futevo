import React, { useEffect, useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import useFirebase, { subscribeToAuth } from "@/hooks/useFirebase"
import { LoginScreen } from "@/screens/LoginScreen"
import { PrivacyScreen } from "@/screens/PrivacyScreen"
import { SplashScreen } from "@/screens/SplashScreen"
import { TermsScreen } from "@/screens/TermsScreen"
import { useUserStore } from "@/store/userState"
import { theme } from "@/styles/theme"

import { RootRoutes } from "./routes"
import { TabNavigator } from "./TabNavigator"
import { RootStackParamList } from "./types/navigation"

const Stack = createStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const [isAuthReady, setIsAuthReady] = useState(false)
  const user = useUserStore((s) => s.user)
  const { setUser } = useUserStore()
  const { fetchUserInfo } = useFirebase()

  useEffect(() => {
    const unsubscribe = subscribeToAuth((firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
      } else {
        fetchUserInfo(firebaseUser)
      }
      setIsAuthReady(true)
    })
    return unsubscribe
  }, [fetchUserInfo, setUser])

  if (!isAuthReady) return <SplashScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // "float" keeps the stack from blocking page-body scrolling on web (see SettingsStack).
        headerMode: IS_WEB ? "float" : undefined,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
      detachInactiveScreens={DETACH_INACTIVE_SCREENS}
    >
      {user ? (
        <Stack.Screen name={RootRoutes.MAIN} component={TabNavigator} />
      ) : (
        <Stack.Screen name={RootRoutes.LOGIN} component={LoginScreen} />
      )}
      <Stack.Screen name={RootRoutes.TERMS} component={TermsScreen} />
      <Stack.Screen name={RootRoutes.PRIVACY} component={PrivacyScreen} />
    </Stack.Navigator>
  )
}

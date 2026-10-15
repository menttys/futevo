import React, { useEffect, useState } from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS } from "@/constants/Platform"
import useFirebase, { subscribeToAuth } from "@/hooks/useFirebase"
import { LoginScreen } from "@/screens/LoginScreen"
import { SplashScreen } from "@/screens/SplashScreen"
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
        cardStyle: { backgroundColor: theme.colors.background },
      }}
      detachInactiveScreens={DETACH_INACTIVE_SCREENS}
    >
      {user ? (
        <Stack.Screen name={RootRoutes.MAIN} component={TabNavigator} />
      ) : (
        <Stack.Screen name={RootRoutes.LOGIN} component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}

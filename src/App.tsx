import "@/styles/unistyles"

import React from "react"

import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ErrorBoundary } from "@/components/ErrorBoundary"
import { OfflineBanner } from "@/components/OfflineBanner"
import { useNetworkState } from "@/hooks/useNetworkState"
import { RootNavigator } from "@/navigation/RootNavigator"
import { theme } from "@/styles/theme"

const NAV_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.background,
    text: theme.colors.text,
    border: "transparent",
    notification: theme.colors.primary,
  },
}

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
  })

  useNetworkState()

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <ErrorBoundary>
            <NavigationContainer theme={NAV_THEME}>
              <RootNavigator />
            </NavigationContainer>
            <OfflineBanner />
          </ErrorBoundary>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

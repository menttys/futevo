import "@/styles/unistyles"

import React from "react"

import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import {
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from "@expo-google-fonts/bricolage-grotesque"
import { Figtree_400Regular, Figtree_600SemiBold, Figtree_700Bold } from "@expo-google-fonts/figtree"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ErrorBoundary } from "@/components/ErrorBoundary"
import { OfflineBanner } from "@/components/OfflineBanner"
import { Toast } from "@/components/Toast"
import { useNetworkState } from "@/hooks/useNetworkState"
import { i18n } from "@/i18n"
import { linking } from "@/navigation/linking"
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
    Figtree_400Regular,
    Figtree_600SemiBold,
    Figtree_700Bold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
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
            <NavigationContainer
              theme={NAV_THEME}
              linking={linking}
              documentTitle={{ formatter: () => i18n.t("app.name") }}
            >
              <RootNavigator />
            </NavigationContainer>
            <OfflineBanner />
            <Toast />
          </ErrorBoundary>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

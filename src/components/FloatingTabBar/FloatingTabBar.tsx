import React, { useContext } from "react"
import { Image, Pressable, Text, View } from "react-native"

import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs"
import { useUnistyles } from "react-native-unistyles"

import { FutevoMark } from "@/components/FutevoMark"
import { SideMenu } from "@/components/SideMenu"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useLanguage } from "@/i18n"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"

import type { FloatingTabBarProps } from "./FloatingTabBar.d"
import { styles } from "./FloatingTabBar.styles"

const LOGO = require("@/assets/images/logo.png")

const FULL_SCREEN_ROUTES = new Set<string>([
  MatchesRoutes.NEW_MATCH,
  MatchesRoutes.LIVE_MATCH,
  MatchesRoutes.POINT_ENTRY,
  MatchesRoutes.PLAYER_PICKER,
  MatchesRoutes.GAMIFIED_MATCH,
])

// Yellow pill: Home · Matches · [centre ball = New match] · Players · Settings.
// The match-flow stack sits in the middle of the route list, so the ball renders in its slot.
export function FloatingTabBar({ state, descriptors, navigation, insets }: FloatingTabBarProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const sideBar = useSideTabBar()
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext)

  // Scoring screens need the whole display, so the bar steps aside there.
  const activeRoute = state.routes[state.index]
  const activeNested = activeRoute.state?.routes[activeRoute.state.index ?? 0]?.name
  // The web sidebar doesn't cover content, so it only steps aside for court mode.
  if (
    activeRoute.name === TabRoutes.MATCH_FLOW &&
    activeNested &&
    (activeNested === MatchesRoutes.GAMIFIED_MATCH ||
      (!sideBar && FULL_SCREEN_ROUTES.has(activeNested)))
  ) {
    return null
  }

  if (sideBar) return <SideMenu state={state} descriptors={descriptors} navigation={navigation} insets={insets} />

  const onNewMatch = () => {
    navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
  }

  const items = state.routes.map((route, index) => {
    if (route.name === TabRoutes.MATCH_FLOW) {
      return (
        <Pressable
          key={route.key}
          accessibilityRole="button"
          accessibilityLabel={t("tabs.newMatch")}
          onPress={onNewMatch}
          style={[styles.ball, sideBar && styles.ballSide]}
        >
          <FutevoMark size={30} color={theme.colors.dark} />
        </Pressable>
      )
    }

    const { options } = descriptors[route.key]
    // Match screens live in the match-flow stack, but belong to the Matches tab.
    const inMatchFlow = activeRoute.name === TabRoutes.MATCH_FLOW
    const focused = inMatchFlow ? route.name === TabRoutes.MATCHES : state.index === index
    const color = focused ? theme.colors.text : theme.colors.iconMuted
    const label = options.tabBarLabel?.toString() ?? route.name

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      })
      if ((!focused || state.index !== index) && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params)
      }
    }

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        accessibilityLabel={label}
        onPress={onPress}
        style={[styles.item, sideBar && styles.itemSide]}
      >
        {options.tabBarIcon?.({ focused, color, size: 24 })}
        <Text style={styles.label(focused)}>{label}</Text>
      </Pressable>
    )
  })

  return (
    <View
      pointerEvents="box-none"
      onLayout={(e) => {
        if (!sideBar) onHeightChange?.(e.nativeEvent.layout.height)
      }}
      style={[styles.wrapper, sideBar ? styles.wrapperSide : styles.wrapperFloating]}
    >
      {sideBar && (
        <View style={styles.logo}>
          <Image source={LOGO} style={styles.logoImage} resizeMode="cover" />
        </View>
      )}
      <View style={[styles.bar, sideBar && styles.barSide]}>{items}</View>
    </View>
  )
}

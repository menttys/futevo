import React, { useContext } from "react"
import { Image, Pressable, View } from "react-native"

import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs"
import { useUnistyles } from "react-native-unistyles"

import { useSideTabBar } from "@/hooks/useSideTabBar"
import { Plus } from "@/lib/icons"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import { useLanguage } from "@/i18n"

import type { FloatingTabBarProps } from "./FloatingTabBar.d"
import { styles } from "./FloatingTabBar.styles"

const LOGO = require("@/assets/images/logo.png")

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const sideBar = useSideTabBar()
  const onHeightChange = useContext(BottomTabBarHeightCallbackContext)

  // The court-mode screen needs the whole display, so the bar steps aside there.
  const activeRoute = state.routes[state.index]
  const activeNested = activeRoute.state?.routes[activeRoute.state.index ?? 0]?.name
  if (activeRoute.name === TabRoutes.MATCH_FLOW && activeNested === MatchesRoutes.GAMIFIED_MATCH) {
    return null
  }

  const onNewMatch = () => {
    navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
  }

  const newMatchButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("tabs.newMatch")}
      onPress={onNewMatch}
      style={styles.center}
    >
      <View style={[styles.circle, styles.circleNew]}>
        <Plus size={22} color={theme.colors.dark} />
      </View>
    </Pressable>
  )

  const tabs = state.routes.map((route, index) => {
    // The match-flow stack has no tab of its own.
    if (route.name === TabRoutes.MATCH_FLOW) return null
    const { options } = descriptors[route.key]
    // Match detail lives in the match-flow stack, but belongs to the Matches tab.
    const activeTab = state.routes[state.index]
    const nested = activeTab.state?.routes[activeTab.state.index ?? 0]?.name
    const inMatch = activeTab.name === TabRoutes.MATCH_FLOW && nested === MatchesRoutes.MATCH_DETAIL
    const focused = inMatch
      ? route.name === TabRoutes.MATCHES
      : state.index === index
    const color = focused ? theme.colors.dark : theme.colors.grey300

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
        accessibilityLabel={options.tabBarLabel?.toString() ?? route.name}
        onPress={onPress}
        style={styles.item}
      >
        <View style={[styles.circle, focused && styles.circleActive]}>
          {options.tabBarIcon?.({ focused, color, size: 20 })}
        </View>
      </Pressable>
    )
  })

  return (
    <View
      pointerEvents="box-none"
      onLayout={(e) => {
        if (!sideBar) onHeightChange?.(e.nativeEvent.layout.height)
      }}
      style={[styles.wrapper, sideBar ? styles.wrapperWeb : styles.wrapperFloating]}
    >
      {sideBar && (
        <View style={styles.logo}>
          <Image source={LOGO} style={styles.logoImage} resizeMode="cover" />
        </View>
      )}
      <View style={[styles.bar, sideBar && styles.barWeb]}>
        {sideBar ? (
          <>
            <View style={[styles.group, styles.groupWeb]}>{tabs}</View>
            {newMatchButton}
          </>
        ) : (
          <>
            {tabs}
            {newMatchButton}
          </>
        )}
      </View>
    </View>
  )
}

import React from "react"
import { Pressable, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { useSideTabBar } from "@/hooks/useSideTabBar"
import { Plus } from "@/lib/icons"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import { useLanguage } from "@/i18n"

import type { FloatingTabBarProps } from "./FloatingTabBar.d"
import { styles } from "./FloatingTabBar.styles"

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const sideBar = useSideTabBar()

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
    <View style={[styles.wrapper, sideBar && styles.wrapperWeb]}>
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

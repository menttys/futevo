import React from "react"
import { Pressable, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { IS_WEB } from "@/constants/Platform"
import { Plus } from "@/lib/icons"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"

import type { FloatingTabBarProps } from "./FloatingTabBar.d"
import { styles } from "./FloatingTabBar.styles"

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const { theme } = useUnistyles()

  const onNewMatch = () => {
    navigation.navigate(TabRoutes.DASHBOARD, { screen: MatchesRoutes.NEW_MATCH })
  }

  const newMatchButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="New match"
      onPress={onNewMatch}
      style={styles.center}
    >
      <View style={[styles.circle, styles.circleNew]}>
        <Plus size={22} color={theme.colors.dark} />
      </View>
    </Pressable>
  )

  const tabs = state.routes.map((route, index) => {
    const { options } = descriptors[route.key]
    const focused = state.index === index
    const color = focused ? theme.colors.dark : theme.colors.grey300

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      })
      if (!focused && !event.defaultPrevented) {
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
    <View style={[styles.wrapper, IS_WEB && styles.wrapperWeb]}>
      <View style={[styles.bar, IS_WEB && styles.barWeb]}>
        <View style={[styles.group, IS_WEB && styles.groupWeb]}>{tabs}</View>
        {newMatchButton}
      </View>
    </View>
  )
}

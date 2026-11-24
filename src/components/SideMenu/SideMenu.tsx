import React, { useEffect } from "react"
import { Pressable, Text, useWindowDimensions, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { FutevoMark } from "@/components/FutevoMark"
import { MeshBackground } from "@/components/MeshBackground"
import { useLanguage } from "@/i18n"
import { Plus, SidebarSimple } from "@/lib/icons"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import { useMenuStore } from "@/store/menuState"
import { useUserStore } from "@/store/userState"

import type { SideMenuProps } from "./SideMenu.d"
import { styles } from "./SideMenu.styles"

// react-native-web adds `hovered` to the pressable state; native has none.
function isHovered(state: object) {
  return "hovered" in state && state.hovered === true
}

function initial(name: string | null | undefined, email: string | null | undefined) {
  return ((name || email || "?").trim()[0] ?? "?").toUpperCase()
}

// Desktop web left menu: 72px icon rail, or 200px with labels. State persists across visits.
export function SideMenu({ state, descriptors, navigation }: SideMenuProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const open = useMenuStore((s) => s.open)
  const toggle = useMenuStore((s) => s.toggle)
  const user = useUserStore((s) => s.user)
  const { width, height } = useWindowDimensions()

  // "[" toggles the menu, unless the user is typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (e.key !== "[" || e.metaKey || e.ctrlKey || e.altKey) return
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable))
        return
      toggle()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [toggle])

  const activeRoute = state.routes[state.index]
  const inMatchFlow = activeRoute.name === TabRoutes.MATCH_FLOW

  const onNewMatch = () => {
    navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
  }

  const toggleLabel = open ? t("tabs.collapseMenu") : t("tabs.openMenu")

  return (
    <View style={styles.menu(open)}>
      {/* The page mesh, sized to the window so it lines up with the screens, under a light cream tint. */}
      <View style={styles.mesh(width, height)}>
        <MeshBackground />
      </View>
      <View style={styles.tint} />
      <View style={styles.logo(open)}>
        <FutevoMark size={26} color={theme.colors.dark} />
        {open && <Text style={styles.wordmark}>Futevo</Text>}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("tabs.newMatch")}
        // @ts-expect-error web-only prop: native tooltip
        title={t("tabs.newMatch")}
        onPress={onNewMatch}
        style={styles.newMatch(open)}
      >
        <Plus size={20} color={theme.colors.text} />
        {open && <Text style={styles.newMatchLabel}>{t("tabs.newMatch")}</Text>}
      </Pressable>

      {state.routes.map((route, index) => {
        if (route.name === TabRoutes.MATCH_FLOW) return null
        const { options } = descriptors[route.key]
        // Match screens live in the match-flow stack but belong to the Matches item.
        const active = inMatchFlow ? route.name === TabRoutes.MATCHES : state.index === index
        const label = options.tabBarLabel?.toString() ?? route.name

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })
          if ((!active || state.index !== index) && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="link"
            accessibilityLabel={label}
            aria-current={active ? "page" : undefined}
            // @ts-expect-error web-only prop: native tooltip
            title={open ? undefined : label}
            onPress={onPress}
            style={(state) => styles.item(open, active, isHovered(state))}
          >
            {options.tabBarIcon?.({
              focused: active,
              color: active ? theme.colors.text : theme.colors.iconIdle,
              size: 20,
            })}
            {open && <Text style={styles.label(active)}>{label}</Text>}
          </Pressable>
        )
      })}

      <View style={styles.spacer} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={toggleLabel}
        aria-expanded={open}
        // @ts-expect-error web-only prop: native tooltip
        title={toggleLabel}
        onPress={toggle}
        style={(state) => styles.item(open, false, isHovered(state))}
      >
        <SidebarSimple size={20} color={theme.colors.iconIdle} />
        {open && <Text style={styles.label(false)}>{t("tabs.collapse")}</Text>}
      </Pressable>

      <View style={styles.profile(open)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial(user?.displayName, user?.email)}</Text>
        </View>
        {open && (
          <View style={styles.profileText}>
            <Text style={styles.profileName} numberOfLines={1}>
              {user?.displayName ?? ""}
            </Text>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {user?.email ?? ""}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

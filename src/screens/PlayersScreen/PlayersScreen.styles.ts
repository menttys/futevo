import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    gap: 12,
  },
  title: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  total: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  chips: {
    gap: 8,
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    paddingTop: 4,
  },
  letter: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  item: {
    paddingBottom: 9,
  },
  // Yellow floating + above the tab bar.
  fab: (tabBarInset: number, pressed: boolean) => ({
    position: "absolute",
    right: theme.gutter,
    bottom: tabBarInset + 12,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    boxShadow: theme.shadows.bar,
    opacity: pressed ? 0.85 : 1,
  }),
}))

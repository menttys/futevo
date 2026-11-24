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
  headerWide: {
    paddingHorizontal: 44,
    paddingTop: 30,
    gap: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  filtersWide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  searchWide: {
    width: 360,
  },
  chipsWide: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  listContentWide: {
    paddingHorizontal: 44,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // Three fixed columns: 32% + 2% gap + 32% + 2% gap + 32%.
  cell: (last: boolean) => ({
    width: "32%",
    marginRight: last ? 0 : "2%",
  }),
  headerButton: {
    paddingHorizontal: 20,
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

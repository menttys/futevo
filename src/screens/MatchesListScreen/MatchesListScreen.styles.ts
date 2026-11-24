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
    gap: 14,
  },
  headerWide: {
    paddingHorizontal: 44,
    paddingTop: 30,
    gap: 20,
  },
  filtersWide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  searchWide: {
    width: 420,
  },
  listContentWide: {
    paddingHorizontal: 44,
  },
  headerButton: {
    paddingHorizontal: 20,
  },
  bodyWide: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 28,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  side: {
    width: 340,
    gap: 14,
    paddingTop: 14,
  },
  sideList: {
    gap: 10,
  },
  weekCard: {
    gap: 12,
    padding: 16,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
  },
  weekTiles: {
    flexDirection: "row",
    gap: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cell: {
    width: "49.3%",
  },
  cellFull: {
    width: "100%",
  },
  title: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  chips: {
    flexDirection: "row",
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
  dayLabel: {
    paddingTop: 14,
    paddingBottom: 9,
  },
  item: {
    paddingBottom: 9,
  },
}))

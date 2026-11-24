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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 9,
  },
  cell: {
    flexBasis: "48%",
    flexGrow: 1,
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

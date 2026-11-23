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
  title: {
    paddingHorizontal: 0,
    paddingBottom: 0,
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
  dayLabel: {
    paddingTop: 14,
    paddingBottom: 9,
  },
  item: {
    paddingBottom: 9,
  },
}))

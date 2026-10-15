import { StyleSheet } from "react-native-unistyles"

import { IS_WEB, WEB_CONTENT, WEB_SIDE_BAR_MIN_WIDTH } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  toolbar: {
    ...WEB_CONTENT,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
  chipsWrapper: {
    ...WEB_CONTENT,
  },
  chips: {
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  chip: (active: boolean) => ({
    backgroundColor: active ? theme.colors.primary : theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  }),
  chipLabel: (active: boolean) => ({
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: active ? theme.colors.dark : theme.colors.text,
  }),
  listWrapper: {
    ...WEB_CONTENT,
    flex: 1,
    paddingHorizontal:
      IS_WEB && rt.screen.width < WEB_SIDE_BAR_MIN_WIDTH ? theme.spacing.md - theme.spacing.xs : 0,
  },
  listContent: {
    paddingHorizontal: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.xl,
  },
  tileWrapper: {
    flex: 1,
    padding: theme.spacing.xs,
  },
  flag: {
    position: "absolute",
    top: theme.spacing.md,
    right: theme.spacing.md,
    fontSize: theme.typography.size.lg,
  },
}))

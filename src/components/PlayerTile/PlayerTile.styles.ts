import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  tile: (selected: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: selected ? theme.colors.primary : "transparent",
  }),
  name: {
    flex: 1,
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  badge: (color: string) => ({
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: color,
    borderRadius: theme.radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  }),
  badgeText: {
    fontFamily: "Figtree_700Bold",
    fontSize: 10,
    color: theme.colors.dark,
  },
}))

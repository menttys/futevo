import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  tile: (selected: boolean) => ({
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: selected ? theme.colors.primary : "transparent",
  }),
  name: {
    maxWidth: "100%",
    textAlign: "center",
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.md,
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
    fontFamily: "Sora-Bold",
    fontSize: 10,
    color: theme.colors.dark,
  },
}))

import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 200,
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
  },
  toast: {
    backgroundColor: theme.colors.dark,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.white,
    textAlign: "center",
  },
}))

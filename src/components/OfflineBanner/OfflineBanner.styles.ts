import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  offline: {
    backgroundColor: theme.colors.dangerAlt,
  },
  syncing: {
    backgroundColor: theme.colors.secondary,
  },
  text: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.white,
    textAlign: "center",
  },
}))

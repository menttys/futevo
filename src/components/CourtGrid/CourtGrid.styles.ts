import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  court: {
    aspectRatio: 1.4,
    borderWidth: 3,
    borderColor: theme.colors.dark,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
  },
  net: {
    height: 22,
    marginVertical: 4,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  netLabel: {
    fontFamily: "Sora-Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: theme.colors.light,
  },
  sideLabel: {
    position: "absolute",
    top: 4,
    left: 8,
    zIndex: 1,
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: (selected: boolean) => ({
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: selected ? theme.colors.primary : "transparent",
  }),
}))

import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  grid: {
    gap: 8,
  },
  // Same height as the court-mode net strip.
  net: {
    height: 8,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  // Cream tiles; the chosen zone turns brand yellow and carries the mark.
  cell: (selected: boolean, pressed: boolean) => ({
    flex: 1,
    height: 92,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: selected ? theme.colors.primary : theme.colors.card,
    boxShadow: selected ? undefined : theme.shadows.card,
    borderWidth: selected ? 1 : 0,
    borderColor: theme.colors.text,
    opacity: pressed ? 0.85 : 1,
  }),
  number: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 13.3,
    color: theme.colors.textMuted,
  },
}))

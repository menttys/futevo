import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  // Three to a row; the chosen attack is blue-black with cream text.
  tile: (selected: boolean, pressed: boolean) => ({
    flexBasis: "30%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 13,
    borderRadius: theme.radius.md,
    backgroundColor: selected ? theme.colors.dark : theme.colors.card,
    boxShadow: selected ? undefined : theme.shadows.card,
    opacity: pressed ? 0.85 : 1,
  }),
  label: (selected: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 13.5,
    color: selected ? theme.colors.white : theme.colors.text,
    textAlign: "center",
  }),
}))

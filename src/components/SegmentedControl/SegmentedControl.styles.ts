import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  track: {
    flexDirection: "row",
    gap: 4,
    padding: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.wash,
  },
  option: (selected: boolean) => ({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.primary : "transparent",
  }),
  label: {
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: theme.colors.text,
  },
}))

import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  tile: (selected: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 12,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.butter : theme.colors.card,
    boxShadow: selected ? undefined : theme.shadows.card,
    borderWidth: selected ? 1.5 : 0,
    borderColor: theme.colors.dark,
  }),
  name: {
    flex: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: theme.colors.text,
  },
}))

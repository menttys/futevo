import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  chip: (selected: boolean) => ({
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.dark : theme.colors.wash,
  }),
  label: (selected: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: selected ? theme.colors.white : theme.colors.text,
  }),
}))

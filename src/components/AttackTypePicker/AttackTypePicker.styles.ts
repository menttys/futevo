import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  chip: (selected: boolean) => ({
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: selected ? theme.colors.primary : theme.colors.grey300,
    backgroundColor: selected ? theme.colors.primary : "transparent",
  }),
  chipLabel: (selected: boolean) => ({
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: selected ? theme.colors.dark : theme.colors.text,
  }),
}))

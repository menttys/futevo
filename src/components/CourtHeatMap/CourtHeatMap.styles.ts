import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    gap: theme.spacing.md,
  },
  title: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  filterGroup: {
    gap: theme.spacing.xs,
  },
  filterLabel: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  chip: (selected: boolean) => ({
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: selected ? theme.colors.primary : theme.colors.grey300,
    backgroundColor: selected ? theme.colors.primary : "transparent",
  }),
  chipLabel: (selected: boolean) => ({
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.xs,
    color: selected ? theme.colors.dark : theme.colors.text,
  }),
  courtWrap: {
    width: "100%",
    maxWidth: 200,
    alignSelf: "center",
  },
  court: {
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: theme.colors.dark,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    alignItems: "center",
    justifyContent: "center",
  },
  heat: (intensity: number) => ({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.secondary,
    opacity: intensity,
  }),
  count: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.dark,
  },
  net: {
    height: 2,
    backgroundColor: theme.colors.dark,
  },
  summary: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
}))

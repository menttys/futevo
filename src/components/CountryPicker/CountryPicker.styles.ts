import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  label: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.xs,
    color: theme.colors.grey300,
    marginBottom: theme.spacing.xs,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.grey600,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  fieldText: {
    flex: 1,
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
  fieldTextEmpty: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey300,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(27,26,24,0.4)",
  },
  sheet: {
    height: "70%",
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },
  overlayWeb: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(27,26,24,0.5)",
    padding: theme.spacing.md,
  },
  floating: {
    width: "100%",
    maxWidth: 420,
    height: "70%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    boxShadow: "0 12px 40px rgba(27,26,24,0.35)",
  },
  search: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  list: {
    flex: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  optionActive: {
    backgroundColor: theme.colors.grey600,
  },
  optionText: {
    flex: 1,
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
}))

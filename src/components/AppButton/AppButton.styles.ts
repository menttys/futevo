import { StyleSheet } from "react-native-unistyles"

import type { AppButtonVariant } from "./AppButton.d"

export const styles = StyleSheet.create((theme) => {
  const background: Record<AppButtonVariant, string> = {
    primary: theme.colors.primary,
    cream: theme.colors.onYellow,
    outline: "transparent",
    dark: theme.colors.dark,
    wash: theme.colors.wash,
    danger: "transparent",
    away: theme.colors.purple,
    magenta: theme.colors.danger,
  }
  const foreground: Record<AppButtonVariant, string> = {
    primary: theme.colors.text,
    cream: theme.colors.text,
    outline: theme.colors.text,
    dark: theme.colors.white,
    wash: theme.colors.text,
    danger: theme.colors.danger,
    away: theme.colors.white,
    magenta: theme.colors.white,
  }
  return {
    button: (variant: AppButtonVariant, disabled: boolean, pressed: boolean) => ({
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      minHeight: 48,
      paddingHorizontal: 18,
      paddingVertical: 13,
      borderRadius: theme.radius.full,
      backgroundColor: background[variant],
      borderWidth: variant === "outline" || variant === "danger" ? 1.5 : 0,
      borderColor: variant === "danger" ? theme.colors.danger : theme.colors.dark,
      opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
    }),
    label: (variant: AppButtonVariant, display: boolean) => ({
      fontFamily: display ? theme.fonts.displayBold : theme.fonts.semibold,
      fontSize: display ? 13 : 14,
      letterSpacing: display ? -0.2 : 0,
      color: foreground[variant],
    }),
  }
})

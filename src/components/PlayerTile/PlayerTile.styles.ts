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
  badge: (color: string) => ({
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: color,
    borderRadius: theme.radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  }),
  // Readable on either slot colour: yellow text on blue-black, blue-black on yellow.
  badgeText: (color: string) => ({
    fontFamily: theme.fonts.bold,
    fontSize: 10,
    color: color === theme.colors.dark ? theme.colors.primary : theme.colors.text,
  }),
}))

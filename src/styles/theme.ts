// Futevo colour system (Colour Guide): brand yellow and blue-black carry the
// product; deep purple is the Away team only; the rest is warm neutral.
const palette = {
  sun: "#FFD400", // brand yellow: tab bar, primary buttons, live cards
  ink: "#0A111F", // blue-black: text, Home team, dark buttons
  purple: "#4A2A96", // deep purple: Away team only
  purplePressed: "#3B2178",
  softYellow: "#FFE680", // live scoreboard
  butter: "#FFEFB0", // selected rows, result tiles, W badge
  lavender: "#E9E3F6", // Away tint
  cream: "#FFFDF6", // cards and rows
  onYellow: "#FFFBF2", // pills and buttons sitting on brand yellow
  warmWhite: "#FBF7EE", // page base under the mesh
  creamText: "#FFFAF0", // text on blue-black or purple
  stone: "#E9E7E2", // L badge, neutral circles
  wash: "rgba(10,17,31,0.06)", // search fields, chips, inset tiles
  washStrong: "rgba(10,17,31,0.12)", // selected chip on yellow, hairlines
  onDarkWash: "rgba(255,255,255,0.14)", // fields and pills on a blue-black card
  onDarkMuted: "rgba(255,250,240,0.6)", // placeholders on a blue-black card
  muted: "rgba(10,17,31,0.72)", // secondary text and labels
  iconMuted: "rgba(10,17,31,0.62)", // inactive icons
  iconIdle: "rgba(10,17,31,0.55)", // inactive desktop menu icons (--fv-icon-idle)
  danger: "#C2185B",
  dangerAlt: "#D92D20",
  success: "#1E9E62", // "ready" status dot
  landingTint: "#FFF4CC", // court mode: the half a picked-up player can land on
  // Court-mode net, left to right: mid-purple, lavender, sky blue, mint, soft yellow, yellow.
  netPurple: "#8C6FDC",
  netLavender: "#BBA9F1",
  netSky: "#A7DBF5",
  netMint: "#BDEFD5",
} as const

// Court-mode net stops. Exported on their own because Unistyles registers the theme natively
// once at startup, so components read this constant rather than an array off the runtime theme.
export const NET_GRADIENT: readonly string[] = [
  palette.netPurple,
  palette.netLavender,
  palette.netSky,
  palette.netMint,
  palette.softYellow,
  palette.sun,
]

export const theme = {
  colors: {
    // brand
    primary: palette.sun,
    secondary: palette.softYellow,
    purple: palette.purple,
    purplePressed: palette.purplePressed,
    indigo: palette.ink,

    // tints
    softYellow: palette.softYellow,
    butter: palette.butter,
    lavender: palette.lavender,
    onYellow: palette.onYellow,
    stone: palette.stone,
    wash: palette.wash,
    washStrong: palette.washStrong,
    onDarkWash: palette.onDarkWash,
    onDarkMuted: palette.onDarkMuted,

    // surfaces
    background: palette.warmWhite,
    card: palette.cream,
    surface: palette.cream,
    surfaceBright: palette.cream,

    // text
    text: palette.ink,
    textMuted: palette.muted,
    iconMuted: palette.iconMuted,
    iconIdle: palette.iconIdle,

    // base
    dark: palette.ink,
    light: palette.warmWhite,

    // extended brand
    violet: palette.purple,
    navy: palette.ink,
    primaryDark: palette.purplePressed,

    // utility
    black: palette.ink, // never pure black
    white: palette.creamText,

    // danger
    danger: palette.danger,
    dangerAlt: palette.dangerAlt,
    success: palette.success,

    // court mode
    landingTint: palette.landingTint,

    profileGradientStart: palette.sun,

    // neutral ramp (blue-black based)
    grey100: palette.warmWhite,
    grey200: palette.washStrong,
    grey300: palette.iconMuted,
    grey400: palette.muted,
    grey500: palette.iconMuted,
    grey600: palette.wash,
    grey700: palette.stone,
    // Dark court cells in the gamified match. Not in the nine-colour palette; kept from before the redesign.
    grey800: "#3A3834",
    grey900: palette.ink,

    // team colours: Home blue-black, Away deep purple
    teamA: palette.ink,
    teamB: palette.purple,

    // colour-coding for cards and players: brand tints only
    cardPalette: [palette.sun, palette.softYellow, palette.butter, palette.lavender] as string[],
    playerPalette: [palette.sun, palette.butter, palette.lavender, palette.softYellow] as string[],
  },
  fonts: {
    display: "Unbounded_800ExtraBold", // wordmark, scores, screen titles
    displayBold: "Unbounded_700Bold", // section titles, card titles, buttons
    regular: "Figtree_400Regular",
    semibold: "Figtree_600SemiBold",
    bold: "Figtree_700Bold",
  },
  shadows: {
    // Cream cards and rows: no border, a soft shadow.
    card: "0px 2px 14px rgba(10,17,31,0.07)",
    bar: "0px 8px 24px rgba(10,17,31,0.14)",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // Screen side gutter from the designs.
  gutter: 18,
  typography: {
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    weight: {
      regular: "400" as const,
      semibold: "600" as const,
      bold: "700" as const,
      black: "900" as const,
    },
  },
  radius: {
    sm: 8,
    md: 12,
    card: 14,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  // Standard touch-target padding for small pressables.
  // sm: icons inside dense lists · md: default · lg: small standalone icon buttons
  hitSlop: {
    sm: { top: 8, bottom: 8, left: 8, right: 8 },
    md: { top: 12, bottom: 12, left: 12, right: 12 },
    lg: { top: 16, bottom: 16, left: 16, right: 16 },
  },
}

export type AppTheme = typeof theme

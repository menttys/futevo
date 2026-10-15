// Palette: sun-yellow, ink and warm paper — light, flat, sporty.
const palette = {
  sun: "#FFD400", // brand yellow (primary)
  sunDeep: "#857520", // olive gold, text on light surfaces
  ink: "#1B1A18", // near-black: text, dark cards, tab bar
  paper: "#F5F2EF", // app background
  white: "#FFFFFF", // cards
  stone: "#E8E6E1", // neutral badges, disabled fills
  coral: "#FF8A6B",
  lime: "#B7DC6E",
  danger: "#E5484D",
} as const

export const theme = {
  colors: {
    // brand
    primary: palette.sun,
    secondary: palette.coral,
    purple: palette.sunDeep,
    indigo: palette.ink,

    // surfaces
    background: palette.paper,
    card: palette.white,
    surface: palette.white,

    // text
    text: palette.ink,
    textMuted: "#8A857D",

    // base
    dark: palette.ink,
    light: palette.paper,

    // extended brand
    violet: palette.sunDeep,
    navy: palette.ink,
    primaryDark: palette.sunDeep,

    // utility
    black: "#000000",
    white: palette.white,

    // danger
    danger: palette.danger,
    dangerAlt: "#D92D20",

    // settings surfaces
    surfaceBright: palette.white,
    profileGradientStart: palette.sun,

    // grey scale (warm light ramp: 100 lightest -> 900 ink)
    grey100: palette.paper,
    grey200: "#ECE8E3",
    grey300: "#B9B4AB",
    grey400: "#A39E95",
    grey500: "#8A857D",
    grey600: palette.stone,
    grey700: "#ECE8E3",
    grey800: "#3A3834",
    grey900: palette.ink,

    // team colors for the scoreboard
    teamA: palette.ink,
    teamB: palette.sun,

    // Cycling palettes used to color-code cards & players
    cardPalette: [palette.sun, palette.stone, palette.coral, palette.lime] as string[],
    playerPalette: [palette.sun, palette.coral, palette.lime, palette.stone] as string[],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
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

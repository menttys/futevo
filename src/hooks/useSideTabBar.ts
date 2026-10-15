import { useWindowDimensions } from "react-native"

import { IS_WEB, WEB_SIDE_BAR_MIN_WIDTH } from "@/constants/Platform"

// On web the tab bar is a vertical sidebar only on wide viewports; on phone-sized
// viewports it falls back to the native-style floating bar at the bottom.
export function useSideTabBar() {
  const { width } = useWindowDimensions()
  return IS_WEB && width >= WEB_SIDE_BAR_MIN_WIDTH
}

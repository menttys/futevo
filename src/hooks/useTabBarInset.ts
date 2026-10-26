import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"

import { useSideTabBar } from "@/hooks/useSideTabBar"

// The bottom tab bar floats over the screen, so scrollable content needs this much
// extra bottom padding to stay reachable. The side bar doesn't overlap anything.
export function useTabBarInset() {
  const height = useBottomTabBarHeight()
  const sideBar = useSideTabBar()
  return sideBar ? 0 : height
}

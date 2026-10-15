import React from "react"
import { View } from "react-native"

import {
  Check as _Check,
  ChevronDown as _ChevronDown,
  ChevronLeft as _ChevronLeft,
  ChevronRight as _ChevronRight,
  House as _House,
  LayoutDashboard as _LayoutDashboard,
  LogOut as _LogOut,
  Pencil as _Pencil,
  Plus as _Plus,
  RotateCcw as _RotateCcw,
  Search as _Search,
  Settings as _Settings,
  Trash2 as _Trash2,
  Trophy as _Trophy,
  User as _User,
  Users as _Users,
  X as _X,
  type LucideIcon,
  type LucideProps,
} from "lucide-react-native"

function wrap(Icon: LucideIcon): LucideIcon {
  const Wrapped = React.forwardRef<any, LucideProps>((props, _ref) => (
    <View pointerEvents="none">
      <Icon {...props} />
    </View>
  ))
  Wrapped.displayName = (Icon as any).displayName
  return Wrapped as unknown as LucideIcon
}

export const Check = wrap(_Check)
export const ChevronDown = wrap(_ChevronDown)
export const ChevronLeft = wrap(_ChevronLeft)
export const ChevronRight = wrap(_ChevronRight)
export const House = wrap(_House)
export const LayoutDashboard = wrap(_LayoutDashboard)
export const LogOut = wrap(_LogOut)
export const Pencil = wrap(_Pencil)
export const Plus = wrap(_Plus)
export const RotateCcw = wrap(_RotateCcw)
export const Search = wrap(_Search)
export const Settings = wrap(_Settings)
export const Trash2 = wrap(_Trash2)
export const Trophy = wrap(_Trophy)
export const User = wrap(_User)
export const Users = wrap(_Users)
export const X = wrap(_X)

export type { LucideIcon, LucideProps }

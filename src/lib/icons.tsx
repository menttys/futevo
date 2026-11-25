import React from "react"
import { View } from "react-native"

import {
  ArrowUUpLeft as _ArrowUUpLeft,
  Camera as _Camera,
  CaretDown as _CaretDown,
  CaretLeft as _CaretLeft,
  CaretRight as _CaretRight,
  Check as _Check,
  Flag as _Flag,
  GoogleLogo as _GoogleLogo,
  HandGrabbing as _HandGrabbing,
  House as _House,
  type Icon,
  type IconProps,
  ListBullets as _ListBullets,
  MagnifyingGlass as _MagnifyingGlass,
  PencilSimple as _PencilSimple,
  Plus as _Plus,
  ShareNetwork as _ShareNetwork,
  SidebarSimple as _SidebarSimple,
  SignOut as _SignOut,
  SlidersHorizontal as _SlidersHorizontal,
  SquareSplitVertical as _SquareSplitVertical,
  Trash as _Trash,
  Trophy as _Trophy,
  User as _User,
  Users as _Users,
  Warning as _Warning,
  WifiSlash as _WifiSlash,
  X as _X,
} from "phosphor-react-native"

// Phosphor · Regular. Active tab icons switch to `weight="fill"` at the call site.
export type AppIcon = Icon
export type AppIconProps = IconProps

function wrap(Glyph: Icon): Icon {
  const Wrapped = React.forwardRef<any, IconProps>((props, _ref) => (
    <View pointerEvents="none">
      <Glyph weight="regular" {...props} />
    </View>
  ))
  Wrapped.displayName = (Glyph as any).displayName
  return Wrapped as unknown as Icon
}

// Tab bar
export const House = wrap(_House)
export const ListBullets = wrap(_ListBullets)
export const Users = wrap(_Users)
export const SlidersHorizontal = wrap(_SlidersHorizontal)

// Actions and navigation
export const Camera = wrap(_Camera)
export const Check = wrap(_Check)
export const ChevronDown = wrap(_CaretDown)
export const ChevronLeft = wrap(_CaretLeft)
export const ChevronRight = wrap(_CaretRight)
export const CourtMode = wrap(_SquareSplitVertical)
export const Flag = wrap(_Flag)
export const SidebarSimple = wrap(_SidebarSimple)
export const GoogleLogo = wrap(_GoogleLogo)
export const HandGrab = wrap(_HandGrabbing)
export const LogOut = wrap(_SignOut)
export const Pencil = wrap(_PencilSimple)
export const Plus = wrap(_Plus)
export const Search = wrap(_MagnifyingGlass)
export const Share = wrap(_ShareNetwork)
export const Trash2 = wrap(_Trash)
export const Trophy = wrap(_Trophy)
export const Undo = wrap(_ArrowUUpLeft)
export const RotateCcw = Undo
export const User = wrap(_User)
export const Warning = wrap(_Warning)
export const WifiSlash = wrap(_WifiSlash)
export const X = wrap(_X)

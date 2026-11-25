import React from "react"
import { View } from "react-native"

import type { Icon, IconProps } from "phosphor-react-native"
import { ArrowUUpLeft as _ArrowUUpLeft } from "phosphor-react-native/src/icons/ArrowUUpLeft"
import { Camera as _Camera } from "phosphor-react-native/src/icons/Camera"
import { CaretDown as _CaretDown } from "phosphor-react-native/src/icons/CaretDown"
import { CaretLeft as _CaretLeft } from "phosphor-react-native/src/icons/CaretLeft"
import { CaretRight as _CaretRight } from "phosphor-react-native/src/icons/CaretRight"
import { Check as _Check } from "phosphor-react-native/src/icons/Check"
import { Flag as _Flag } from "phosphor-react-native/src/icons/Flag"
import { GoogleLogo as _GoogleLogo } from "phosphor-react-native/src/icons/GoogleLogo"
import { HandGrabbing as _HandGrabbing } from "phosphor-react-native/src/icons/HandGrabbing"
import { House as _House } from "phosphor-react-native/src/icons/House"
import { ListBullets as _ListBullets } from "phosphor-react-native/src/icons/ListBullets"
import { MagnifyingGlass as _MagnifyingGlass } from "phosphor-react-native/src/icons/MagnifyingGlass"
import { PencilSimple as _PencilSimple } from "phosphor-react-native/src/icons/PencilSimple"
import { Plus as _Plus } from "phosphor-react-native/src/icons/Plus"
import { ShareNetwork as _ShareNetwork } from "phosphor-react-native/src/icons/ShareNetwork"
import { SidebarSimple as _SidebarSimple } from "phosphor-react-native/src/icons/SidebarSimple"
import { SignOut as _SignOut } from "phosphor-react-native/src/icons/SignOut"
import { SlidersHorizontal as _SlidersHorizontal } from "phosphor-react-native/src/icons/SlidersHorizontal"
import { SquareSplitVertical as _SquareSplitVertical } from "phosphor-react-native/src/icons/SquareSplitVertical"
import { Trash as _Trash } from "phosphor-react-native/src/icons/Trash"
import { Trophy as _Trophy } from "phosphor-react-native/src/icons/Trophy"
import { User as _User } from "phosphor-react-native/src/icons/User"
import { Users as _Users } from "phosphor-react-native/src/icons/Users"
import { Warning as _Warning } from "phosphor-react-native/src/icons/Warning"
import { WifiSlash as _WifiSlash } from "phosphor-react-native/src/icons/WifiSlash"
import { X as _X } from "phosphor-react-native/src/icons/X"

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

import type { MMKV } from "react-native-mmkv"
import { createMMKV } from "react-native-mmkv"
import type { StateStorage } from "zustand/middleware"

const MMKVstorage: MMKV = createMMKV()

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return MMKVstorage.set(name, value)
  },
  getItem: (name) => {
    const value = MMKVstorage.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return MMKVstorage.remove(name)
  },
}

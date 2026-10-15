import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { CountryPickerProps } from "./CountryPicker.d"
import { styles } from "./CountryPicker.styles"

import { IS_WEB } from "@/constants/Platform"
import { useLanguage } from "@/i18n"
import { getCountries, getCountryName, getFlagEmoji } from "@/utils/countries"

export function CountryPicker({ label, value, onChange }: CountryPickerProps) {
  const { t, currentLanguage } = useLanguage()
  const { theme } = useUnistyles()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const countries = useMemo(() => getCountries(currentLanguage), [currentLanguage])

  const display = value
    ? `${getFlagEmoji(value)} ${getCountryName(value, currentLanguage)}`
    : t("players.profile.noCountry")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? countries.filter((c) => c.name.toLowerCase().includes(q)) : countries
  }, [countries, query])

  const items = useMemo(
    () => [
      ...(query.trim() ? [] : [{ code: "", name: t("players.profile.noCountry"), flag: "" }]),
      ...filtered,
    ],
    [filtered, query, t],
  )

  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef<FlatList<(typeof items)[number]>>(null)

  useEffect(() => {
    if (!IS_WEB || activeIndex < 0 || activeIndex >= items.length) return
    listRef.current?.scrollToIndex({ index: activeIndex, viewPosition: 0.5, animated: false })
  }, [activeIndex, items.length])

  const close = () => {
    setOpen(false)
    setQuery("")
    setActiveIndex(-1)
  }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setActiveIndex(value.trim() ? 0 : -1)
  }

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (!IS_WEB) return
    const { key } = e.nativeEvent
    if (key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, items.length - 1))
    } else if (key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (key === "Enter" && items[activeIndex]) {
      e.preventDefault()
      select(items[activeIndex].code)
    }
  }

  const select = (code: string) => {
    onChange(code)
    close()
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)} activeOpacity={0.85}>
        <Text style={[styles.fieldText, !value && styles.fieldTextEmpty]}>{display}</Text>
      </TouchableOpacity>
      <Modal
        visible={open}
        transparent
        animationType={IS_WEB ? "fade" : "slide"}
        onRequestClose={close}
      >
        <TouchableOpacity
          style={IS_WEB ? styles.overlayWeb : styles.overlay}
          activeOpacity={1}
          onPress={close}
        >
          <View style={IS_WEB ? styles.floating : styles.sheet} onStartShouldSetResponder={() => true}>
            <TextInput
              style={styles.search}
              value={query}
              onChangeText={handleQueryChange}
              onKeyPress={handleKeyPress}
              placeholder={t("players.profile.searchCountry")}
              placeholderTextColor={theme.colors.textMuted}
              autoFocus={IS_WEB}
            />
            <FlatList
              ref={listRef}
              data={items}
              onScrollToIndexFailed={() => {}}
              keyExtractor={(item) => item.code || "none"}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[styles.option, index === activeIndex && styles.optionActive]} onPress={() => select(item.code)}>
                  <Text style={styles.optionText}>
                    {item.flag ? `${item.flag} ` : ""}
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

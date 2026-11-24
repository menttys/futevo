import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
  // 0 = closed, 1 = open. Drives the scrim fade and the sheet slide together, on the same
  // timing as the stack sheets, so the backdrop no longer slides with the content.
  const progress = useRef(new Animated.Value(0)).current
  const { height: screenHeight } = useWindowDimensions()
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

  useEffect(() => {
    if (!open) return
    Animated.timing(progress, {
      toValue: 1,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: !IS_WEB,
    }).start()
  }, [open, progress])

  // Slides the sheet down and fades the scrim, then unmounts the modal.
  const close = () => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: !IS_WEB,
    }).start(({ finished }) => {
      if (!finished) return
      setOpen(false)
      setQuery("")
      setActiveIndex(-1)
    })
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
      <Modal visible={open} transparent animationType="none" onRequestClose={close}>
        <TouchableOpacity
          style={IS_WEB ? styles.overlayWeb : styles.overlay}
          activeOpacity={1}
          onPress={close}
        >
          <Animated.View pointerEvents="none" style={[styles.scrim, { opacity: progress }]} />
          <Animated.View
            style={[
              IS_WEB ? styles.floating : styles.sheet,
              IS_WEB
                ? { opacity: progress }
                : {
                    transform: [
                      {
                        translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [screenHeight, 0] }),
                      },
                    ],
                  },
            ]}
            onStartShouldSetResponder={() => true}
          >
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
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

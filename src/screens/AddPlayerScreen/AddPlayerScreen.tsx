import React, { useLayoutEffect } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { NewPlayerForm } from "@/forms/NewPlayerForm"
import { usePlayers } from "@/hooks/usePlayers"
import { useLanguage } from "@/i18n"
import { X } from "@/lib/icons"
import type { PlayersStackParamList } from "@/navigation/types/navigation"
import { showToast } from "@/store/toastState"

import { styles } from "./AddPlayerScreen.styles"

export function AddPlayerScreen() {
  const { t } = useLanguage()
  const { theme } = useUnistyles()
  const { savePlayer } = usePlayers()
  const navigation = useNavigation<StackNavigationProp<PlayersStackParamList, "AddPlayer">>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel={t("common.close")}
          hitSlop={8}
        >
          <X size={24} color={theme.colors.dark} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, t, theme.colors.dark])

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formWrapper}>
        <NewPlayerForm
          onSubmit={(player) => {
            savePlayer(player)
            showToast(t("players.added"))
            navigation.goBack()
          }}
        />
      </View>
    </ScrollView>
  )
}

import React from "react"
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { IS_IOS } from "@/constants/Platform"
import { NewPlayerForm } from "@/forms/NewPlayerForm"
import { usePlayers } from "@/hooks/usePlayers"
import { useLanguage } from "@/i18n"
import { X } from "@/lib/icons"
import type { PlayersStackParamList } from "@/navigation/types/navigation"
import { showToast } from "@/store/toastState"

import { styles } from "./AddPlayerScreen.styles"

// A sheet over the players list.
export function AddPlayerScreen() {
  const { t } = useLanguage()
  const { theme } = useUnistyles()
  const { savePlayer } = usePlayers()
  const navigation = useNavigation<StackNavigationProp<PlayersStackParamList, "AddPlayer">>()

  return (
    <KeyboardAvoidingView style={styles.root} behavior={IS_IOS ? "padding" : undefined}>
      <Pressable
        style={styles.dismissArea}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel={t("common.close")}
      />
      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            {t("screens.addPlayer")}
          </Text>
          <Pressable
            style={styles.close}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel={t("common.close")}
            hitSlop={8}
          >
            <X size={18} color={theme.colors.text} />
          </Pressable>
        </View>
        <NewPlayerForm
          onSubmit={(player) => {
            savePlayer(player)
            showToast(t("players.added"))
            navigation.goBack()
          }}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

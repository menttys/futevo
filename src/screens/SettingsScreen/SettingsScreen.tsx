import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { PlayerAvatar } from "@/components/PlayerAvatar"
import { signout } from "@/hooks/useFirebase"
import { LogOut } from "@/lib/icons"
import { useUserStore } from "@/store/userState"

import { styles } from "./SettingsScreen.styles"

export function SettingsScreen() {
  const { theme } = useUnistyles()
  const user = useUserStore((s) => s.user)

  return (
    <View style={styles.root}>
      {user ? (
        <View style={styles.profileRow}>
          <PlayerAvatar
            player={{ id: user.id, userId: user.id, name: user.displayName ?? "You" }}
            size={56}
          />
          <View>
            <Text style={styles.name}>{user.displayName ?? "Player"}</Text>
            {user.email ? <Text style={styles.email}>{user.email}</Text> : null}
          </View>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => signout().catch(console.error)}
        activeOpacity={0.85}
      >
        <LogOut size={18} color={theme.colors.danger} />
        <Text style={styles.signOutLabel}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

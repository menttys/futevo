import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { PlayerAvatar } from "@/components/PlayerAvatar"
import { DEFAULT_TARGET_SCORE } from "@/constants/App"
import { findEntry } from "@/utils/tournament"
import { useLanguage } from "@/i18n"

import type { NewMatchFormProps } from "./NewMatchForm.d"
import { styles } from "./NewMatchForm.styles"

const TEAM_LABELS = ["A1", "A2", "B1", "B2"]

const NEW_TOURNAMENT = "new"

const today = () => new Date().toISOString().slice(0, 10)

export function NewMatchForm({ players, tournaments, onSubmit }: NewMatchFormProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [targetScore, setTargetScore] = useState(DEFAULT_TARGET_SCORE)
  const [showDetails, setShowDetails] = useState(false)
  // undefined = friendly match, NEW_TOURNAMENT = create inline, otherwise a tournament id
  const [tournamentChoice, setTournamentChoice] = useState<string | undefined>()
  const [newName, setNewName] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDate, setNewDate] = useState(today)
  const [round, setRound] = useState("")
  const [clubA, setClubA] = useState("")
  const [clubB, setClubB] = useState("")

  const togglePlayer = (playerId: string) => {
    setSelectedIds((current) => {
      if (current.includes(playerId)) return current.filter((id) => id !== playerId)
      if (current.length >= 4) return current
      return [...current, playerId]
    })
  }

  const isNew = tournamentChoice === NEW_TOURNAMENT
  const tournament = tournaments.find((t) => t.id === tournamentChoice)
  const teamA: [string, string] | undefined =
    selectedIds.length === 4 ? [selectedIds[0], selectedIds[1]] : undefined
  const teamB: [string, string] | undefined =
    selectedIds.length === 4 ? [selectedIds[2], selectedIds[3]] : undefined

  // A dupla already registered in the tournament keeps its club (locked).
  const entryA = teamA ? findEntry(tournament, teamA) : undefined
  const entryB = teamB ? findEntry(tournament, teamB) : undefined
  const inTournament = isNew || !!tournament

  const canSubmit =
    selectedIds.length === 4 && targetScore > 0 && (!isNew || newName.trim().length > 0)

  const handleSubmit = () => {
    if (!canSubmit || !teamA || !teamB) return
    onSubmit({
      teamA,
      teamB,
      targetScore,
      tournamentId: tournament?.id,
      newTournament: isNew
        ? {
            name: newName.trim(),
            location: newLocation.trim() || undefined,
            date: newDate.trim() || undefined,
          }
        : undefined,
      round: inTournament ? round.trim() || undefined : undefined,
      clubA: inTournament && !entryA ? clubA.trim() || undefined : undefined,
      clubB: inTournament && !entryB ? clubB.trim() || undefined : undefined,
    })
  }

  const renderClub = (
    label: string,
    locked: boolean,
    lockedClub: string | undefined,
    value: string,
    onChange: (v: string) => void
  ) =>
    locked ? (
      <Text style={styles.lockedClub}>
        {t("newMatch.clubLocked", { team: label, club: lockedClub ?? t("newMatch.noClub") })}
      </Text>
    ) : (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={t("newMatch.clubOptional", { team: label })}
        placeholderTextColor={theme.colors.textMuted}
      />
    )

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.sectionLabel}>
          {t("newMatch.pickPlayers")}
        </Text>
        {players.length === 0 ? (
          <Text style={styles.hint}>{t("newMatch.addPlayersFirst")}</Text>
        ) : (
          <View style={styles.playersGrid}>
            {players.map((player) => {
              const index = selectedIds.indexOf(player.id)
              const selected = index !== -1
              return (
                <TouchableOpacity
                  key={player.id}
                  style={styles.playerOption}
                  onPress={() => togglePlayer(player.id)}
                >
                  <View>
                    <PlayerAvatar name={player.name} selected={selected} />
                    {selected ? (
                      <View
                        style={styles.badge(index < 2 ? theme.colors.teamA : theme.colors.teamB)}
                      >
                        <Text style={styles.badgeText}>{TEAM_LABELS[index]}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.playerName} numberOfLines={1}>
                    {player.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </View>

      <View>
        <Text style={styles.sectionLabel}>{t("newMatch.targetScore")}</Text>
        <View style={styles.scoreRow}>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => setTargetScore((s) => Math.max(1, s - 1))}
          >
            <Text style={styles.stepperLabel}>−</Text>
          </TouchableOpacity>
          <Text style={styles.scoreValue}>{targetScore}</Text>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => setTargetScore((s) => s + 1)}
          >
            <Text style={styles.stepperLabel}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.details}>
        <TouchableOpacity onPress={() => setShowDetails((v) => !v)} activeOpacity={0.7}>
          <Text style={styles.sectionLabel}>{t("newMatch.tournamentOptional")} {showDetails ? "▴" : "▾"}</Text>
        </TouchableOpacity>

        {showDetails ? (
          <View style={styles.detailsBody}>
            <View style={styles.chipRow}>
              <TouchableOpacity
                style={styles.chip(tournamentChoice === undefined)}
                onPress={() => setTournamentChoice(undefined)}
              >
                <Text style={styles.chipLabel}>{t("common.none")}</Text>
              </TouchableOpacity>
              {tournaments.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={styles.chip(tournamentChoice === t.id)}
                  onPress={() => setTournamentChoice(t.id)}
                >
                  <Text style={styles.chipLabel}>{t.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.chip(isNew)}
                onPress={() => setTournamentChoice(NEW_TOURNAMENT)}
              >
                <Text style={styles.chipLabel}>{t("newMatch.newTournament")}</Text>
              </TouchableOpacity>
            </View>

            {isNew ? (
              <>
                <TextInput
                  style={styles.input}
                  value={newName}
                  onChangeText={setNewName}
                  placeholder={t("newMatch.tournamentName")}
                  placeholderTextColor={theme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  value={newLocation}
                  onChangeText={setNewLocation}
                  placeholder={t("newMatch.locationOptional")}
                  placeholderTextColor={theme.colors.textMuted}
                />
                <TextInput
                  style={styles.input}
                  value={newDate}
                  onChangeText={setNewDate}
                  placeholder={t("newMatch.dateFormat")}
                  placeholderTextColor={theme.colors.textMuted}
                />
              </>
            ) : null}

            {inTournament ? (
              <>
                <TextInput
                  style={styles.input}
                  value={round}
                  onChangeText={setRound}
                  placeholder={t("newMatch.roundPlaceholder")}
                  placeholderTextColor={theme.colors.textMuted}
                />
                {teamA && teamB ? (
                  <>
                    {renderClub(t("common.teamWithSide", { side: "A" }), !!entryA, entryA?.club, clubA, setClubA)}
                    {renderClub(t("common.teamWithSide", { side: "B" }), !!entryB, entryB?.club, clubB, setClubB)}
                  </>
                ) : (
                  <Text style={styles.hint}>{t("newMatch.pickFourForClubs")}</Text>
                )}
              </>
            ) : null}
          </View>
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.submitButton(canSubmit)}
        onPress={handleSubmit}
        disabled={!canSubmit}
        activeOpacity={0.85}
      >
        <Text style={styles.submitLabel(canSubmit)}>{t("newMatch.start")}</Text>
      </TouchableOpacity>
    </View>
  )
}

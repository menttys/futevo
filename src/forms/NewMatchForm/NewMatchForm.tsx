import React, { Fragment, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { PlayerAvatar } from "@/components/PlayerAvatar"
import { PlayerPickerModal } from "@/components/PlayerPickerModal"
import { DEFAULT_TARGET_SCORE } from "@/constants/App"
import { useLanguage } from "@/i18n"
import { Pencil, Plus } from "@/lib/icons"
import { findEntry } from "@/utils/tournament"

import type { NewMatchFormProps } from "./NewMatchForm.d"
import { styles } from "./NewMatchForm.styles"

type Side = "A" | "B"

const SIDES: Side[] = ["A", "B"]

const NEW_TOURNAMENT = "new"

// Form width from which Team A and Team B sit side by side (A × B).
const SIDE_BY_SIDE_MIN_WIDTH = 460

const today = () => new Date().toISOString().slice(0, 10)

export function NewMatchForm({ players, tournaments, onSubmit }: NewMatchFormProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  // Index 0 = left side of the court, 1 = right side.
  const [teamAIds, setTeamAIds] = useState<(string | undefined)[]>([undefined, undefined])
  const [teamBIds, setTeamBIds] = useState<(string | undefined)[]>([undefined, undefined])
  const [targetScore, setTargetScore] = useState(DEFAULT_TARGET_SCORE)
  const [showDetails, setShowDetails] = useState(true)
  const [editingSide, setEditingSide] = useState<Side | undefined>()
  const [teamsWidth, setTeamsWidth] = useState(0)
  const sideBySide = teamsWidth >= SIDE_BY_SIDE_MIN_WIDTH
  const [picker, setPicker] = useState<{ side: Side; index: number } | undefined>()
  // undefined = friendly match, NEW_TOURNAMENT = create inline, otherwise a tournament id
  const [tournamentChoice, setTournamentChoice] = useState<string | undefined>()
  const [newName, setNewName] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDate, setNewDate] = useState(today)
  const [round, setRound] = useState("")
  const [clubA, setClubA] = useState("")
  const [clubB, setClubB] = useState("")

  const isNew = tournamentChoice === NEW_TOURNAMENT
  const tournament = tournaments.find((t) => t.id === tournamentChoice)
  const toTeam = (ids: (string | undefined)[]): [string, string] | undefined =>
    ids[0] && ids[1] ? [ids[0], ids[1]] : undefined
  const teamA = toTeam(teamAIds)
  const teamB = toTeam(teamBIds)
  const sideLabel = (index: number) => (index === 0 ? t("newMatch.left") : t("newMatch.right"))
  const slotIds = (side: Side) => (side === "A" ? teamAIds : teamBIds)
  const setSlot = (side: Side, index: number, id: string | undefined) => {
    const set = side === "A" ? setTeamAIds : setTeamBIds
    set((prev) => prev.map((v, i) => (i === index ? id : v)))
  }

  // A dupla already registered in the tournament keeps its club (locked).
  const entryA = teamA ? findEntry(tournament, teamA) : undefined
  const entryB = teamB ? findEntry(tournament, teamB) : undefined
  const inTournament = isNew || !!tournament

  const canSubmit = !!teamA && !!teamB && targetScore > 0 && (!isNew || newName.trim().length > 0)

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
      teamNameA: !inTournament ? clubA.trim() || undefined : undefined,
      teamNameB: !inTournament ? clubB.trim() || undefined : undefined,
    })
  }

  const knownClubs = Array.from(
    new Set((tournament?.entries ?? []).map((e) => e.club).filter((c): c is string => !!c))
  )

  // Tapping "Team A" / "Team B" turns the title into an input for the team name.
  // In a tournament the name is the dupla's club, locked once the dupla is registered.
  const renderTitle = (side: Side, color: string) => {
    const entry = side === "A" ? entryA : entryB
    const value = side === "A" ? clubA : clubB
    const onChange = side === "A" ? setClubA : setClubB
    const fallback = t("common.teamWithSide", { side })

    const editing = editingSide === side && !entry
    const close = () => setEditingSide(undefined)

    // Text and input share the same box, font and height so toggling never shifts the layout.
    return (
      <View style={styles.titleRow(editing)}>
        {editing ? (
          <TextInput
            style={styles.teamNameInput(color)}
            value={value}
            onChangeText={onChange}
            onBlur={close}
            onSubmitEditing={close}
            placeholder={fallback}
            placeholderTextColor={theme.colors.textMuted}
            autoFocus
            returnKeyType="done"
          />
        ) : (
          <TouchableOpacity
            style={styles.titleBox}
            onPress={() => setEditingSide(side)}
            disabled={!!entry}
            activeOpacity={0.6}
          >
            <Text style={styles.teamTitle(color)} numberOfLines={1}>
              {entry ? (entry.club ?? fallback) : value.trim() || fallback}
            </Text>
            {!entry ? <Pencil size={12} color={theme.colors.textMuted} /> : null}
          </TouchableOpacity>
        )}
        {editing && inTournament && knownClubs.length > 0 ? (
          // Floats over the slots instead of pushing them down.
          <View style={styles.suggestions}>
            {knownClubs.map((club) => (
              <TouchableOpacity
                key={club}
                style={styles.chip(value.trim() === club)}
                // onPressIn runs before the input's blur closes the editor.
                onPressIn={() => {
                  onChange(club)
                  close()
                }}
              >
                <Text style={styles.chipLabel}>{club}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.sectionLabel}>{t("newMatch.pickPlayers")}</Text>
        {players.length === 0 ? (
          <Text style={styles.hint}>{t("newMatch.addPlayersFirst")}</Text>
        ) : (
          <View
            style={styles.teams(sideBySide)}
            onLayout={(e) => setTeamsWidth(e.nativeEvent.layout.width)}
          >
            {SIDES.map((side) => {
              const ids = slotIds(side)
              const color = side === "A" ? theme.colors.teamA : theme.colors.teamB
              return (
                <Fragment key={side}>
                  {sideBySide && side === "B" ? <Text style={styles.versus}>×</Text> : null}
                  <View style={styles.teamCard(sideBySide)}>
                    {renderTitle(side, color)}
                    <View style={styles.slotsGrid}>
                      {[0, 1].map((index) => {
                        const player = players.find((p) => p.id === ids[index])
                        return (
                          <TouchableOpacity
                            key={index}
                            style={styles.slot(!!player)}
                            onPress={() => setPicker({ side, index })}
                            activeOpacity={0.7}
                          >
                            <View>
                              {player ? (
                                <PlayerAvatar
                                  name={player.name}
                                  photoUri={player.photoUri || undefined}
                                  selected
                                />
                              ) : (
                                <View style={styles.slotEmpty}>
                                  <Plus size={20} color={theme.colors.textMuted} />
                                </View>
                              )}
                            </View>
                            <View style={styles.badge(color)}>
                              <Text style={styles.badgeText(side)}>
                                {index === 0 ? t("newMatch.leftShort") : t("newMatch.rightShort")}
                              </Text>
                            </View>
                            <Text style={styles.playerName} numberOfLines={1}>
                              {player?.name ?? sideLabel(index)}
                            </Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  </View>
                </Fragment>
              )
            })}
          </View>
        )}
      </View>

      <PlayerPickerModal
        visible={picker !== undefined}
        title={
          picker
            ? t("newMatch.selectSidePlayer", {
                team: t("common.teamWithSide", { side: picker.side }),
                side: sideLabel(picker.index),
              })
            : undefined
        }
        players={players.filter((p) => {
          if (!picker) return true
          const taken = [
            ...teamAIds.map((id, i) =>
              picker.side === "A" && i === picker.index ? undefined : id
            ),
            ...teamBIds.map((id, i) =>
              picker.side === "B" && i === picker.index ? undefined : id
            ),
          ]
          return !taken.includes(p.id)
        })}
        selectedIds={
          picker
            ? slotIds(picker.side)
                .slice(picker.index, picker.index + 1)
                .filter((id): id is string => !!id)
            : []
        }
        max={1}
        slotLabels={[picker ? sideLabel(picker.index) : ""]}
        slotColor={() => (picker?.side === "B" ? theme.colors.teamB : theme.colors.teamA)}
        onChange={(ids) => picker && setSlot(picker.side, picker.index, ids[0])}
        onClose={() => setPicker(undefined)}
      />

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
          <Text style={styles.sectionLabel}>
            {t("newMatch.tournamentOptional")} {showDetails ? "▴" : "▾"}
          </Text>
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
                {!(teamA && teamB) ? (
                  <Text style={styles.hint}>{t("newMatch.pickFourForClubs")}</Text>
                ) : null}
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

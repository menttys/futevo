import React, { useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { SegmentedControl } from "@/components/SegmentedControl"
import { DEFAULT_TARGET_SCORE, DEFAULT_WIN_BY } from "@/constants/App"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { ChevronDown, Plus, Trophy } from "@/lib/icons"
import { useNewMatchStore } from "@/store/newMatchState"
import { firstName } from "@/utils/matchLabels"
import { findEntry } from "@/utils/tournament"

import type { NewMatchFormProps } from "./NewMatchForm.d"
import { styles } from "./NewMatchForm.styles"

type Side = "A" | "B"

const NEW_TOURNAMENT = "new"
const TARGET_SCORES = [12, 15, 18, 21]
const WIN_BY = [1, 2]

const today = () => new Date().toISOString().slice(0, 10)

// Two symmetric teams, then the rules. Blue-black card = Home, yellow card = Away.
export function NewMatchForm({ players, tournaments, onSubmit, onPickSlot }: NewMatchFormProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const tabBarInset = useTabBarInset()
  const wide = useSideTabBar()
  // Index 0 = left side of the court, 1 = right side. Written by the player picker screen.
  const teamAIds = useNewMatchStore((s) => s.teamA)
  const teamBIds = useNewMatchStore((s) => s.teamB)
  const [targetScore, setTargetScore] = useState(DEFAULT_TARGET_SCORE)
  const [winBy, setWinBy] = useState(DEFAULT_WIN_BY)
  const [showTournament, setShowTournament] = useState(false)
  // undefined = friendly match, NEW_TOURNAMENT = create inline, otherwise a tournament id
  const [tournamentChoice, setTournamentChoice] = useState<string | undefined>()
  const [newName, setNewName] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDate, setNewDate] = useState(today)
  const [round, setRound] = useState("")
  const [clubA, setClubA] = useState("")
  const [clubB, setClubB] = useState("")

  const isNew = tournamentChoice === NEW_TOURNAMENT
  const tournament = tournaments.find((tr) => tr.id === tournamentChoice)
  const toTeam = (ids: (string | undefined)[]): [string, string] | undefined =>
    ids[0] && ids[1] ? [ids[0], ids[1]] : undefined
  const teamA = toTeam(teamAIds)
  const teamB = toTeam(teamBIds)
  const slotLabel = (index: number) => (index === 0 ? t("newMatch.left") : t("newMatch.right"))
  const slotIds = (side: Side) => (side === "A" ? teamAIds : teamBIds)

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
      winBy,
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

  const tournamentLabel = isNew
    ? newName.trim() || t("newMatch.newTournamentLabel")
    : (tournament?.name ?? t("common.none"))

  const renderTeam = (side: Side) => {
    const home = side === "A"
    const entry = home ? entryA : entryB
    const value = home ? clubA : clubB
    const onChange = home ? setClubA : setClubB
    const ids = slotIds(side)

    return (
      <View style={[styles.teamCard(home), wide && styles.teamFlex]}>
        <FutevoMark
          size={120}
          rotate={16}
          color={home ? theme.colors.primary : theme.colors.dark}
          style={styles.watermark(home)}
        />
        <Text style={styles.teamLabel(home)}>{home ? t("newMatch.home") : t("newMatch.away")}</Text>
        {entry ? (
          <View style={styles.nameField(home)}>
            <Text style={styles.lockedName(home)} numberOfLines={1}>
              {entry.club ?? t("newMatch.noClub")}
            </Text>
          </View>
        ) : (
          <TextInput
            style={[styles.nameField(home), styles.nameInput(home)]}
            value={value}
            onChangeText={onChange}
            placeholder={
              inTournament ? t("newMatch.clubPlaceholder") : t("newMatch.teamNamePlaceholder")
            }
            placeholderTextColor={home ? theme.colors.onDarkMuted : theme.colors.textMuted}
            accessibilityLabel={home ? t("newMatch.home") : t("newMatch.away")}
            returnKeyType="done"
          />
        )}
        {inTournament && !entry && knownClubs.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestions}
          >
            {knownClubs.map((club) => (
              <Pressable
                key={club}
                accessibilityRole="button"
                onPress={() => onChange(club)}
                style={styles.suggestion(home, value.trim() === club)}
              >
                <Text style={styles.suggestionLabel(home, value.trim() === club)}>{club}</Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : null}
        <View style={styles.slots}>
          {[0, 1].map((index) => {
            const player = players.find((p) => p.id === ids[index])
            return (
              <Pressable
                key={index}
                accessibilityRole="button"
                accessibilityLabel={`${home ? t("newMatch.home") : t("newMatch.away")} · ${slotLabel(index)}`}
                onPress={() => onPickSlot(side, index)}
                style={({ pressed }) => styles.slot(home, pressed)}
              >
                {player ? (
                  <PlayerAvatar
                    name={player.name}
                    photoUri={player.photoUri || undefined}
                    size={32}
                    tone={home ? "yellow" : "dark"}
                  />
                ) : (
                  <View style={styles.slotEmpty(home)}>
                    <Plus size={16} color={home ? theme.colors.text : theme.colors.primary} />
                  </View>
                )}
                <View style={styles.slotText}>
                  <Text style={styles.slotSide(home)}>{slotLabel(index)}</Text>
                  <Text style={styles.slotName(home)} numberOfLines={1}>
                    {player ? firstName(player.name) : t("newMatch.selectPlayer")}
                  </Text>
                </View>
              </Pressable>
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, wide && styles.contentWide]}
        keyboardShouldPersistTaps="handled"
      >
        {players.length === 0 ? (
          <Text style={styles.hint}>{t("newMatch.addPlayersFirst")}</Text>
        ) : null}

        <View style={wide ? styles.teamsWide : styles.teams}>
          {renderTeam("A")}
          <View style={[styles.versus, wide && styles.versusWide]}>
            <FutevoMark size={18} />
            <Text style={styles.versusLabel}>{t("newMatch.vs")}</Text>
            <FutevoMark size={18} rotate={72} />
          </View>
          {renderTeam("B")}
        </View>

        <View style={styles.rules}>
          <View style={styles.ruleTarget}>
            <Text style={styles.fieldLabel}>{t("newMatch.targetScore")}</Text>
            <SegmentedControl
              options={TARGET_SCORES.map((s) => ({ value: s, label: String(s) }))}
              value={targetScore}
              onChange={setTargetScore}
            />
          </View>
          <View style={styles.ruleWinBy}>
            <Text style={styles.fieldLabel}>{t("newMatch.winBy")}</Text>
            <SegmentedControl
              options={WIN_BY.map((w) => ({ value: w, label: String(w) }))}
              value={winBy}
              onChange={setWinBy}
            />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: showTournament }}
          onPress={() => setShowTournament((v) => !v)}
          style={styles.tournamentCard}
        >
          <Trophy size={20} color={theme.colors.text} />
          <View style={styles.tournamentText}>
            <Text style={styles.tournamentEyebrow}>{t("newMatch.tournamentOptional")}</Text>
            <Text style={styles.tournamentValue} numberOfLines={1}>
              {tournamentLabel}
            </Text>
          </View>
          <ChevronDown size={18} color={theme.colors.text} />
        </Pressable>

        {showTournament ? (
          <View style={styles.tournamentBody}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              <Pressable
                style={styles.chip(tournamentChoice === undefined)}
                onPress={() => setTournamentChoice(undefined)}
              >
                <Text style={styles.chipLabel(tournamentChoice === undefined)}>
                  {t("common.none")}
                </Text>
              </Pressable>
              {tournaments.map((tr) => (
                <Pressable
                  key={tr.id}
                  style={styles.chip(tournamentChoice === tr.id)}
                  onPress={() => setTournamentChoice(tr.id)}
                >
                  <Text style={styles.chipLabel(tournamentChoice === tr.id)}>{tr.name}</Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.chip(isNew)}
                onPress={() => setTournamentChoice(NEW_TOURNAMENT)}
              >
                <Text style={styles.chipLabel(isNew)}>{t("newMatch.newTournament")}</Text>
              </Pressable>
            </ScrollView>

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
      </ScrollView>

      <View style={[styles.footer(tabBarInset), wide && styles.footerWide]}>
        <AppButton
          label={t("newMatch.start")}
          disabled={!canSubmit}
          onPress={handleSubmit}
          style={wide ? styles.startWide : styles.start}
        />
      </View>
    </View>
  )
}

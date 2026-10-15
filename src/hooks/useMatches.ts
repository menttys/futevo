import { useCallback } from "react"

import type { Match, MatchPoint, PointDetails, TeamSide } from "@/@types/futevo"
import { DEFAULT_WIN_BY } from "@/constants/App"
import { Collections } from "@/constants/Collections"
import { db } from "@/hooks/useFirebase"
import { deleteDoc, doc, setDoc } from "@/lib/firestore"
import { useMatchStore } from "@/store/matchState"
import { useUserStore } from "@/store/userState"
import { createLocalId } from "@/utils/createLocalId"
import { generateDocId } from "@/utils/generateDocId"
import { computeScores, computeWinner, isMatchPoint } from "@/utils/matchScoring"
import { stripUndefined } from "@/utils/stripUndefined"

type StartMatchParams = {
  teamA: [string, string]
  teamB: [string, string]
  targetScore: number
  winBy?: number
  tournamentId?: string
  round?: string
}

export const useMatches = () => {
  const userId = useUserStore((s) => s.user?.id)

  // Writes patch the store first and never block on the network — the native SDK
  // queues them offline and the useFirebase() listener reconciles once they land.
  const persistMatch = useCallback((match: Match): void => {
    useMatchStore.getState().upsertMatch(match)
    setDoc(doc(db, Collections.MATCH, match.id), stripUndefined(match)).catch(console.error)
  }, [])

  const startMatch = useCallback(
    ({
      teamA,
      teamB,
      targetScore,
      winBy = DEFAULT_WIN_BY,
      tournamentId,
      round,
    }: StartMatchParams): Match => {
      const match: Match = {
        id: generateDocId(Collections.MATCH),
        userId: userId ?? "",
        teamA,
        teamB,
        targetScore,
        winBy,
        tournamentId,
        round,
        status: "in_progress",
        scoreA: 0,
        scoreB: 0,
        points: [],
        createdAt: new Date().toISOString(),
      }
      persistMatch(match)
      return match
    },
    [userId, persistMatch]
  )

  // Scores are always recomputed from the point list rather than incremented —
  // that's what keeps undo (which just drops the last point) correct without a
  // separate reconciliation step.
  const applyPoints = useCallback((match: Match, points: MatchPoint[]): Match => {
    const { scoreA, scoreB } = computeScores(points)
    const finished = isMatchPoint(scoreA, scoreB, match.targetScore, match.winBy)

    return {
      ...match,
      points,
      scoreA,
      scoreB,
      status: finished ? "completed" : "in_progress",
      winner: finished ? computeWinner(scoreA, scoreB) : undefined,
      completedAt: finished ? (match.completedAt ?? new Date().toISOString()) : undefined,
    }
  }, [])

  const addPoint = useCallback(
    (matchId: string, team: TeamSide, details: PointDetails): void => {
      const match = useMatchStore.getState().matches?.find((m) => m.id === matchId)
      if (!match || match.status === "completed") return

      const point: MatchPoint = {
        id: createLocalId(),
        team,
        ...details,
        scoreAAfter: 0,
        scoreBAfter: 0,
        createdAt: new Date().toISOString(),
      }
      const points = [...match.points, point]
      const { scoreA, scoreB } = computeScores(points)
      point.scoreAAfter = scoreA
      point.scoreBAfter = scoreB

      persistMatch(applyPoints(match, points))
    },
    [persistMatch, applyPoints]
  )

  const undoLastPoint = useCallback(
    (matchId: string): void => {
      const match = useMatchStore.getState().matches?.find((m) => m.id === matchId)
      if (!match || match.points.length === 0) return

      persistMatch(applyPoints(match, match.points.slice(0, -1)))
    },
    [persistMatch, applyPoints]
  )

  // Manual override for ending a match before the target score is reached.
  const finishMatch = useCallback(
    (matchId: string): void => {
      const match = useMatchStore.getState().matches?.find((m) => m.id === matchId)
      if (!match) return

      persistMatch({
        ...match,
        status: "completed",
        winner: computeWinner(match.scoreA, match.scoreB),
        completedAt: new Date().toISOString(),
      })
    },
    [persistMatch]
  )

  const deleteMatch = useCallback((matchId: string): void => {
    useMatchStore.getState().removeMatch(matchId)
    deleteDoc(doc(db, Collections.MATCH, matchId)).catch(console.error)
  }, [])

  return { startMatch, addPoint, undoLastPoint, finishMatch, deleteMatch }
}

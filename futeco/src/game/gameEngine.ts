// src/game/compareTeams.ts

import { Team } from "@prisma/client";
import { AttributeComparison, GuessResult, MatchStatus } from "./jogabilidade";

function compareText(guessValue: string, secretValue: string): AttributeComparison {
  const status: MatchStatus = guessValue === secretValue ? "correct" : "wrong";
  return { status, value: guessValue };
}

function compareNumber(
  guessValue: number,
  secretValue: number,
  lowerIsBetter = false
): AttributeComparison {
  if (guessValue === secretValue) {
    return { status: "correct", value: guessValue };
  }

  // hint indica se o valor do time secreto é maior ou menor que o palpite
  const guessIsBelow = guessValue < secretValue;
  const secretIsGreater = lowerIsBetter ? !guessIsBelow : guessIsBelow;
  const hint = secretIsGreater ? "higher" : "lower";

  return { status: "wrong", value: guessValue, hint };
}

export function compareTeams(guessedTeam: Team, secretTeam: Team): GuessResult {
  return {
    teamName: guessedTeam.name,
    crest: guessedTeam.crest,
    country: compareText(guessedTeam.country, secretTeam.country),
    founded: compareNumber(guessedTeam.founded, secretTeam.founded),
    nationalTitles: compareNumber(
      guessedTeam.nationalTitles ?? 0,
      secretTeam.nationalTitles ?? 0
    ),
    uefaRanking: compareNumber(
      guessedTeam.uefaRanking,
      secretTeam.uefaRanking,
      true // lowerIsBetter: ranking menor é melhor
    ),
  };
}
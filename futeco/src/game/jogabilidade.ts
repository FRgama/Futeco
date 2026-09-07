// futeco\src\game\jogabilidade.ts

export type MatchStatus = "correct" | "close" | "wrong";

export interface AttributeComparison {
  status: MatchStatus;
  value: string | number;
  hint?: "higher" | "lower"; // útil pra founded/titles/ranking, indica se o time secreto é maior ou menor
}

export interface GuessResult {
  teamName: string;
  crest: string;
  country: AttributeComparison;
  founded: AttributeComparison;
  nationalTitles: AttributeComparison;
  uefaRanking: AttributeComparison;
}
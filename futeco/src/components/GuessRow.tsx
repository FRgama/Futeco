// src/components/GuessRow.tsx

import Image from "next/image";
import { GuessResult } from "../game/jogabilidade";
import { AttributeCell } from "./AtributteCell";
interface GuessRowProps {
  guess: GuessResult;
}

export function GuessHeader() {
  return (
    <div className="guess-grid box-border min-h-14 items-center gap-2 rounded-md border border-[#d9e3ec] bg-[#eaf1f7] text-center text-xs font-semibold uppercase leading-tight tracking-wide text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <span>Clube</span>
      <span>País</span>
      <span>Ano de fundação</span>
      <span>Títulos<br />nacionais</span>
      <span>Ranking<br />UEFA</span>
    </div>
  );
}

export function GuessRow({ guess }: GuessRowProps) {
  return (
    <div className="guess-grid box-border items-center gap-2">
      <div className="flex h-14 animate-reveal items-center justify-center gap-2 rounded-md border border-[#d9e3ec] bg-white px-3 text-sm font-medium shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <Image
          src={guess.crest}
          alt={guess.teamName}
          width={36}
          height={36}
          className="shrink-0 object-contain"
          style={{ width: 36, height: 36 }}
        />
        <span className="hidden whitespace-nowrap sm:inline">{guess.teamName}</span>
        <span className="truncate sm:hidden">{guess.shortName ?? guess.teamName}</span>
      </div>

      <AttributeCell {...guess.country} revealDelay={200} />
      <AttributeCell {...guess.founded} revealDelay={400} />
      <AttributeCell {...guess.nationalTitles} revealDelay={600} />
      <AttributeCell {...guess.uefaRanking} revealDelay={800} />
    </div>
  );
}
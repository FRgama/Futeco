// src/components/GuessRow.tsx

import Image from "next/image";
import { GuessResult } from "../game/jogabilidade";
import { AttributeCell } from "./AtributteCell";
interface GuessRowProps {
  guess: GuessResult;
}

export function GuessHeader() {
  return (
    <div className="grid min-h-14 grid-cols-[160px_repeat(4,1fr)] items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 text-center text-xs font-semibold uppercase leading-tight tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
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
    <div className="grid grid-cols-[160px_repeat(4,1fr)] items-center gap-2 px-3">
      <div className="flex h-14 animate-reveal items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium dark:border-gray-700 dark:bg-gray-800">
        <Image
          src={guess.crest}
          alt={guess.teamName}
          width={36}
          height={36}
          className="shrink-0 object-contain"
          style={{ width: 36, height: 36 }}
        />
        <span className="truncate">{guess.teamName}</span>
      </div>

      <AttributeCell {...guess.country} revealDelay={200} />
      <AttributeCell {...guess.founded} revealDelay={400} />
      <AttributeCell {...guess.nationalTitles} revealDelay={600} />
      <AttributeCell {...guess.uefaRanking} revealDelay={800} />
    </div>
  );
}
// src/components/GuessRow.tsx

import Image from "next/image";
import { GuessResult } from "../game/jogabilidade";
import { AttributeCell } from "./AtributteCell";
interface GuessRowProps {
  index: number;
  guess: GuessResult;
}

export function GuessRow({ index, guess }: GuessRowProps) {
  return (
    <div className="grid grid-cols-[24px_160px_repeat(4,1fr)] items-center gap-2">
      <span className="text-sm text-gray-400 text-center">{index}</span>

      <div className="h-12 flex items-center gap-2 px-3 rounded-md border border-gray-200 bg-white text-sm font-medium">
        <Image
          src={guess.crest}
          alt={guess.teamName}
          width={24}
          height={24}
          className="object-contain"
        />
        <span className="truncate">{guess.teamName}</span>
      </div>

      <AttributeCell {...guess.country} />
      <AttributeCell {...guess.founded} />
      <AttributeCell {...guess.nationalTitles} />
      <AttributeCell {...guess.uefaRanking} />
    </div>
  );
}
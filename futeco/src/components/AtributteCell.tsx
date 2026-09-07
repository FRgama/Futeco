// src/components/AttributeCell.tsx

import { MatchStatus } from "../game/jogabilidade";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AttributeCellProps {
  status: MatchStatus;
  value: string | number;
  hint?: "higher" | "lower";
  revealDelay?: number;
}

const statusStyles: Record<MatchStatus, string> = {
  correct: "bg-green-400",
  close: "bg-yellow-400",
  wrong: "bg-red-400",
};

export function AttributeCell({ status, value, hint, revealDelay = 0 }: AttributeCellProps) {
  return (
    <div
      className="relative flex h-14 animate-reveal items-center justify-center gap-1 overflow-hidden rounded-md bg-gray-100 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200"
      style={{ animationDelay: `${revealDelay}ms` }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 animate-status-fill ${statusStyles[status]}`}
        style={{ animationDelay: `${revealDelay + 280}ms` }}
      />
      <span className="relative z-10 text-white">{value}</span>
      {status !== "correct" && hint === "higher" && <ChevronUp className="relative z-10" size={16} />}
      {status !== "correct" && hint === "lower" && <ChevronDown className="relative z-10" size={16} />}
    </div>
  );
}
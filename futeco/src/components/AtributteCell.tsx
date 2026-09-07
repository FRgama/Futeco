// src/components/AttributeCell.tsx

import { MatchStatus } from "../game/jogabilidade";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AttributeCellProps {
  status: MatchStatus;
  value: string | number;
  hint?: "higher" | "lower";
}

const statusStyles: Record<MatchStatus, string> = {
  correct: "bg-green-400 text-white",
  close: "bg-yellow-400 text-white",
  wrong: "bg-red-400 text-white",
};

export function AttributeCell({ status, value, hint }: AttributeCellProps) {
  return (
    <div
      className={`h-12 rounded-md flex items-center justify-center gap-1 text-sm font-medium ${statusStyles[status]} transition-colors duration-300`}
    >
      <span>{value}</span>
      {status !== "correct" && hint === "higher" && <ChevronUp size={16} />}
      {status !== "correct" && hint === "lower" && <ChevronDown size={16} />}
    </div>
  );
}
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
      className="theme-muted relative flex h-14 animate-reveal items-center justify-center gap-1 overflow-hidden rounded-md text-sm font-medium"
      style={{ animationDelay: `${revealDelay}ms` }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 animate-status-fill ${statusStyles[status]}`}
        style={{ animationDelay: `${revealDelay + 280}ms` }}
      />
      <span className="attribute-value relative z-10">{value}</span>
      {status !== "correct" && hint === "higher" && <ChevronUp className="attribute-value relative z-10" size={16} />}
      {status !== "correct" && hint === "lower" && <ChevronDown className="attribute-value relative z-10" size={16} />}
    </div>
  );
}
// src/components/GuessInput.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TeamOption {
  id: number;
  name: string;
  crest: string;
}

interface GuessInputProps {
  onGuess: (teamName: string) => void;
  disabled?: boolean;
  selectedTeamNames?: string[];
}

export function GuessInput({ onGuess, disabled, selectedTeamNames = [] }: GuessInputProps) {
  const [allTeams, setAllTeams] = useState<TeamOption[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/equipes")
      .then((res) => res.json())
      .then(setAllTeams)
      .catch(() => setAllTeams([]));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTeams =
    query.length > 0
      ? allTeams
          .filter(
            (team) =>
              team.name.toLowerCase().includes(query.toLowerCase()) &&
              !selectedTeamNames.some(
                (selectedName) => selectedName.toLowerCase() === team.name.toLowerCase()
              )
          )
          .slice(0, 6)
      : [];

  function handleSelect(team: TeamOption) {
    if (selectedTeamNames.some((name) => name.toLowerCase() === team.name.toLowerCase())) {
      return;
    }

    onGuess(team.name);
    setQuery("");
    setIsOpen(false);
  }

  function handleSubmit() {
    const matchedTeam = allTeams.find(
      (team) =>
        team.name.toLowerCase() === query.toLowerCase() &&
        !selectedTeamNames.some(
          (selectedName) => selectedName.toLowerCase() === team.name.toLowerCase()
        )
    );

    if (!matchedTeam) return;

    onGuess(matchedTeam.name);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative flex gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Digite o nome de um time..."
          disabled={disabled}
          className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm outline-none focus:border-green-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />

        {isOpen && filteredTeams.length > 0 && (
          <ul className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            {filteredTeams.map((team) => (
              <li key={team.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(team)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Image src={team.crest} alt={team.name} width={20} height={20} className="object-contain" />
                  {team.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
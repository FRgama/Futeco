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
}

export function GuessInput({ onGuess, disabled }: GuessInputProps) {
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
          .filter((team) => team.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 6)
      : [];

  function handleSelect(team: TeamOption) {
    setQuery(team.name);
    setIsOpen(false);
  }

  function handleSubmit() {
  console.log("query:", query);
  console.log("allTeams length:", allTeams.length);

  const matchedTeam = allTeams.find(
    (team) => team.name.toLowerCase() === query.toLowerCase()
  );

  console.log("matchedTeam:", matchedTeam);

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
          className="w-full h-12 px-4 rounded-md border border-gray-200 bg-white text-sm outline-none focus:border-green-500 disabled:opacity-50"
        />

        {isOpen && filteredTeams.length > 0 && (
          <ul className="absolute z-10 top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md overflow-hidden">
            {filteredTeams.map((team) => (
              <li key={team.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(team)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50"
                >
                  <Image src={team.crest} alt={team.name} width={20} height={20} className="object-contain" />
                  {team.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => alert("clicou")}
      >
        Teste
      </button>

    </div>
  );
}
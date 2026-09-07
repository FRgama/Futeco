// src/app/teste-jogo/page.tsx

"use client";

import { useState } from "react";
import { GuessInput } from "../../components/GuessInput";
import { GuessRow } from "../../components/GuessRow";
import { GuessResult } from "../../game/jogabilidade";

export default function TesteJogoPage() {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [hasWon, setHasWon] = useState(false);

  async function handleGuess(teamName: string) {
    const response = await fetch("/api/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamName }),
    });

    if (!response.ok) {
      alert("Erro ao processar palpite");
      return;
    }

    const { result, isCorrect } = await response.json();
    setGuesses((prev) => [...prev, result]);

    if (isCorrect) setHasWon(true);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-4">
      <h1 className="text-xl font-semibold">Teste — FUTECO</h1>

      <GuessInput onGuess={handleGuess} disabled={hasWon} />

      <div className="space-y-2">
        {guesses.map((guess, index) => (
          <GuessRow key={index} index={index + 1} guess={guess} />
        ))}
      </div>

      {hasWon && (
        <p className="text-green-600 font-medium">Você acertou o time do dia!</p>
      )}
    </div>
  );
}
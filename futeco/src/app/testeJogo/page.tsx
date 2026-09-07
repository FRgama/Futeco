// src/app/teste-jogo/page.tsx

"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { GuessInput } from "../../components/GuessInput";
import { GuessHeader, GuessRow } from "../../components/GuessRow";
import { GuessResult } from "../../game/jogabilidade";

export default function TesteJogoPage() {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [hasWon, setHasWon] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [winningTeamName, setWinningTeamName] = useState("");
  const [winningAttempt, setWinningAttempt] = useState(0);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    function openHowToPlay() {
      setShowHowToPlay(true);
    }

    window.addEventListener("futeco:how-to-play", openHowToPlay);
    return () => window.removeEventListener("futeco:how-to-play", openHowToPlay);
  }, []);

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

    if (isCorrect) {
      setWinningTeamName(result.teamName);
      setWinningAttempt(guesses.length + 1);
      setHasWon(true);
      setShowVictory(true);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-xl font-semibold">Teste — FUTECO</h1>

      <GuessInput
        onGuess={handleGuess}
        disabled={hasWon}
        selectedTeamNames={guesses.map((guess) => guess.teamName)}
      />

      <div className="space-y-2">
        {guesses.length > 0 && <GuessHeader />}
        {guesses.map((guess) => (
          <GuessRow key={guess.teamName} guess={guess} />
        ))}
      </div>

      {showVictory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 px-4 backdrop-blur-sm"
          onClick={() => setShowVictory(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-green-200 bg-white p-8 text-center shadow-2xl dark:border-green-900 dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
              Parabéns!
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Você acertou o clube do dia
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-700 dark:text-gray-300">
              {winningTeamName}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Tentativa {winningAttempt}
            </p>
          </div>
        </div>
      )}

      {showHowToPlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 px-4 backdrop-blur-sm"
          onClick={() => setShowHowToPlay(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Como jogar
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <p>Digite o nome de um clube e selecione uma sugestão para enviar seu palpite.</p>
              <p>Compare as cores e as setas dos campos para descobrir o clube do dia.</p>
              <p>Verde significa que o atributo está correto. Amarelo indica que está próximo, e vermelho indica que está diferente.</p>
              <p>Você não pode repetir clubes já escolhidos.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowHowToPlay(false)}
              className="mt-7 w-full rounded-md bg-green-600 px-4 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-green-700"
            >
              JOGAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
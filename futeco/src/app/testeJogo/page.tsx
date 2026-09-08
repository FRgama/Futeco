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
  const [timeUntilNextChallenge, setTimeUntilNextChallenge] = useState("00:00:00");

  useEffect(() => {
    function updateCountdown() {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Sao_Paulo",
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).formatToParts(new Date());
      const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
      const elapsedSeconds =
        Number(values.hour) * 3600 +
        Number(values.minute) * 60 +
        Number(values.second);
      const totalSeconds = (24 * 60 * 60 - elapsedSeconds) % (24 * 60 * 60);
      const countdownSeconds = totalSeconds || 24 * 60 * 60;
      const hours = Math.floor(countdownSeconds / 3600);
      const minutes = Math.floor((countdownSeconds % 3600) / 60);
      const seconds = countdownSeconds % 60;

      setTimeUntilNextChallenge(
        [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":")
      );
    }

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

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
      window.setTimeout(() => setShowVictory(true), 1200);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-3 py-6 text-gray-900 sm:px-6 sm:py-10 dark:text-gray-100">

      <GuessInput
        onGuess={handleGuess}
        disabled={hasWon}
        selectedTeamNames={guesses.map((guess) => guess.teamName)}
      />

      <div className="guess-board space-y-2 overflow-x-auto pb-2">
        {guesses.length > 0 && <GuessHeader />}
        {[...guesses].reverse().map((guess) => (
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
              Tentativas: {winningAttempt}
            </p>
            <p className="mt-5 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Próximo clube em <span className="font-bold tabular-nums text-gray-700 dark:text-gray-200">{timeUntilNextChallenge}</span>
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
// components/Header.tsx
"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { CircleHelp, BarChart3, Sun, Moon } from "lucide-react";
import tucasImage from "../app/img/tucas.png";

const darkModeQuery = "(prefers-color-scheme: dark)";

function subscribeToColorScheme(onChange: () => void) {
  const mediaQuery = window.matchMedia(darkModeQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSystemDarkMode() {
  return window.matchMedia(darkModeQuery).matches;
}

function getServerDarkMode() {
  return false;
}

export function Header() {
  const systemIsDark = useSyncExternalStore(
    subscribeToColorScheme,
    getSystemDarkMode,
    getServerDarkMode
  );
  const [manualTheme, setManualTheme] = useState<boolean | null>(null);
  const isDark = manualTheme ?? systemIsDark;

  function toggleTheme() {
    const nextThemeIsDark = !isDark;
    setManualTheme(nextThemeIsDark);
    document.documentElement.classList.toggle("dark", nextThemeIsDark);
    document.documentElement.classList.toggle("light", !nextThemeIsDark);
  }

  return (
    <header
      className={`w-full border-b transition-colors duration-200 ${
        isDark
          ? "border-gray-700 bg-gray-900 text-gray-100"
          : "border-[#d9e3ec] bg-[#fbfdff] text-gray-900"
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-3 py-2 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={tucasImage}
            alt="Logo FUTECO"
            width={64}
            height={64}
            className="h-20 w-20 rounded-full object-cover"
            priority
          />
          <span className="hidden text-xl font-bold tracking-tight sm:inline">
            FUTECO
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-8">
          <button
            onClick={() => window.dispatchEvent(new Event("futeco:how-to-play"))}
            className={`flex items-center gap-2 rounded-3xl p-2 text-sm font-medium transition-colors ${
              isDark
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CircleHelp className="h-4 w-4" />
            <span className="hidden sm:inline">Como jogar</span>
          </button>

          <button
            className={`flex items-center gap-2 rounded-3xl p-2 text-sm font-medium transition-colors ${
              isDark
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Estatísticas</span>
          </button>

          <div
            className={`flex items-center gap-3 border-l pl-6 ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {isDark ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
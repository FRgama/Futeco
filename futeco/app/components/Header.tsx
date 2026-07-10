// components/Header.tsx
"use client";

import { useState } from "react";
import { CircleHelp, BarChart3, Sun, Moon } from "lucide-react";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }

  return (
    <header className="w-full border-b border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto flex max-w-10/12 items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-lg">
            ⚽
          </span>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            FUTECO
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <button className="p-2 rounded-3xl flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <CircleHelp className="h-4 w-4" />
            Como jogar
          </button>

          <button className="p-2 rounded-3xl flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ">
            <BarChart3 className="h-4 w-4" />
            Estatísticas
          </button>

          <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-800 pl-6">
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
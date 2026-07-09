"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden cursor-pointer"
    >
      <motion.div
        key={theme}
        initial={{ y: theme === "light" ? 30 : -30, opacity: 0, rotate: theme === "light" ? 90 : -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: theme === "light" ? -30 : 30, opacity: 0, rotate: theme === "light" ? -90 : 90 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {theme === "light" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </button>
  );
}

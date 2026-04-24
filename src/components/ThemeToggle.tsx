"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 hover:bg-white/5 transition-colors"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 90,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-white" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -90,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-black" />
      </motion.div>
    </button>
  );
}

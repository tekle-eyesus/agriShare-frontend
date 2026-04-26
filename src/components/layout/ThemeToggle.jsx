import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex relative items-center bg-base-200 hover:bg-base-300 ghost-border rounded-full w-16 h-9 transition-colors"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute shadow-sm rounded-full w-7 h-7 gradient-primary"
        style={{ left: isDark ? "calc(100% - 1.875rem)" : "0.25rem" }}
      />
      <span className="z-10 relative flex justify-between items-center px-2 w-full text-base-content/70">
        <Sun className="w-3.5 h-3.5" />
        <Moon className="w-3.5 h-3.5" />
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="sr-only"
        >
          {theme}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

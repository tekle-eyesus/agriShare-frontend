import { create } from "zustand";
import { useEffect } from "react";

export const useThemeStore = create((set, get) => ({
  theme: (() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("agri-theme");
    if (stored) return stored;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  })(),

  setTheme: (theme) => {
    localStorage.setItem("agri-theme", theme);
    set({ theme });

    // Update DOM
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  },

  toggle: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    get().setTheme(newTheme);
  },
}));

// Hook to initialize theme on app start
export const useThemeInitializer = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    // Ensure theme is applied on initial load
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
};

// Export a hook that matches the old useTheme interface
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggle = useThemeStore((state) => state.toggle);
  const setTheme = useThemeStore((state) => state.setTheme);

  return { theme, toggle, setTheme };
};

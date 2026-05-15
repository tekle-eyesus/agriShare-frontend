import { create } from "zustand";
import { persist } from "zustand/middleware";

const apply = (t) => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", t);
};

export const useThemeStore = create()(
  persist(
    (set, get) => ({
      theme: "agrishare-light",
      setTheme: (t) => {
        apply(t);
        set({ theme: t });
      },
      toggle: () => {
        const next =
          get().theme === "agrishare-light"
            ? "agrishare-dark"
            : "agrishare-light";
        apply(next);
        set({ theme: next });
      },
    }),
    {
      name: "agrishare-theme",
      onRehydrateStorage: () => (state) => {
        if (state) apply(state.theme);
      },
    },
  ),
);

// Apply on first import (covers initial paint before React mounts components)
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem("agrishare-theme");
    const parsed = raw ? JSON.parse(raw) : null;
    apply(parsed?.state?.theme ?? "agrishare-light");
  } catch {
    apply("agrishare-light");
  }
}

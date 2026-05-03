import { Bell, Calendar, Search, UserCircle2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Burger } from "./Burger";

export function Topbar({ onMenuClick, menuOpen }) {
  return (
    <header className="top-0 z-30 sticky border-base-300 border-b glass">
      <div className="flex sm:justify-between items-center gap-3 px-4 sm:px-6 h-16">
        <Burger open={menuOpen} onClick={onMenuClick} />

        <div className="relative flex-1 max-w-2xl">
          <Search className="top-1/2 left-3 absolute w-4 h-4 text-base-content/70 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search accounts, assets, or risk IDs…"
            className="bg-base-300 pr-4 pl-10 rounded-md outline-none ring-0 focus:ring-2 focus:ring-secondary/20 w-full h-10 text-sm text-base-content placeholder:text-base-content/70 transition-shadow"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="hidden sm:inline-flex justify-center items-center hover:bg-base-200 rounded-md w-10 h-10 text-base-content/70 transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="inline-flex relative justify-center items-center hover:bg-base-200 rounded-md w-10 h-10 text-base-content/70 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="top-2.5 right-2.5 absolute bg-destructive rounded-full w-1.5 h-1.5" />
          </button>
          <button className="hidden sm:inline-flex justify-center items-center hover:bg-base-200 rounded-md w-10 h-10 text-base-content/70 transition-colors">
            <UserCircle2 className="w-5 h-5" />
          </button>
          <div className="hidden sm:block mx-1 bg-outline-variant/30 w-px h-6" />
          <ThemeToggle />
          {/* <span className="hidden md:inline ml-2 text-on-surface-variant label-md">AgriShare Ops</span> */}
        </div>
      </div>
    </header>
  );
}

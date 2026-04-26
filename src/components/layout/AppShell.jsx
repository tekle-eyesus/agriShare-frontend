import { useState } from "react";
import { DesktopSidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";
import { Topbar } from "./Topbar";
import { Outlet } from "react-router-dom";

export function AppShell() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-surface w-full min-h-screen text-on-surface">
      <DesktopSidebar />
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar menuOpen={open} onMenuClick={() => setOpen((o) => !o)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

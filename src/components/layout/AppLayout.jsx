import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Menu, Search, X, LogOut } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { useAuthStore } from "../../store/useAuth";
import { NOTIFICATIONS } from "../../mock-data/farmer/data";
import { farmerNav, adminNav, investorNav } from "../../routes/navLinks";

export default function AppLayout() {
  const location = useLocation();
  const { authUser, isCheckingAuth } = useAuthStore();
  const userRole = authUser?.role;
  const NAV =
    userRole === "farmer"
      ? farmerNav
      : userRole === "admin"
        ? adminNav
        : investorNav;
  const MOBILE_NAV = NAV.slice(0, 5);
  const role = userRole;
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { logout } = useAuthStore();
  return (
    <div className="flex bg-base-200 min-h-screen">
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 264 }}
        className="hidden top-0 sticky lg:flex flex-col bg-base-100 border-base-300 border-r h-screen"
      >
        <div className="flex items-center gap-3 px-5 border-base-300 border-b h-16">
          {!collapsed && (
            <div className="place-items-center grid shadow-glow rounded-xl w-9 h-9 gradient-primary shrink-0">
              <Sprout className="w-5 h-5 text-primary-content" />
            </div>
          )}
          {!collapsed && (
            <div className="flex-1">
              <p className="font-display font-bold text-base leading-none">
                AgriShare
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {`${role.charAt(0).toUpperCase() + role.slice(1)} Portal`}
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground btn btn-ghost btn-xs btn-square"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-thin">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="farmerActiveNav"
                    className="top-1/2 left-0 absolute bg-primary rounded-r-full w-1 h-6 -translate-y-1/2"
                  />
                )}
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
          <span
            className="group relative flex items-center gap-3 hover:bg-base-200 px-3 py-2.5 rounded-xl font-medium text-sm text-base-content/70 hover:text-base-content transition-all cursor-pointer"
            onClick={() => logout()}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="flex-1 truncate">Logout</span>}
          </span>
        </nav>

        <div className="p-3 border-base-300 border-t">
          <div
            className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
          >
            <div className="avatar placeholder">
              <div className="flex justify-center items-center rounded-full w-9 text-primary-content gradient-primary">
                <span className="font-semibold text-xs">
                  {authUser.firstName?.slice(0, 2)}
                </span>
              </div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {authUser?.firstName}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="top-0 z-30 sticky flex items-center gap-3 bg-base-100/80 backdrop-blur-xl px-4 lg:px-8 border-base-300 border-b h-16">
          <button
            className="lg:hidden btn btn-ghost btn-sm btn-square"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="lg:hidden flex items-center gap-2">
            <div className="place-items-center grid rounded-lg w-8 h-8 gradient-primary">
              <Sprout className="w-4 h-4 text-primary-content" />
            </div>
            <span className="font-display font-bold">AgriShare</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md">
            <label className="flex items-center gap-2 bg-base-200 border-0 rounded-xl w-full input input-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search assets, listings, investors…"
                className="bg-transparent outline-none text-sm grow"
                aria-label="Search"
              />
            </label>
          </div>

          <div className="flex-1 lg:flex-none" />
          <div className="lg:ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <nav className="lg:hidden bottom-0 z-40 fixed inset-x-0 grid grid-cols-5 bg-base-100/95 backdrop-blur-xl border-base-300 border-t">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon;
            const active = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium ${
                  active ? "text-primary" : "text-base-content/60"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="max-w-[60px] truncate">
                  {item.label.split(" ")[0]}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden z-50 fixed inset-0 bg-neutral/40"
              onClick={() => setMobileMenu(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="lg:hidden left-0 z-50 fixed inset-y-0 flex flex-col bg-base-100 w-72"
            >
              <div className="flex justify-between items-center px-5 border-base-300 border-b h-16">
                <div className="flex items-center gap-3">
                  <div className="place-items-center grid rounded-xl w-9 h-9 gradient-primary">
                    <Sprout className="w-5 h-5 text-primary-content" />
                  </div>
                  <div>
                    <p className="font-display font-bold leading-none">
                      AgriShare
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {`${role.charAt(0).toUpperCase() + role.slice(1)} Portal`}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={() => setMobileMenu(false)}
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const active = item.end
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileMenu(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-base-content/70 hover:bg-base-200"
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="flex-1">{item.label}</span>
                    </NavLink>
                  );
                })}
                <span
                  className="group relative flex items-center gap-3 hover:bg-base-200 px-3 py-2.5 rounded-xl font-medium text-sm text-base-content/70 hover:text-base-content transition-all cursor-pointer"
                  onClick={() => logout()}
                >
                  <LogOut className="w-[18px] h-[18px] shrink-0" />

                  <span className="flex-1 truncate">Logout</span>
                </span>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

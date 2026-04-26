import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { navItems } from "./nav-items";

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="flex justify-center items-center rounded-xl w-11 h-11 text-primary-foreground gradient-primary">
        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
          agriculture
        </span>
      </div>
      <div className="leading-tight">
        <div className="font-semibold text-base text-base-content tracking-tight">
          AgriShare
        </div>
        {/* <div className="text-base-content-variant label-md">Sovereign Ledger</div> */}
      </div>
    </div>
  );
}

function OperatorCard() {
  return (
    <div className="flex items-center gap-3 bg-base-200 m-3 p-3 ghost-border rounded-xl">
      <div className="flex justify-center items-center bg-tertiary-container rounded-lg w-10 h-10 text-accent">
        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
          person
        </span>
      </div>
      <div className="leading-tight">
        <div className="font-semibold text-sm text-base-content">
          Operations Lead
        </div>
        <div className="text-xs text-base-content/70">HQ Terminal 04</div>
      </div>
    </div>
  );
}

function NavItems({ onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-2">
      <ul className="space-y-1">
        {navItems.map((item, i) => (
          <motion.li
            key={item.to}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.25, ease: "easeOut" }}
          >
            <NavLink
              to={item.to}
              end={item.to === "/"}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-base-200 text-base-content font-medium"
                    : "text-base-content/70 hover:bg-base-200 hover:text-base-content",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="left-0 absolute inset-y-1 bg-primary rounded-full w-0.5"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 20 }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

//TODO: fix the border color issue the opacity is not working
export function DesktopSidebar() {
  return (
    <aside className="hidden top-0 sticky lg:flex flex-col bg-base-100 border-base-200 border-r w-64 h-screen shrink-0">
      <Brand />
      <NavItems />
      <OperatorCard />
    </aside>
  );
}

export function MobileSidebarContent({ onNavigate }) {
  return (
    <div className="flex flex-col bg-base-100 h-full">
      <Brand />
      <NavItems onNavigate={onNavigate} />
      <OperatorCard />
    </div>
  );
}

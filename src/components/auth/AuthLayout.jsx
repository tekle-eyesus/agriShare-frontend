import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative bg-linear-to-br from-success/10 via-base-100 to-warning/10 w-full min-h-screen overflow-hidden">
      {/* Decorative blobs */}
      <div className="-top-32 -left-32 absolute bg-primary/20 blur-3xl rounded-full w-96 h-96 pointer-events-none" />
      <div className="-right-32 -bottom-32 absolute bg-warning/20 blur-3xl rounded-full w-96 h-96 pointer-events-none" />

      {/* Theme toggle (top-right) */}
      <div className="top-4 right-4 z-20 absolute">
        <ThemeToggle />
      </div>

      <div className="z-10 relative flex justify-center items-center p-4 sm:p-6 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="place-items-center grid shadow-glow mb-3 rounded-2xl w-12 h-12 text-primary-content gradient-primary">
              <Sprout className="w-6 h-6" />
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="opacity-70 mt-1 max-w-md text-sm">{subtitle}</p>
            )}
          </div>

          <div className="bg-base-100/70 shadow-elevated backdrop-blur-xl border border-base-300/60 card">
            <div className="p-6 sm:p-8 card-body">{children}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

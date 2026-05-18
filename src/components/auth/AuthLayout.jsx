import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { Link } from "react-router-dom";


export default function AuthLayout({ title, subtitle, children,footer }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f5efe4] dark:bg-base-300 text-base-content transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#f7f1e5] via-[#f1e8d3] to-[#ead9b8] dark:from-base-300 dark:via-base-200 dark:to-base-100 transition-colors duration-300" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-112 w-md rounded-full bg-success/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/3 h-112 w-md rounded-full bg-warning/20 blur-3xl" />

      <div className="absolute right-4 top-4 z-30">
        <ThemeToggle />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col lg:flex-row lg:items-stretch lg:gap-6 lg:p-6">
        <div className="flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:py-8">
          <div className="w-full max-w-md">
            {/* Brand pill */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-base-content/15 bg-white/60 px-3 py-1.5 backdrop-blur transition-all hover:bg-white/80"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-success text-success-content">
                <Sprout className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold tracking-tight">AgriShare</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 max-w-sm text-sm text-base-content/70">{subtitle}</p>
              )}

              <div className="mt-8">{children}</div>

              {footer && (
                <div className="mt-6 text-sm text-base-content/70">{footer}</div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="relative hidden flex-1 lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-full min-h-[640px] w-full overflow-hidden rounded-4xl shadow-elevated"
          >
            <img
              src="/auth-pic-1.jpg"
              alt="Ethiopian farmers in a field"
              className="absolute inset-0 h-full w-full object-cover"
              width={1024}
              height={1280}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

          </motion.div>
        </div>
      </div>
    </div>
  );
}

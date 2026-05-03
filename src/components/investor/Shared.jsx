import { motion } from "framer-motion";
import { Star, Inbox } from "lucide-react";

export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export function PageHeader({
  title, subtitle, actions,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 lg:mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    pending: "badge-warning",
    approved: "badge-success",
    active: "badge-success",
    completed: "bg-base-300 text-base-content",
    funded: "badge-info",
    refunded: "badge-error",
    rejected: "badge-error",
    failed: "badge-error",
    low: "badge-success",
    medium: "badge-warning",
    high: "badge-error",
    deposit: "badge-success",
    withdrawal: "badge-warning",
    investment: "badge-info",
    distribution: "badge-success",
    profit: "badge-success",
    refund: "badge-error",
    Farmland: "badge-success",
    Livestock: "badge-info",
  };
  const cls = map[status] || "badge-ghost";
  return <span className={`badge ${cls} badge-sm font-semibold capitalize`}>{status}</span>;
}

export function EmptyState({
  title = "Nothing here yet", message, icon: Icon = Inbox, action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-base-200 grid place-items-center mb-4">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="font-semibold">{title}</p>
      {message && <p className="text-sm text-muted-foreground mt-1 max-w-sm">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingSpinner({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-muted-foreground">
      <span className="loading loading-spinner loading-md text-primary" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-5 animate-pulse">
      <div className="h-4 w-24 bg-base-300 rounded mb-3" />
      <div className="h-8 w-32 bg-base-300 rounded mb-2" />
      <div className="h-3 w-40 bg-base-300 rounded" />
    </div>
  );
}

export function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`bg-base-100 rounded-2xl border border-base-300 shadow-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function RatingStars({ rating, size = 14 }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size} height={size}
          className={i < Math.round(rating) ? "fill-warning text-warning" : "text-base-300"}
        />
      ))}
    </div>
  );
}

export function RiskBadge({ level }) {
  const map = {
    low: "badge-success",
    medium: "badge-warning",
    high: "badge-error",
  };
  return <span className={`badge ${map[level] || "badge-ghost"} badge-sm capitalize font-semibold`}>{level} risk</span>;
}

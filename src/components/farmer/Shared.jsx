import { motion } from "framer-motion";
import { Inbox, Star, MapPin } from "lucide-react";

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-4 mb-6 lg:mb-8">
      <div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 max-w-2xl text-muted-foreground text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    active: "badge-success",
    funded: "badge-info",
    completed: "bg-base-300 text-base-content",
    cancelled: "badge-error",
    refunded: "badge-error",
    draft: "badge-ghost",
    verified: "badge-success",
    pending: "badge-warning",
    rejected: "badge-error",
    scheduled: "badge-warning",
    Farmland: "badge-success",
    Livestock: "badge-info",
  };
  const cls = map[status] || "badge-ghost";
  return (
    <span className={`badge ${cls} badge-sm font-semibold capitalize px-2`}>
      {status}
    </span>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message,
  icon: Icon = Inbox,
  action,
}) {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-16 text-center">
      <div className="place-items-center grid bg-base-200 mb-4 rounded-2xl w-16 h-16">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="font-semibold">{title}</p>
      {message && (
        <p className="mt-1 max-w-sm text-muted-foreground text-sm">{message}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-base-100 p-5 border border-base-300 rounded-2xl animate-pulse">
      <div className="bg-base-300 mb-3 rounded w-24 h-4" />
      <div className="bg-base-300 mb-2 rounded w-32 h-8" />
      <div className="bg-base-300 rounded w-40 h-3" />
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
    <div
      className="inline-flex items-center gap-0.5"
      aria-label={`Rating ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={
            i < Math.round(rating)
              ? "fill-warning text-warning"
              : "text-base-300"
          }
        />
      ))}
    </div>
  );
}

export function LocationLine({ region, zone, woreda, kebele }) {
  const parts = [region, zone, woreda, kebele].filter(Boolean).join(", ");
  return (
    <div className="inline-flex items-start gap-1 text-muted-foreground text-xs">
      <MapPin className="mt-0.5 w-3.5 h-3.5 shrink-0" />
      <span className="truncate">{parts}</span>
    </div>
  );
}

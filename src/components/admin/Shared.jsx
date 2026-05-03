import { motion } from "framer-motion";

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
    pending: "badge-warning",
    verified: "badge-success",
    approved: "badge-success",
    active: "badge-success",
    completed: "badge-success",
    rejected: "badge-error",
    failed: "badge-error",
    refunded: "badge-error",
    inactive: "badge-ghost",
    funded: "badge-success",
    Farmer: "badge-success",
    Investor: "badge-info",
    Admin: "badge-accent",
    Farmland: "badge-success",
    Livestock: "badge-info",
  };
  const cls = map[status] || "badge-ghost";
  return (
    <span className={`badge ${cls} badge-sm font-semibold capitalize`}>
      {status}
    </span>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message,
  icon: Icon,
  action,
}) {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-16 text-center">
      <div className="place-items-center grid bg-base-200 mb-4 rounded-2xl w-16 h-16">
        {Icon ? <Icon className="w-7 h-7 text-muted-foreground" /> : null}
      </div>
      <p className="font-semibold">{title}</p>
      {message && (
        <p className="mt-1 max-w-sm text-muted-foreground text-sm">{message}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingSpinner({ label }) {
  return (
    <div className="flex justify-center items-center gap-3 py-8 text-muted-foreground">
      <span className="text-primary loading loading-spinner loading-md" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`bg-base-100 rounded-2xl border border-base-300 shadow-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

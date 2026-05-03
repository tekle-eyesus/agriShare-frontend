import { CheckCircle, Clock, XCircle } from "lucide-react";

export const StatusBadge = ({ status }) => {
  const icons = {
    verified: CheckCircle,
    pending: Clock,
    rejected: XCircle,
  };
  const Icon = icons[status];
  const colors = {
    verified: "bg-success/20 text-success border-success/30",
    pending: "bg-warning/20 text-warning border-warning/30",
    rejected: "bg-error/20 text-error border-error/30",
  };

  return (
    <div
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}
    >
      <Icon className="w-3 h-3" />
      <span className="capitalize">{status}</span>
    </div>
  );
};

// Asset Type Badge
export const AssetTypeBadge = ({ type }) => {
  return (
    <div
      className={`badge ${type === "farmland" ? "badge-success" : "badge-info"} gap-1`}
    >
      {type === "farmland" ? "🌾 Farmland" : "🐄 Livestock"}
    </div>
  );
};

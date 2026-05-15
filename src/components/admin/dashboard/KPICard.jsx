import { motion } from "framer-motion";
import { Card } from "../../../components/admin/shared";
import { formatNumber } from "../../../utils/format";
import { itemUp } from "../../../utils/motionVariants";

function KPICard({
  title,
  value,
  icon: Icon,
  gradient = false,
  breakdown,
  badge,
}) {
  return (
    <motion.div variants={itemUp}>
      <Card
        className={`p-5 h-full ${gradient ? "gradient-primary text-primary-content border-0" : ""}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div
            className={`w-11 h-11 rounded-xl grid place-items-center ${
              gradient ? "bg-white/15" : "bg-primary/10 text-primary"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          {badge && badge.count > 0 && (
            <span
              className={`badge badge-sm font-bold ${badge.color || "badge-error"}`}
            >
              {badge.count} {badge.label}
            </span>
          )}
        </div>
        <p
          className={`text-xs uppercase tracking-wider font-semibold ${
            gradient ? "text-primary-content/80" : "text-muted-foreground"
          }`}
        >
          {title}
        </p>
        <p className="mt-1 font-display font-bold text-3xl">{value}</p>
        {breakdown && (
          <div
            className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t text-xs ${
              gradient
                ? "border-white/15 text-primary-content/85"
                : "border-base-300 text-muted-foreground"
            }`}
          >
            {Object.entries(breakdown).map(([k, v]) => (
              <span key={k}>
                <b
                  className={
                    gradient ? "text-primary-content" : "text-base-content"
                  }
                >
                  {formatNumber(v)}
                </b>{" "}
                {k}
              </span>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default KPICard;

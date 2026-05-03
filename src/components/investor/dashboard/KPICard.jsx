import { motion } from "framer-motion";
import { Card } from "../Shared";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fadeInUp } from "../../../utils/motionVariants";
function KPICard({ title, value, desc, trend, icon: Icon, accent = false }) {
  const positive = trend >= 0;
  return (
    <motion.div variants={fadeInUp}>
      <Card
        className={`p-5 ${accent ? "bg-linear-to-br from-primary to-primary-glow text-primary-content border-0" : ""}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className={`text-xs uppercase tracking-wide font-medium ${accent ? "text-primary-content/80" : "text-muted-foreground"}`}
            >
              {title}
            </p>
            <p className="mt-2 font-display font-bold text-2xl sm:text-3xl">
              {value}
            </p>
            {desc && (
              <p
                className={`text-xs mt-1 ${accent ? "text-primary-content/80" : "text-muted-foreground"}`}
              >
                {desc}
              </p>
            )}
          </div>
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center ${accent ? "bg-white/20" : "bg-primary/10 text-primary"}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 mt-3 text-xs font-semibold ${positive ? (accent ? "text-white" : "text-success") : "text-error"}`}
          >
            {positive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {positive ? "+" : ""}
            {trend}% from last quarter
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default KPICard;

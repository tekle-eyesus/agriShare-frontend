import { ArrowUpRight } from "lucide-react";
import { Card } from "../../../components/admin/shared";

function StatCard({ label, value, sub, trend, icon: Icon }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="place-items-center grid bg-primary/10 rounded-lg w-9 h-9 text-primary">
          <Icon className="w-4 h-4" />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-0.5 font-semibold text-success text-xs">
            <ArrowUpRight className="w-3 h-3" /> {trend}%
          </div>
        )}
      </div>
      <p className="font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-0.5 font-display font-bold text-2xl">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>}
    </Card>
  );
}

export default StatCard;

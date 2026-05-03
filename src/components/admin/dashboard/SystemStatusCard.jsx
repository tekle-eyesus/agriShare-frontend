import { Card } from "../../../components/admin/shared";
import { Database, Zap, Activity, ShieldCheck } from "lucide-react";
import { SYSTEM_STATUS } from "../../../mock-data/admin/data";

function SystemStatusCard() {
  const items = [
    {
      label: "MongoDB",
      value: SYSTEM_STATUS.mongo.label,
      ok: SYSTEM_STATUS.mongo.ok,
      sub: `Last backup ${SYSTEM_STATUS.mongo.lastBackup}`,
      icon: Database,
    },
    {
      label: "Blockchain",
      value: SYSTEM_STATUS.blockchain.label,
      ok: true,
      sub: `Block #${SYSTEM_STATUS.blockchain.block}`,
      icon: Zap,
    },
    {
      label: "API Response",
      value: SYSTEM_STATUS.api.label,
      ok: false,
      warn: true,
      sub: "p95 latency",
      icon: Activity,
    },
    {
      label: "Uptime",
      value: SYSTEM_STATUS.uptime,
      ok: true,
      sub: "Last 30 days",
      icon: ShieldCheck,
    },
  ];
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-lg">System Status</h3>
        <span className="flex items-center gap-1.5 font-semibold text-success text-xs">
          <span className="bg-success rounded-full w-2 h-2 animate-pulse" /> All
          systems operational
        </span>
      </div>
      <div className="space-y-3">
        {items.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 bg-base-200/60 p-3 rounded-xl"
            >
              <div
                className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${
                  s.warn
                    ? "bg-warning/15 text-warning"
                    : s.ok
                      ? "bg-success/15 text-success"
                      : "bg-error/15 text-error"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{s.label}</p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {s.sub}
                </p>
              </div>
              <span
                className={`badge badge-sm font-semibold ${
                  s.warn
                    ? "badge-warning"
                    : s.ok
                      ? "badge-success"
                      : "badge-error"
                }`}
              >
                {s.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default SystemStatusCard;

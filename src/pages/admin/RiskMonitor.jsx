import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { AlertTriangle, Bell, Download, Eye } from "lucide-react";
import {
  PageHeader,
  Card,
  StatusBadge,
  EmptyState,
} from "../../components/admin/shared";
import { formatETB } from "../../utils/format";
import RiskModal from "../../components/admin/risk-monitor/RiskModal";
import { useAPI } from "../../hook/useApi";
import { useSuspenseQuery } from "@tanstack/react-query";

const TEMPLATES = [
  {
    id: "reminder",
    label: "Funding reminder",
    body: "Friendly reminder that your listing is below target. Consider sharing it within your network.",
  },
  {
    id: "deadline",
    label: "Deadline approaching",
    body: "Your funding window closes in a few days. Reach out if you need to extend.",
  },
  {
    id: "extension",
    label: "Extension offer",
    body: "We can offer a 7-day extension. Reply to confirm.",
  },
];

export default function RiskMonitor() {
  const [daysWindow, setDaysWindow] = useState(15);
  const [maxFund, setMaxFund] = useState(80);
  const [active, setActive] = useState(null);
  const [tpl, setTpl] = useState(TEMPLATES[0].id);
  const [msg, setMsg] = useState(TEMPLATES[0].body);
  const { admin } = useAPI();
  const { data } = useSuspenseQuery({
    queryKey: ["listings-in-risk"],
    queryFn: () =>
      admin.getListingsRiskQueue({
        page: 1,
        limit: 10,
        daysWindow: daysWindow,
        maxFundingProgressPercent: maxFund,
      }),
  });
  const items = data?.data?.items || [];
  const totalCount = data?.data?.total || 0;
  const filtered = useMemo(() => items, [items]);

  return (
    <>
      <PageHeader
        title="Risk Monitor"
        subtitle={`${totalCount} listings at risk`}
        actions={
          <>
            <button className="gap-2 border btn-outline normal-case btn btn-sm">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            {/* <span className="gap-1 px-2 font-semibold badge badge-error badge-md">
              <AlertTriangle className="w-3 h-3" /> {filtered.length} at risk
            </span> */}
          </>
        }
      />

      <Card className="mb-5 p-4">
        <div className="flex md:flex-row flex-col md:items-center gap-4">
          <div className="flex-1 gap-2 grid grid-cols-2 sm:grid-cols-4">
            {[5, 10, 15, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDaysWindow(d)}
                className={`btn btn-sm normal-case border ${daysWindow === d ? "btn-primary" : "btn-outline"}`}
              >
                ≤ {d} days
              </button>
            ))}
          </div>
          <div className="flex-1 gap-2 grid grid-cols-2 sm:grid-cols-4">
            {[50, 60, 70, 80].map((p) => (
              <button
                key={p}
                onClick={() => setMaxFund(p)}
                className={`btn btn-sm normal-case border ${maxFund === p ? "btn-accent" : "btn-outline"}`}
              >
                &lt; {p}% funded
              </button>
            ))}
          </div>
        </div>
      </Card>
      {!filtered.length ? (
        <EmptyState title="No Listing found" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th>Listing</th>
                  <th className="hidden md:table-cell">Goal</th>
                  <th>Progress</th>
                  <th className="hidden sm:table-cell">Days left</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => {
                  const pct = l.fundingProgressPercent || 0;
                  const sev =
                    pct < 30 ? "error" : pct < 50 ? "warning" : "info";
                  const daysLeft = Math.ceil(
                    (new Date(l.investmentDeadline) - new Date()) /
                      (1000 * 60 * 60 * 24),
                  );
                  const dayBadge =
                    daysLeft <= 5
                      ? "badge-error"
                      : daysLeft <= 10
                        ? "badge-warning"
                        : "badge-info";
                  return (
                    <motion.tr
                      key={l._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-base-200/60"
                    >
                      <td>
                        <div>
                          <p className="font-semibold text-sm">{l.asset}</p>
                          <p className="text-muted-foreground text-xs">
                            {l.farmer?.firstName} {l.farmer?.lastName} • {l._id}
                          </p>
                        </div>
                      </td>
                      <td className="hidden md:table-cell font-medium tabular-nums text-sm">
                        {formatETB(l.investmentGoalBirr)}
                      </td>
                      <td className="min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <progress
                            className={`progress progress-${sev} flex-1 h-2`}
                            value={pct}
                            max={100}
                          />
                          <span className="w-10 font-bold tabular-nums text-xs text-right">
                            {pct}%
                          </span>
                        </div>
                        <p className="mt-0.5 tabular-nums text-[11px] text-muted-foreground">
                          {formatETB(l.totalInvestedBirr)} raised
                        </p>
                      </td>
                      <td className="hidden sm:table-cell">
                        <span
                          className={`badge ${dayBadge} badge-sm font-semibold`}
                        >
                          {daysLeft}d
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={l.status} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setActive(l)}
                            className="gap-1 normal-case btn btn-warning btn-xs"
                          >
                            <Bell className="w-3 h-3" /> Alert
                          </button>
                          <button className="btn btn-ghost btn-xs btn-square">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <RiskModal active={active} setActive={setActive} />
    </>
  );
}

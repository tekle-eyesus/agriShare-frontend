import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, StatusBadge } from "../Shared";
import {
  ALLOCATION_BY_SECTOR,
  ALLOCATION_BY_TYPE,
  INVESTMENTS,
  PIE_COLORS,
} from "../../../mock-data/investor/data";
import { formatETB } from "../../../utils/format";
import { Link } from "react-router-dom";

export default function AllocationAndInvestment() {
  return (
    <div className="gap-4 grid grid-cols-1 xl:grid-cols-3 mt-6">
      <Card className="p-5">
        <h3 className="font-display font-bold text-lg">Allocation by type</h3>
        <div className="mt-2 h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={ALLOCATION_BY_TYPE}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
              >
                {ALLOCATION_BY_TYPE.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => formatETB(v)}
                contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display font-bold text-lg">Allocation by sector</h3>
        <div className="mt-2 h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={ALLOCATION_BY_SECTOR}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {ALLOCATION_BY_SECTOR.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => formatETB(v)}
                contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-display font-bold text-lg">Recent investments</h3>
          <Link
            to="/investor/investments"
            className="font-semibold text-primary text-xs"
          >
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {INVESTMENTS.slice(0, 5).map((inv) => (
            <div
              key={inv.id}
              className="flex justify-between items-center gap-3 hover:bg-base-200 p-3 rounded-xl transition-colors"
            >
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">
                  {inv.listingTitle}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {inv.shares} shares · {inv.investedDate}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm">
                  {formatETB(inv.amountInvested)}
                </p>
                <StatusBadge status={inv.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

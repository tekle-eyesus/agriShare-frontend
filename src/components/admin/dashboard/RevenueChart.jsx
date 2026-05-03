import { useState } from "react";
import { Card } from "../../../components/admin/shared";
import { Calendar, Download } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formatETB } from "../../../utils/format";
import { REVENUE_SERIES } from "../../../mock-data/admin/data";

function RevenueChart() {
  const [range, setRange] = useState("30d");
  return (
    <Card className="p-5 lg:p-6">
      <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-3 mb-5">
        <div>
          <h3 className="font-display font-bold text-lg">
            Revenue & Investments
          </h3>
          <p className="mt-0.5 text-muted-foreground text-xs">
            Platform fees and investment volume over time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="gap-2 btn-outline normal-case btn btn-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              {range === "7d"
                ? "Last 7 days"
                : range === "30d"
                  ? "Last 30 days"
                  : "Custom"}
            </label>
            <ul
              tabIndex={0}
              className="z-10 bg-base-100 shadow-elevated mt-2 border border-base-300 rounded-xl w-44 dropdown-content menu"
            >
              <li>
                <a onClick={() => setRange("7d")}>Last 7 days</a>
              </li>
              <li>
                <a onClick={() => setRange("30d")}>Last 30 days</a>
              </li>
              <li>
                <a onClick={() => setRange("custom")}>Custom range…</a>
              </li>
            </ul>
          </div>
          <button className="gap-2 normal-case btn btn-sm btn-primary">
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      <div className="-mx-2 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_SERIES.slice(range === "7d" ? -7 : -30)}>
            <defs>
              <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E7D32" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2E7D32" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B21A8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6B21A8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontSize: 12,
                padding: 12,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,.1)",
              }}
              formatter={(v, name) => [
                formatETB(v),
                name === "revenue" ? "Revenue" : "Investments",
              ]}
            />
            <Area
              type="monotone"
              dataKey="investments"
              stroke="#6B21A8"
              strokeWidth={2}
              fill="url(#gInv)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2E7D32"
              strokeWidth={2.5}
              fill="url(#gRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default RevenueChart;

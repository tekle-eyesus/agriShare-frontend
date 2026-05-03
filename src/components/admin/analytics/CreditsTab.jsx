import { Card } from "../../../components/admin/shared";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Zap, TrendingUp, ArrowUpRight, Wallet } from "lucide-react";
import { StatCard } from "../../farmer/listing-detail/Cards";
import {
  CREDITS_BY_TYPE,
  CREDITS_OVER_TIME,
} from "../../../mock-data/admin/data";

function CreditsTab() {
  return (
    <div className="space-y-5">
      <div className="gap-3 grid grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total transactions" value="139" icon={Zap} />
        <StatCard label="Absolute volume" value="1,335" icon={TrendingUp} />
        <StatCard label="Positive credits" value="1,300" icon={ArrowUpRight} />
        <StatCard label="Negative credits" value="-35" icon={Wallet} />
      </div>

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-display font-bold text-lg">
            Credits by Type
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={CREDITS_BY_TYPE}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="type"
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="volume" fill="#4CAF50" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 font-display font-bold text-lg">
            Credit Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={CREDITS_OVER_TIME}>
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
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="#2E7D32"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="#F44336"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-base-300 border-b">
          <h3 className="font-display font-bold text-lg">
            Recent Credit Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th>User</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { u: "Tigist H.", t: "Monthly reset", a: 10, d: "today" },
                { u: "Abebe K.", t: "Bundle purchase", a: 50, d: "today" },
                { u: "Dawit B.", t: "Signup bonus", a: 10, d: "yesterday" },
                { u: "Yodit S.", t: "Adjustment", a: -5, d: "yesterday" },
                {
                  u: "Mulugeta D.",
                  t: "Monthly reset",
                  a: 10,
                  d: "2 days ago",
                },
              ].map((r, i) => (
                <tr key={i}>
                  <td className="font-semibold text-sm">{r.u}</td>
                  <td className="text-sm">{r.t}</td>
                  <td
                    className={`text-right tabular-nums font-bold ${r.a >= 0 ? "text-success" : "text-error"}`}
                  >
                    {r.a >= 0 ? "+" : ""}
                    {r.a}
                  </td>
                  <td className="text-muted-foreground text-sm">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default CreditsTab;

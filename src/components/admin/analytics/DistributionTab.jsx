import { FileText, TrendingUp, Wallet, Users } from "lucide-react";
import { Card } from "../../../components/admin/shared";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { StatCard } from "../../farmer/listing-detail/Cards";
import { formatETB } from "../../../utils/format";
import {
  CONTRACT_STATUS,
  DISTRIBUTION_MONTHLY,
  PIE_COLORS,
} from "../../../mock-data/admin/data";

function DistributionTab() {
  return (
    <div className="space-y-5">
      <div className="gap-3 grid grid-cols-2 lg:grid-cols-3">
        <StatCard label="Active contracts" value="112" icon={FileText} />
        <StatCard label="Completed" value="245" trend={14} icon={TrendingUp} />
        <StatCard label="Refunded" value="44" icon={Wallet} />
        <StatCard
          label="Completed value"
          value={formatETB(7_600_000)}
          trend={12}
          icon={Wallet}
        />
        <StatCard
          label="Refunded value"
          value={formatETB(955_000)}
          icon={Wallet}
        />
        <StatCard
          label="Investor payouts"
          value={formatETB(6_640_000)}
          trend={18}
          icon={Users}
        />
      </div>

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-3">
        <Card className="p-5">
          <h3 className="mb-4 font-display font-bold text-lg">
            Contract Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={CONTRACT_STATUS}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {CONTRACT_STATUS.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="lg:col-span-2 p-5">
          <h3 className="mb-4 font-display font-bold text-lg">
            Monthly Distributions
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={DISTRIBUTION_MONTHLY}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
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
                  }}
                  formatter={(v) => formatETB(v)}
                />
                <Bar dataKey="amount" fill="#6B21A8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-base-300 border-b">
          <h3 className="font-display font-bold text-lg">
            Recent Distributions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th>Listing</th>
                <th>Investors</th>
                <th className="text-right">Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  l: "Teff Farm — Gozamin",
                  n: 16,
                  a: 480_000,
                  d: "Apr 26, 2026",
                },
                {
                  l: "Coffee Plantation — Jimma",
                  n: 14,
                  a: 360_000,
                  d: "Apr 22, 2026",
                },
                {
                  l: "Dairy Cattle Herd",
                  n: 11,
                  a: 220_000,
                  d: "Apr 20, 2026",
                },
                {
                  l: "Wheat Farm Project",
                  n: 9,
                  a: 180_000,
                  d: "Apr 18, 2026",
                },
              ].map((r) => (
                <tr key={r.l}>
                  <td className="font-semibold text-sm">{r.l}</td>
                  <td className="text-sm">{r.n}</td>
                  <td className="font-semibold tabular-nums text-right">
                    {formatETB(r.a)}
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

export default DistributionTab;

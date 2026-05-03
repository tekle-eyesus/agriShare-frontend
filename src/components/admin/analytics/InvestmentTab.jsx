import { Card } from "../../../components/admin/shared";
import { formatETB, formatNumber } from "../../../utils/format";
import { FileText, Wallet, Users, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { StatCard } from "../../farmer/listing-detail/Cards";
import {
  INVESTMENT_TIME,
  TOP_LISTINGS_INVEST,
} from "../../../mock-data/admin/data";

function InvestmentTab() {
  return (
    <div className="space-y-5">
      <div className="gap-3 grid grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total contracts"
          value={formatNumber(86)}
          sub="Last 30 days"
          trend={18}
          icon={FileText}
        />
        <StatCard
          label="Total invested"
          value={formatETB(2_750_000)}
          trend={23}
          icon={Wallet}
        />
        <StatCard
          label="Unique investors"
          value={formatNumber(41)}
          sub="+9 new"
          trend={28}
          icon={Users}
        />
        <StatCard
          label="Avg ticket size"
          value={formatETB(31_976)}
          trend={6}
          icon={TrendingUp}
        />
      </div>

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <h3 className="mb-4 font-display font-bold text-lg">
            Investment Over Time
          </h3>
          <div className="-mx-2 h-72">
            <ResponsiveContainer>
              <LineChart data={INVESTMENT_TIME}>
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
                  }}
                  formatter={(v) => formatETB(v)}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2E7D32"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 font-display font-bold text-lg">Top Listings</h3>
          <div className="-mx-2 h-72">
            <ResponsiveContainer>
              <BarChart
                data={TOP_LISTINGS_INVEST}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  tickFormatter={(v) => `${v / 1000}k`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 11, fill: "#1F2937" }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    fontSize: 12,
                  }}
                  formatter={(v) => formatETB(v)}
                />
                <Bar dataKey="invested" fill="#2E7D32" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-base-300 border-b">
          <h3 className="font-display font-bold text-lg">
            Top Listings — Detail
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th>Listing</th>
                <th className="text-right">Invested</th>
                <th className="text-right">Contracts</th>
                <th className="text-right">Avg / contract</th>
              </tr>
            </thead>
            <tbody>
              {TOP_LISTINGS_INVEST.map((l) => (
                <tr key={l.name}>
                  <td className="font-semibold text-sm">{l.name}</td>
                  <td className="tabular-nums text-right">
                    {formatETB(l.invested)}
                  </td>
                  <td className="tabular-nums text-right">{l.contracts}</td>
                  <td className="tabular-nums text-muted-foreground text-right">
                    {formatETB(Math.round(l.invested / l.contracts))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default InvestmentTab;

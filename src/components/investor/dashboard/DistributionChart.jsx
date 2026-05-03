import { Link } from "react-router-dom";
import { Card } from "../Shared";
import { AreaChart, ChevronRight } from "lucide-react";
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatETB } from "../../../utils/format";
import { DISTRIBUTION_HISTORY } from "../../../mock-data/investor/data";

export default function DistributionChart() {
  return (
    <Card className="xl:col-span-2 p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-display font-bold text-lg">
            Distribution history
          </h3>
          <p className="text-muted-foreground text-xs">
            Payouts received over time
          </p>
        </div>
        <Link
          to="/investor/distributions"
          className="inline-flex items-center gap-1 font-semibold text-primary text-xs"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="h-64">
        <ResponsiveContainer>
          <AreaChart data={DISTRIBUTION_HISTORY}>
            <defs>
              <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E7D32" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2E7D32" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                background: "#fff",
              }}
              formatter={(v) => [formatETB(v), "Distribution"]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#2E7D32"
              fill="url(#distGrad)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

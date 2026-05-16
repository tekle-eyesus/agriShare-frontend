import { TabContent } from "./Tab";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsTab({ activeTab, listing }) {
  if (!listing) {
    return (
      <TabContent value="analytics" activeTab={activeTab}>
        <div className="py-12 text-muted-foreground text-center">
          No analytics data available
        </div>
      </TabContent>
    );
  }

  const shareDistribution = [
    { name: "Sold", value: listing.sharesToSellPercent || 0, color: "#2E7D32" },
    {
      name: "Available",
      value: 100 - (listing.sharesToSellPercent || 0),
      color: "#E0E0E0",
    },
  ];

  const investmentData = [
    { month: "Start", amount: 0 },
    { month: "Current", amount: listing.totalInvestedBirr || 0 },
    { month: "Goal", amount: listing.investmentGoalBirr || 0 },
  ];

  const daysToDeadline = listing.investmentDeadline
    ? Math.ceil(
        (new Date(listing.investmentDeadline) - new Date()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <TabContent value="analytics" activeTab={activeTab}>
      <div>
        <h3 className="mb-4 font-semibold text-lg">Investment Progress</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} ETB`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2E7D32"
                strokeWidth={2}
                name="Investment (ETB)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg">Share Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={shareDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {shareDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
        <div className="bg-base-200/50 card">
          <div className="p-4 card-body">
            <div className="text-xs text-base-content/60">Total Invested</div>
            <div className="font-bold text-xl">
              {(listing.totalInvestedBirr || 0).toLocaleString()} ETB
            </div>
          </div>
        </div>
        <div className="bg-base-200/50 card">
          <div className="p-4 card-body">
            <div className="text-xs text-base-content/60">Funding Progress</div>
            <div className="font-bold text-xl">
              {listing.investmentProgressPercent || 0}%
            </div>
          </div>
        </div>
        <div className="bg-base-200/50 card">
          <div className="p-4 card-body">
            <div className="text-xs text-base-content/60">Days to Deadline</div>
            <div className="font-bold text-primary text-xl">
              {daysToDeadline > 0 ? `~${daysToDeadline} days` : "Expired"}
            </div>
          </div>
        </div>
      </div>
    </TabContent>
  );
}

export default AnalyticsTab;

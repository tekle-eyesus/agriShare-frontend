import { useMemo, useState } from "react";
import { Download, Search, DollarSign, TrendingUp, Calendar, Hash } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, Legend,
} from "recharts";
import { PageHeader, Card, EmptyState, StatusBadge } from "../../components/investor/Shared";
import { DISTRIBUTIONS, DISTRIBUTION_HISTORY, INVESTMENTS } from "../../mock-data/investor/data";
import { formatETB } from "../../utils/format";

export default function Distributions() {
  const [search, setSearch] = useState("");
  const [filterListing, setFilterListing] = useState("All");

  const total = DISTRIBUTIONS.reduce((s, d) => s + d.amount, 0);
  const avg = Math.round(total / DISTRIBUTIONS.length);
  const next = INVESTMENTS.filter((i) => i.nextPayout).sort((a, b) => a.nextPayout.localeCompare(b.nextPayout))[0];

  const cumulative = useMemo(() => {
    let acc = 0;
    return DISTRIBUTION_HISTORY.map((d) => { acc += d.amount; return { month: d.month, amount: d.amount, cumulative: acc }; });
  }, []);

  const listings = ["All", ...Array.from(new Set(DISTRIBUTIONS.map((d) => d.listingTitle)))];
  const filtered = DISTRIBUTIONS.filter((d) =>
    (filterListing === "All" || d.listingTitle === filterListing) &&
    (!search || d.listingTitle.toLowerCase().includes(search.toLowerCase()))
  );

  const exportCSV = () => {
    const header = "Listing,Amount,Date,Type,Reference\n";
    const rows = filtered.map((d) => `"${d.listingTitle}",${d.amount},${d.date},${d.type},${d.reference}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "distributions.csv"; a.click();
  };

  return (
    <div>
      <PageHeader
        title="Distribution History"
        subtitle="Every payout you've received from your investments."
        actions={<button onClick={exportCSV} className="btn btn-outline btn-sm gap-2"><Download className="w-4 h-4"/>Export CSV</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={DollarSign} label="Total received" value={formatETB(total)} />
        <SummaryCard icon={Hash} label="Distributions" value={String(DISTRIBUTIONS.length)} />
        <SummaryCard icon={TrendingUp} label="Avg payout" value={formatETB(avg)} />
        <SummaryCard icon={Calendar} label="Next expected" value={next?.nextPayout || "—"} sub={next ? `+${formatETB(next.nextPayoutAmount)}` : ""} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="p-5" hover={false}>
          <h3 className="font-display font-bold mb-3">Monthly distributions</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={DISTRIBUTION_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" fontSize={12} stroke="#6B7280" />
                <YAxis fontSize={12} stroke="#6B7280" tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v) => [formatETB(v), "Amount"]} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
                <Bar dataKey="amount" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5" hover={false}>
          <h3 className="font-display font-bold mb-3">Cumulative returns</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={cumulative}>
                <defs>
                  <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF9800" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#FF9800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" fontSize={12} stroke="#6B7280" />
                <YAxis fontSize={12} stroke="#6B7280" tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v) => formatETB(v)} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="cumulative" stroke="#FF9800" strokeWidth={2.5} fill="url(#cumGrad)" name="Cumulative" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4 mt-6" hover={false}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <label className="input input-sm input-bordered flex items-center gap-2 sm:col-span-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by listing…" className="grow bg-transparent outline-none" />
          </label>
          <select value={filterListing} onChange={(e) => setFilterListing(e.target.value)} className="select select-bordered select-sm">
            {listings.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-0 mt-4" hover={false}>
          <EmptyState title="No distributions yet" message="When farmers pay out distributions, they will appear here." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <Card className="p-0 overflow-hidden lg:col-span-2" hover={false}>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead><tr><th>Date</th><th>Listing</th><th>Type</th><th>Reference</th><th className="text-right">Amount</th></tr></thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id}>
                      <td className="text-xs">{d.date}</td>
                      <td className="font-semibold">{d.listingTitle}</td>
                      <td><StatusBadge status={d.type} /></td>
                      <td className="text-xs text-muted-foreground">{d.reference}</td>
                      <td className="text-right font-bold text-success">+{formatETB(d.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5" hover={false}>
            <h3 className="font-display font-bold mb-3">Timeline</h3>
            <div className="space-y-3">
              {filtered.slice(0, 6).map((d, i) => (
                <div key={d.id} className="border-l-2 border-primary/30 pl-3 relative">
                  <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-base-100"/>
                  <p className="text-[11px] text-muted-foreground">{d.date}</p>
                  <p className="text-sm font-semibold mt-0.5">{d.listingTitle}</p>
                  <p className="text-sm font-bold text-success">+{formatETB(d.amount)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, sub }) {
  return (
    <Card className="p-4" hover={false}>
      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center mb-2"><Icon className="w-4 h-4"/></div>
      <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-xl font-display font-bold mt-1">{value}</p>
      {sub && <p className="text-xs text-success mt-0.5 font-semibold">{sub}</p>}
    </Card>
  );
}

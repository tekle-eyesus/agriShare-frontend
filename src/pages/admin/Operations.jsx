import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertTriangle,
  Search,
  Database,
  Download,
  Upload,
  RotateCw,
  Power,
  Wrench,
  Activity,
  CheckCircle2,
  Server,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, YAxis } from "recharts";
import { PageHeader, Card, StatusBadge } from "../../components/admin/shared";
import { formatETB } from "../../utils/format";

const flagsInit = [
  {
    id: "listings",
    label: "Listing creation",
    desc: "Allow farmers to create new listings",
    on: true,
  },
  {
    id: "investors",
    label: "Investor registration",
    desc: "Allow new investor signups",
    on: true,
  },
  {
    id: "users",
    label: "New user registration",
    desc: "Allow general account creation",
    on: true,
  },
  {
    id: "maintenance",
    label: "Maintenance mode",
    desc: "Block all non-admin requests",
    on: false,
  },
];

export default function Operations() {
  const [listingId, setListingId] = useState("");
  const [fetched, setFetched] = useState(null);
  const [force, setForce] = useState(false);
  const [reason, setReason] = useState("");
  const [flags, setFlags] = useState(flagsInit);
  const [maintMsg, setMaintMsg] = useState(
    "AgriShare is undergoing scheduled maintenance. We'll be back shortly.",
  );

  const fetchListing = () => {
    if (!listingId) return;
    setFetched({
      title: "Teff Farm Expansion",
      goal: 500_000,
      raised: 145_000,
      investors: 12,
      farmerWallet: 32_400,
    });
  };

  const refundable = fetched ? fetched.raised : 0;
  const insufficient = fetched && fetched.farmerWallet < refundable;

  return (
    <>
      <PageHeader
        title="Operations"
        subtitle="Manual refunds, feature flags, system health and database management."
      />

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
        {/* Manual refund */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="place-items-center grid bg-error/10 rounded-lg w-9 h-9 text-error">
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Manual Refund</h3>
              <p className="text-muted-foreground text-xs">
                Refund all investors of a failed or cancelled listing.
              </p>
            </div>
          </div>

          <div className="gap-5 grid grid-cols-1 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 font-medium text-xs label-text">
                  Listing ID
                </label>
                <div className="w-full join">
                  <label className="flex flex-1 items-center gap-2 rounded-l-lg join-item input input-bordered">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                      value={listingId}
                      onChange={(e) => setListingId(e.target.value)}
                      placeholder="LST-101"
                      className="bg-transparent outline-none text-sm grow"
                    />
                  </label>
                  <button
                    onClick={fetchListing}
                    className="normal-case join-item btn btn-primary"
                  >
                    Fetch details
                  </button>
                </div>
              </div>
              <div>
                <label className="block mb-1.5 font-medium text-xs label-text">
                  Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="Required reason for the refund…"
                  className="rounded-xl w-full text-sm textarea textarea-bordered"
                />
              </div>
              <label
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer ${force ? "bg-warning/10 border border-warning/30" : "bg-base-200"}`}
              >
                <input
                  type="checkbox"
                  checked={force}
                  onChange={() => setForce(!force)}
                  className="mt-0.5 checkbox checkbox-warning checkbox-sm"
                />
                <div>
                  <p className="flex items-center gap-2 font-semibold text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning" /> Force
                    refund
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    Bypasses balance check. Platform covers shortfall.
                  </p>
                </div>
              </label>
              <button
                disabled={!fetched || !reason}
                className="w-full normal-case btn btn-error"
              >
                Process refund
              </button>
            </div>

            <aside className="space-y-3 bg-base-200 p-4 rounded-xl">
              <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Preview
              </p>
              {!fetched ? (
                <p className="text-muted-foreground text-sm italic">
                  Fetch a listing to see refund preview.
                </p>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Listing</span>
                    <span className="font-semibold">{fetched.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="font-semibold tabular-nums">
                      {formatETB(fetched.goal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-semibold tabular-nums">
                      {formatETB(fetched.raised)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investors</span>
                    <span className="font-semibold">{fetched.investors}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-base-300 border-t text-sm">
                    <span className="text-muted-foreground">Refundable</span>
                    <span className="font-bold tabular-nums text-primary">
                      {formatETB(refundable)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Farmer wallet</span>
                    <span
                      className={`font-semibold tabular-nums ${insufficient ? "text-error" : ""}`}
                    >
                      {formatETB(fetched.farmerWallet)}
                    </span>
                  </div>
                  {insufficient && (
                    <div className="flex items-start gap-2 bg-error/10 p-2 rounded-lg text-error text-xs">
                      <AlertTriangle className="mt-0.5 w-3.5 h-3.5 shrink-0" />
                      Insufficient farmer balance — enable Force refund to
                      proceed.
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        </Card>

        {/* Feature flags */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="place-items-center grid bg-accent/10 rounded-lg w-9 h-9 text-accent">
              <Power className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg">Feature Flags</h3>
          </div>
          <div className="space-y-2">
            {flags.map((f) => (
              <label
                key={f.id}
                className="flex items-center gap-3 bg-base-200 p-3 rounded-xl cursor-pointer"
              >
                <div className="flex-1">
                  <p className="flex items-center gap-2 font-semibold text-sm">
                    {f.label}
                    {f.id === "maintenance" && f.on && (
                      <span className="font-bold badge badge-warning badge-xs">
                        ACTIVE
                      </span>
                    )}
                  </p>
                  <p className="text-muted-foreground text-xs">{f.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={f.on}
                  onChange={() =>
                    setFlags((p) =>
                      p.map((x) => (x.id === f.id ? { ...x, on: !x.on } : x)),
                    )
                  }
                  className="toggle toggle-primary"
                />
              </label>
            ))}
            {flags.find((f) => f.id === "maintenance").on && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <textarea
                  value={maintMsg}
                  onChange={(e) => setMaintMsg(e.target.value)}
                  rows={2}
                  className="mt-2 rounded-xl w-full text-sm textarea textarea-bordered textarea-warning"
                  placeholder="Maintenance message…"
                />
              </motion.div>
            )}
          </div>
        </Card>

        {/* System health */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="place-items-center grid bg-info/10 rounded-lg w-9 h-9 text-info">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg">System Health</h3>
          </div>
          <div className="space-y-3">
            <HealthRow
              icon={Database}
              label="MongoDB"
              value="Connected"
              sub="Backup 2h ago"
              ok
            />
            <HealthRow
              icon={Server}
              label="Blockchain"
              value="Synced"
              sub="Block #4,521,345"
              ok
            />
            <HealthRow
              icon={Activity}
              label="API p95"
              value="124ms"
              sub="Last 10 min"
              warn
            />
            <HealthRow
              icon={CheckCircle2}
              label="Queues"
              value="11 pending"
              sub="Verifications + refunds"
            />
          </div>
          <div className="-mx-2 mt-4 h-20">
            <ResponsiveContainer>
              <LineChart
                data={Array.from({ length: 30 }, (_, i) => ({
                  x: i,
                  ms: 80 + Math.sin(i / 3) * 30 + Math.random() * 20,
                }))}
              >
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="ms"
                  stroke="#2196F3"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Backup */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="place-items-center grid bg-success/10 rounded-lg w-9 h-9 text-success">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg">Database Backup</h3>
          </div>
          <div className="space-y-1.5 bg-base-200 mb-4 p-4 rounded-xl text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last backup</span>
              <span className="font-semibold">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size</span>
              <span className="font-semibold">487 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retention</span>
              <span className="font-semibold">30 days</span>
            </div>
          </div>
          <div className="gap-2 grid grid-cols-2">
            <button className="gap-2 normal-case btn btn-primary">
              <Upload className="w-3.5 h-3.5" /> Trigger backup
            </button>
            <button className="gap-2 btn-outline normal-case btn">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button className="gap-2 col-span-2 btn-outline normal-case btn btn-error">
              <Wrench className="w-3.5 h-3.5" /> Restore from backup…
            </button>
          </div>
        </Card>

        {/* Activity log */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-bold text-lg">
              Admin Activity Log
            </h3>
            <input
              placeholder="Search admin or action…"
              className="rounded-lg w-56 input input-sm input-bordered"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Time</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Teklehiwot M.",
                    "approved",
                    "Farmer FYD-123456",
                    "2 min ago",
                    "10.0.1.41",
                  ],
                  [
                    "Daniel A.",
                    "rejected",
                    "Asset AST-009",
                    "20 min ago",
                    "10.0.1.13",
                  ],
                  [
                    "Selam T.",
                    "force_refund",
                    "Listing LST-098",
                    "1 hr ago",
                    "10.0.1.22",
                  ],
                  [
                    "Yodit S.",
                    "toggled_flag",
                    "maintenance:on",
                    "2 hr ago",
                    "10.0.1.4",
                  ],
                  ["Daniel A.", "trigger_backup", "—", "3 hr ago", "10.0.1.13"],
                ].map((r, i) => (
                  <tr key={i}>
                    <td className="font-semibold text-sm">{r[0]}</td>
                    <td>
                      <StatusBadge status={r[1]} />
                    </td>
                    <td className="text-sm">{r[2]}</td>
                    <td className="text-muted-foreground text-sm">{r[3]}</td>
                    <td className="font-mono text-muted-foreground text-xs">
                      {r[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}

function HealthRow({ icon: Icon, label, value, sub, ok, warn }) {
  return (
    <div className="flex items-center gap-3 bg-base-200/60 p-3 rounded-xl">
      <div
        className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${
          warn
            ? "bg-warning/15 text-warning"
            : ok
              ? "bg-success/15 text-success"
              : "bg-info/15 text-info"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{label}</p>
        <p className="text-[11px] text-muted-foreground truncate">{sub}</p>
      </div>
      <span
        className={`badge badge-sm font-semibold ${warn ? "badge-warning" : ok ? "badge-success" : "badge-info"}`}
      >
        {value}
      </span>
    </div>
  );
}

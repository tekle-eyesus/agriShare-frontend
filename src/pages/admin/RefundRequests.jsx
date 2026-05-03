import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Award,
} from "lucide-react";
import {
  PageHeader,
  Card,
  StatusBadge,
  EmptyState,
} from "../../components/admin/shared";
import { REFUND_REQUESTS } from "../../mock-data/admin/data";
import { formatETB } from "../../utils/format";
import RequestModal from "../../components/admin/refund-requests/RequestModal";

export default function RefundRequests() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [active, setActive] = useState(null);
  const [note, setNote] = useState("");
  const [force, setForce] = useState(false);

  const filtered = useMemo(
    () =>
      REFUND_REQUESTS.filter((r) => {
        if (
          q &&
          !`${r.investor} ${r.farmer} ${r.id}`
            .toLowerCase()
            .includes(q.toLowerCase())
        )
          return false;
        if (status !== "All" && r.status !== status.toLowerCase()) return false;
        return true;
      }),
    [q, status],
  );

  const totalAmount = filtered.reduce((s, r) => s + r.amount, 0);

  return (
    <>
      <PageHeader
        title="Refund Requests"
        subtitle="Review investor refund requests per BR-004 Share Purchase and BR-005 Profit Distribution rules."
      />

      <div className="gap-3 grid grid-cols-2 lg:grid-cols-4 mb-5">
        <SummaryCard
          label="Pending requests"
          value={filtered.length}
          icon={Clock}
          color="warning"
        />
        <SummaryCard
          label="Total amount"
          value={formatETB(totalAmount)}
          icon={DollarSign}
          color="error"
        />
        <SummaryCard
          label="Avg processing"
          value="2.4 days"
          icon={TrendingUp}
          color="info"
        />
        <SummaryCard
          label="Success rate"
          value="94%"
          icon={Award}
          color="success"
        />
      </div>

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside>
          <Card className="space-y-4 p-4">
            <div>
              <label className="block mb-1.5 font-medium text-xs label-text">
                Search
              </label>
              <label className="flex items-center gap-2 rounded-lg input input-sm input-bordered">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Investor, farmer, ID…"
                  className="bg-transparent outline-none text-sm grow"
                />
              </label>
            </div>
            <div>
              <label className="block mb-1.5 font-medium text-xs label-text">
                Status
              </label>
              <div className="space-y-1">
                {["All", "Pending", "Approved", "Rejected"].map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-2 hover:bg-base-200 p-1.5 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      checked={status === s}
                      onChange={() => setStatus(s)}
                      className="radio radio-xs radio-primary"
                    />
                    <span className="text-sm">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </aside>

        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No refund requests"
              message="Try adjusting your filters."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="text-muted-foreground text-xs uppercase tracking-wider">
                  <tr>
                    <th>Request</th>
                    <th className="hidden md:table-cell">Listing</th>
                    <th>Amount</th>
                    <th className="hidden lg:table-cell">Date</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-base-200/60"
                    >
                      <td>
                        <p className="font-semibold text-sm">{r.investor}</p>
                        <p className="font-mono text-muted-foreground text-xs">
                          {r.id}
                        </p>
                      </td>
                      <td className="hidden md:table-cell text-sm">
                        <p className="font-medium">{r.listing}</p>
                        <p className="text-muted-foreground text-xs">
                          {r.farmer}
                        </p>
                      </td>
                      <td>
                        <p className="font-bold tabular-nums text-sm">
                          {formatETB(r.amount)}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {r.shares} shares
                        </p>
                      </td>
                      <td className="hidden lg:table-cell text-muted-foreground text-sm">
                        {r.requestedAt}
                      </td>
                      <td>
                        <StatusBadge status={r.status} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setActive(r)}
                            className="btn btn-ghost btn-xs btn-square"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setActive(r)}
                            className="hidden sm:inline-flex gap-1 normal-case btn btn-success btn-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => setActive(r)}
                            className="hidden sm:inline-flex gap-1 btn-outline normal-case btn btn-error btn-xs"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
      <RequestModal
        active={active}
        setActive={setActive}
        note={note}
        setNote={setNote}
        force={force}
        setForce={setForce}
      />
    </>
  );
}

function SummaryCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl grid place-items-center ${colorMap[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[11px] text-muted-foreground truncate uppercase tracking-wider">
            {label}
          </p>
          <p className="font-display font-bold text-lg truncate">{value}</p>
        </div>
      </div>
    </Card>
  );
}

import { Card, EmptyState, StatusBadge } from "../../investor/Shared";
import { formatETB } from "../../../utils/format";
import Timeline from "./Timeline";
import { FileText } from "lucide-react";

const STATUS_FILTERS = ["All", "pending", "approved", "rejected"];

function Requests({ filtered, filter, setFilter }) {
  return (
    <div className="space-y-4 lg:col-span-2">
      <Card className="p-4" hover={false}>
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="font-display font-bold">My requests</h3>
          <div className="join">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`join-item btn btn-xs capitalize ${filter === s ? "btn-primary" : "btn-outline"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card className="p-0" hover={false}>
          <EmptyState
            title="No refund requests"
            message="Once you submit a request, it will appear here."
            icon={FileText}
          />
        </Card>
      ) : (
        <DesktopTable filtered={filtered} />
      )}

      <MobileCard filtered={filtered} />

      {filtered[0] && (
        <Card className="p-5" hover={false}>
          <h3 className="mb-4 font-display font-bold">
            Latest request progress
          </h3>
          <Timeline status={filtered[0].status} />
        </Card>
      )}
    </div>
  );
}

function MobileCard({ filtered }) {
  return (
    <div className="md:hidden space-y-3">
      {filtered.map((r) => (
        <Card key={r.id} className="p-4" hover={false}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{r.listingTitle}</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                {r.id}
              </p>
            </div>
            <StatusBadge status={r.status} />
          </div>
          <div className="gap-2 grid grid-cols-2 mt-3 text-xs">
            <div className="bg-base-200 p-2 rounded-lg">
              <p className="text-muted-foreground">Amount</p>
              <p className="font-bold">{formatETB(r.amount)}</p>
            </div>
            <div className="bg-base-200 p-2 rounded-lg">
              <p className="text-muted-foreground">Date</p>
              <p className="font-bold">{r.requestedAt}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function DesktopTable({ filtered }) {
  return (
    <Card className="hidden md:block p-0 overflow-hidden" hover={false}>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Listing</th>
              <th>Amount</th>
              <th>Shares</th>
              <th>Date</th>
              <th>Status</th>
              <th>Admin note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className="font-mono text-xs">{r.id}</td>
                <td className="font-semibold">{r.listingTitle}</td>
                <td>{formatETB(r.amount)}</td>
                <td>{r.shares}</td>
                <td className="text-xs">{r.requestedAt}</td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td className="max-w-[180px] text-muted-foreground text-xs truncate">
                  {r.adminNote || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default Requests;

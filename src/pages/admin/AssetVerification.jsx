import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Sprout,
  Beef,
} from "lucide-react";
import {
  PageHeader,
  StatusBadge,
  Card,
  EmptyState,
} from "../../components/admin/shared";
import VerificationModal from "../../components/admin/asset-verification/VerificationModal";
import { PENDING_ASSETS } from "../../mock-data/admin/data";

export default function AssetVerifications() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [region, setRegion] = useState("All");
  const [active, setActive] = useState(null);
  const [comment, setComment] = useState("");

  const filtered = useMemo(
    () =>
      PENDING_ASSETS.filter((a) => {
        if (
          q &&
          !`${a.name} ${a.farmer}`.toLowerCase().includes(q.toLowerCase())
        )
          return false;
        if (type !== "All" && a.type !== type) return false;
        if (region !== "All" && a.region !== region) return false;
        return true;
      }),
    [q, type, region],
  );

  return (
    <>
      <PageHeader
        title="Asset Verifications"
        subtitle="Verify farmland boundaries, livestock counts, and supporting documentation."
        actions={
          <span className="font-semibold badge badge-warning badge-lg">
            {filtered.filter((a) => a.status === "pending").length} pending
          </span>
        }
      />

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside>
          <Card className="space-y-4 p-4">
            <p className="flex items-center gap-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" /> Filters
            </p>
            <div>
              <label className="block mb-1.5 font-medium text-xs label-text">
                Search
              </label>
              <label className="flex items-center gap-2 rounded-lg input input-sm input-bordered">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Asset or farmer…"
                  className="bg-transparent outline-none text-sm grow"
                />
              </label>
            </div>
            <div>
              <label className="block mb-1.5 font-medium text-xs label-text">
                Asset Type
              </label>
              <div className="w-full join">
                {["All", "Farmland", "Livestock"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`join-item btn btn-sm flex-1 normal-case ${type === t ? "btn-primary" : "btn-outline"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1.5 font-medium text-xs label-text">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-lg w-full select-bordered select-sm select"
              >
                {["All", "Amhara", "Oromia", "SNNPR", "Tigray"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </Card>
        </aside>

        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No assets to review"
              message="Try adjusting your filters."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="text-muted-foreground text-xs uppercase tracking-wider">
                  <tr>
                    <th>Asset</th>
                    <th className="hidden md:table-cell">Type</th>
                    <th className="hidden lg:table-cell">Farmer</th>
                    <th className="hidden lg:table-cell">Location</th>
                    <th className="hidden xl:table-cell">Submitted</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <motion.tr
                      key={a.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-base-200/60"
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl grid place-items-center ${a.type === "Farmland" ? "bg-success/10 text-success" : "bg-info/10 text-info"}`}
                          >
                            {a.type === "Farmland" ? (
                              <Sprout className="w-5 h-5" />
                            ) : (
                              <Beef className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{a.name}</p>
                            <p className="font-mono text-[11px] text-muted-foreground">
                              {a.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        <StatusBadge status={a.type} />
                      </td>
                      <td className="hidden lg:table-cell text-sm">
                        {a.farmer}
                      </td>
                      <td className="hidden lg:table-cell text-sm">
                        {a.region}
                      </td>
                      <td className="hidden xl:table-cell text-muted-foreground text-sm">
                        {a.submittedAt}
                      </td>
                      <td>
                        <StatusBadge status={a.status} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setActive(a)}
                            className="btn btn-ghost btn-xs btn-square"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="hidden sm:inline-flex gap-1 normal-case btn btn-success btn-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button className="hidden sm:inline-flex gap-1 btn-outline normal-case btn btn-error btn-xs">
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
      <VerificationModal
        active={active}
        setActive={setActive}
        comment={comment}
        setComment={setComment}
      />
    </>
  );
}

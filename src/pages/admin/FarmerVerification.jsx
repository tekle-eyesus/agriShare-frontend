import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  PageHeader,
  StatusBadge,
  Card,
  EmptyState,
} from "../../components/admin/shared";
import Modal from "../../components/admin/Modal";
import { PENDING_FARMERS } from "../../mock-data/admin/data";

const REGIONS = ["All", "Amhara", "Oromia", "SNNPR", "Tigray"];
const STATUSES = ["pending", "verified", "rejected"];

export default function FarmerVerifications() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const [statusFilter, setStatusFilter] = useState(["pending"]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const [comment, setComment] = useState("");
  const PER = 8;

  const filtered = useMemo(() => {
    return PENDING_FARMERS.filter((f) => {
      if (q && !`${f.name} ${f.id}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (region !== "All" && f.region !== region) return false;
      if (statusFilter.length && !statusFilter.includes(f.status)) return false;
      return true;
    });
  }, [q, region, statusFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER));
  const view = filtered.slice((page - 1) * PER, page * PER);
  const allSel = view.every((v) => selected.includes(v.id)) && view.length > 0;

  const toggleStatus = (s) => {
    setStatusFilter((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
    );
  };

  return (
    <>
      <PageHeader
        title="Farmer Verifications"
        subtitle="Review Fayda ID submissions, verify identities and approve farmer onboarding."
        actions={
          <>
            <button className="gap-2 btn-outline normal-case btn btn-sm">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <span className="font-semibold badge badge-warning badge-lg">
              {filtered.filter((f) => f.status === "pending").length} pending
            </span>
          </>
        }
      />

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Filter sidebar */}
        <aside className="space-y-3">
          <Card className="p-4">
            <p className="flex items-center gap-2 mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5" /> Filters
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 font-medium text-xs label-text">
                  Search
                </label>
                <label className="flex items-center gap-2 rounded-lg input input-sm input-bordered">
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Name or ID…"
                    className="bg-transparent outline-none text-sm grow"
                  />
                </label>
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
                  {REGIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1.5 font-medium text-xs label-text">Status</p>
                <div className="space-y-1.5">
                  {STATUSES.map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(s)}
                        onChange={() => toggleStatus(s)}
                        className="checkbox checkbox-sm checkbox-primary"
                      />
                      <span className="text-sm capitalize">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setQ("");
                  setRegion("All");
                  setStatusFilter(["pending"]);
                }}
                className="w-full text-muted-foreground normal-case btn btn-ghost btn-sm"
              >
                Reset filters
              </button>
            </div>
          </Card>
        </aside>

        {/* Table */}
        <Card className="overflow-hidden">
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center gap-3 bg-primary/5 px-4 py-3 border-primary/15 border-b"
            >
              <p className="font-semibold text-sm">
                {selected.length} selected
              </p>
              <div className="flex gap-2">
                <button className="gap-1 normal-case btn btn-sm btn-success">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Bulk approve
                </button>
                <button className="gap-1 btn-outline normal-case btn btn-sm btn-error">
                  <XCircle className="w-3.5 h-3.5" /> Bulk reject
                </button>
                <button
                  onClick={() => setSelected([])}
                  className="normal-case btn btn-sm btn-ghost"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}

          {view.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No farmers match your filters"
              message="Try adjusting region or status."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-muted-foreground text-xs uppercase tracking-wider">
                    <th>
                      <input
                        type="checkbox"
                        checked={allSel}
                        className="checkbox checkbox-sm checkbox-primary"
                        onChange={() =>
                          setSelected(
                            allSel
                              ? selected.filter(
                                  (s) => !view.find((v) => v.id === s),
                                )
                              : [
                                  ...new Set([
                                    ...selected,
                                    ...view.map((v) => v.id),
                                  ]),
                                ],
                          )
                        }
                      />
                    </th>
                    <th>Farmer</th>
                    <th className="hidden md:table-cell">Fayda ID</th>
                    <th className="hidden lg:table-cell">Region</th>
                    <th className="hidden lg:table-cell">Submitted</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {view.map((f, i) => (
                    <motion.tr
                      key={f.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-base-200/60"
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(f.id)}
                          className="checkbox checkbox-sm checkbox-primary"
                          onChange={() =>
                            setSelected((p) =>
                              p.includes(f.id)
                                ? p.filter((x) => x !== f.id)
                                : [...p, f.id],
                            )
                          }
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="rounded-full w-9 text-primary-content gradient-primary">
                              <span className="font-bold text-xs">
                                {f.name
                                  .split(" ")
                                  .map((s) => s[0])
                                  .join("")}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{f.name}</p>
                            <p className="md:hidden text-muted-foreground text-xs">
                              {f.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell font-mono text-xs">
                        {f.id}
                      </td>
                      <td className="hidden lg:table-cell text-sm">
                        {f.region}
                      </td>
                      <td className="hidden lg:table-cell text-muted-foreground text-sm">
                        {f.submittedAt}
                      </td>
                      <td>
                        <StatusBadge status={f.status} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setActive(f)}
                            className="btn btn-ghost btn-xs btn-square"
                            aria-label="View"
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

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3 border-base-300 border-t">
            <p className="text-muted-foreground text-xs">
              Showing{" "}
              <b>
                {(page - 1) * PER + 1}–{Math.min(page * PER, filtered.length)}
              </b>{" "}
              of <b>{filtered.length}</b>
            </p>
            <div className="join">
              <button
                className="join-item btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  className={`join-item btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm"
                disabled={page === pages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Detail modal */}
      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title="Farmer Verification"
        size="xl"
      >
        {active && (
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] p-6">
            <div className="space-y-5">
              <div>
                <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Identity Documents
                </p>
                <div className="gap-2 grid grid-cols-3">
                  {["Fayda ID — Front", "Fayda ID — Back", "Selfie"].map(
                    (label) => (
                      <div
                        key={label}
                        className="relative place-items-center grid bg-linear-to-br from-primary/15 to-accent/15 p-3 border border-base-300 rounded-xl aspect-3/4 overflow-hidden text-center gradient-primary/20"
                      >
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 30% 30%, white, transparent 60%)",
                          }}
                        />
                        <p className="z-10 font-semibold text-[11px] text-base-content/70">
                          {label}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Verification Notes
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Add a note for the farmer (required for rejection)…"
                  className="rounded-xl w-full text-sm textarea textarea-bordered"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 gap-2 normal-case btn btn-success">
                  <CheckCircle2 className="w-4 h-4" /> Approve verification
                </button>
                <button className="gap-2 btn-outline normal-case btn btn-error">
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="rounded-full w-14 text-primary-content gradient-primary">
                    <span className="font-bold">
                      {active.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-display font-bold">{active.name}</p>
                  <p className="text-muted-foreground text-xs">{active.id}</p>
                  <div className="mt-1">
                    <StatusBadge status={active.status} />
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 bg-base-200 p-4 rounded-xl text-sm">
                {[
                  ["Email", active.email],
                  ["Phone", active.phone],
                  ["Region", active.region],
                  ["Zone", active.zone],
                  ["Woreda", active.woreda],
                  ["Kebele", active.kebele],
                  ["Submitted", active.submittedAt],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </Modal>
    </>
  );
}

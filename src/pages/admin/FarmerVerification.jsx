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
  Loader2,
} from "lucide-react";
import {
  PageHeader,
  StatusBadge,
  Card,
  EmptyState,
} from "../../components/admin/shared";
import Modal from "../../components/admin/Modal";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";
import VerificationDetailModal from "../../components/admin/verification/VerificationDetailModal";
import { useIntersectionObserver } from "../../hook/useIntersectionObserver";

const REGIONS = ["All", "Amhara", "Oromia", "SNNPR", "Tigray"];
const STATUSES = ["pending", "rejected"];

export default function FarmerVerifications() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const [statusFilter, setStatusFilter] = useState(["pending"]);
  const [active, setActive] = useState(null);
  const [comment, setComment] = useState("");
  
  const { admin } = useAPI();
  
  const { data: verificationsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["pending-farmers-verification"],
    queryFn: ({ pageParam = 1 }) => admin.getVerificationQueue({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });

  const pendingVerifications = verificationsData?.pages.flatMap(page => page.data?.items || []) || [];

  const filtered = useMemo(() => {
    return pendingVerifications.filter((f) => {
      if (
        q &&
        (!`${f.user.firstName} ${f.user.lastName}`
          .toLowerCase()
          .includes(q.toLowerCase()) ||
          !`${f.faydaIdNumber}`.toLowerCase().includes(q.toLowerCase()))
      )
        return false;
      if (region !== "All" && f.user.region !== region) return false;
      if (statusFilter.length && !statusFilter.includes(f.status)) return false;
      return true;
    });
  }, [q, region, statusFilter, pendingVerifications]);

  const view = filtered;

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const toggleStatus = (s) => {
    setStatusFilter((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
    );
  };

  const noFilters =
    !q &&
    region === "All" &&
    statusFilter.length === 1 &&
    statusFilter[0] === "pending";

  return (
    <>
      <PageHeader
        title="Farmer Verifications"
        subtitle="Review Fayda ID submissions, verify identities and approve farmer onboarding."
        actions={
          <>
            <button className="gap-2 border border-gray-200 btn-outline normal-case btn btn-sm">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <span className="p-2 font-semibold text-sm! badge badge-warning badge-md">
              {filtered.filter((f) => f.status === "pending").length} pending
            </span>
          </>
        }
      />

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-[260px_1fr]">
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
                <p className="mb-1.5 font-medium text-xs label-text">
                  Status
                </p>
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

        <Card className="overflow-hidden">
          {view.length === 0 ? (
            <EmptyState
              style="2xl:min-w-xl sm:min-w-lg"
              icon={Search}
              title={
                noFilters ? "No farmers found" : "No farmers match your filters"
              }
              message={!noFilters && "Try adjusting region or status."}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-muted-foreground text-xs uppercase tracking-wider">
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
                      key={f._id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-base-200/60 cursor-pointer"
                      onClick={() => setActive(f)}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="rounded-full w-9 h-9 text-primary-content gradient-primary"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {f.user.firstName}
                            </p>
                            <p className="md:hidden text-muted-foreground text-xs">
                              {f.faydaIdNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell font-mono text-xs">
                        {f.faydaIdNumber}
                      </td>
                      <td className="hidden lg:table-cell text-sm">
                        {f.user.region}
                      </td>
                      <td className="hidden lg:table-cell text-muted-foreground text-sm">
                        {new Date(f.submittedAt).toLocaleDateString()}
                      </td>
                      <td>
                        <StatusBadge status={f.status} />
                      </td>
                      <td>
                        <div className="flex justify-end gap-1 mr-4">
                          <button
                            onClick={() => setActive(f)}
                            className="btn btn-ghost btn-xs btn-square"
                            aria-label="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          {view.length > 0 && (
            <div
              ref={loadMoreRef}
              className="flex justify-center p-4 min-h-[40px] border-base-300 border-t"
            >
              {isFetchingNextPage ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : hasNextPage ? (
                <span className="text-sm text-muted-foreground">
                  Scroll for more
                </span>
              ) : null}
            </div>
          )}
        </Card>
      </div>

      <VerificationDetailModal
        active={active}
        setActive={setActive}
        comment={comment}
        setComment={setComment}
      />
    </>
  );
}

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Clock,
  TrendingUp,
  DollarSign,
  Award,
  Loader2,
} from "lucide-react";
import {
  PageHeader,
  Card,
  StatusBadge,
  EmptyState,
} from "../../components/admin/shared";
import { formatETB } from "../../utils/format";
import RequestModal from "../../components/admin/refund-requests/RequestModal";
import { useAPI } from "../../hook/useApi";
import {
  useSuspenseInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useIntersectionObserver } from "../../hook/useIntersectionObserver";

export default function RefundRequests() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [active, setActive] = useState(null);
  const [note, setNote] = useState("");
  const [force, setForce] = useState(false);
  const { admin } = useAPI();
  const queryClient = useQueryClient();
  
  const { data: refundsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["admin-refund-requests"],
    queryFn: ({ pageParam = 1 }) => admin.getRefundRequests({ status: status !== "All" ? status.toLowerCase() : "all", page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });

  const refundRequests = refundsData?.pages.flatMap(page => page.data?.refundRequests || []) || [];

  const filtered = useMemo(
    () =>
      refundRequests.filter((r) => {
        if (
          q &&
          !`${r.investor?.firstName} ${r.investor?.lastName} ${r.farmer?.firstName} ${r.farmer?.lastName} ${r._id}`
            .toLowerCase()
            .includes(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [q, refundRequests],
  );

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const totalAmount = filtered.reduce((s, r) => s + r.refundAmountBirr, 0);

  const reviewRefundMutation = useMutation({
    mutationFn: ({ refundRequestId, data }) =>
      admin.reviewRefund({ refundRequestId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-refund-requests"]);
      setActive(null);
      setNote("");
      setForce(false);
    },
  });

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
                      key={r._id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-base-200/60"
                    >
                      <td>
                        <p className="font-semibold text-sm">
                          {r.investor?.firstName} {r.investor?.lastName}
                        </p>
                        <p className="font-mono text-muted-foreground text-xs">
                          {r._id}
                        </p>
                      </td>
                      <td className="hidden md:table-cell text-sm">
                        <p className="font-medium">{r.listing?.pitchTitle}</p>
                        <p className="text-muted-foreground text-xs">
                          {r.farmer?.firstName} {r.farmer?.lastName}
                        </p>
                      </td>
                      <td>
                        <p className="font-bold tabular-nums text-sm">
                          {formatETB(r.refundAmountBirr)}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {r.sharesCount} shares
                        </p>
                      </td>
                      <td className="hidden lg:table-cell text-muted-foreground text-sm">
                        {new Date(r.createdAt).toLocaleDateString()}
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
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <div
                ref={loadMoreRef}
                className="flex justify-center p-4 min-h-[40px]"
              >
                {isFetchingNextPage ? (
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                ) : hasNextPage ? (
                  <span className="text-sm text-muted-foreground">
                    Scroll for more
                  </span>
                ) : null}
              </div>
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
        reviewRefundMutation={reviewRefundMutation}
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

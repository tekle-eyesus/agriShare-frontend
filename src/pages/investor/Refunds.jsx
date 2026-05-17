import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PageHeader, Card, EmptyState } from "../../components/investor/Shared";
import RefundForm from "../../components/investor/refund/RefundForm";
import Requests from "../../components/investor/refund/Requests";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";
import toast from "react-hot-toast";

export default function Refunds() {
  const { investor } = useAPI();
  const queryClient = useQueryClient();

  const [listingId, setListingId] = useState("");
  const [reason, setReason] = useState("");
  const [agree, setAgree] = useState(false);
  const [filter, setFilter] = useState("All");
  const [submitted, setSubmitted] = useState(false);

  const { data: activeRes } = useQuery({
    queryKey: ["active-investments"],
    queryFn: investor.getActiveInvestments,
  });

  const {
    data: refundsRes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["refund-requests", filter],
    queryFn: ({ pageParam = 1 }) => investor.getRefundRequest({ status: filter === "All" ? "all" : filter.toLowerCase(), page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1
  });

  const active = useMemo(() => {
    const list = activeRes?.data?.investments || [];
    return list.map(inv => {
      const listing = inv.listing || {};
      const shares = inv.sharesOwned || inv.shares || 0;
      const sharePrice = listing.sharePricePerTokenBirr || 0;
      return {
        id: inv._id,
        listingId: listing._id,
        listingTitle: listing.pitchTitle || listing.asset?.name || "Unknown Listing",
        status: inv.status,
        shares,
        amountInvested: shares * sharePrice,
      };
    });
  }, [activeRes]);

  useEffect(() => {
    if (!listingId && active.length > 0) {
      setListingId(active[0].listingId);
    }
  }, [active, listingId]);

  const selected = active.find((i) => String(i.listingId) === String(listingId)) || active[0];

  const filtered = useMemo(() => {
    const pages = refundsRes?.pages || [];
    const requests = pages.flatMap(page => page.data?.refundRequests || []);
    return requests.map(r => ({
      id: r._id?.substring(0, 8) || r._id,
      listingTitle: r.listing?.pitchTitle || "Investment Listing",
      amount: r.requestedAmountBirr || 0,
      shares: r.requestedShares || 0,
      requestedAt: new Date(r.createdAt || r.requestedAt || Date.now()).toLocaleDateString(),
      status: r.status,
      adminNote: r.adminNote
    }));
  }, [refundsRes]);

  const mutation = useMutation({
    mutationFn: (data) => investor.submitRefundRequest(data),
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
      toast.success("Refund request submitted successfully");
      queryClient.invalidateQueries(["refund-requests"]);
      setReason("");
      setAgree(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to submit refund request");
    }
  });

  const submit = (e) => {
    e.preventDefault();
    if (!listingId || !reason || !agree) return;
    mutation.mutate({ listingId, reason });
  };

  //TODO: make sure the refund form is available through modal in mobile for the responsiveness
  return (
    <div>
      <PageHeader
        title="Refund Requests"
        subtitle="Request a refund of your investment if a project hasn't met its commitments."
      />

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 alert alert-success"
        >
          <CheckCircle2 className="w-5 h-5" /> Your refund request has been
          submitted. Admins will review within 5–10 business days.
        </motion.div>
      )}

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Form */}
        <Card className="lg:col-span-1 p-6" hover={false}>
          <h3 className="mb-1 font-display font-bold text-lg">
            New refund request
          </h3>
          <p className="mb-5 text-muted-foreground text-xs">
            Select an active investment to refund.
          </p>

          {active.length === 0 ? (
            <EmptyState
              title="No eligible investments"
              message="Only active or funded investments can be refunded."
            />
          ) : (
            <RefundForm
              submit={submit}
              listingId={listingId}
              setListingId={setListingId}
              active={active}
              selected={selected}
              reason={reason}
              setReason={setReason}
              agree={agree}
              setAgree={setAgree}
            />
          )}
        </Card>

        <Requests 
          filtered={filtered} 
          filter={filter} 
          setFilter={setFilter} 
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}

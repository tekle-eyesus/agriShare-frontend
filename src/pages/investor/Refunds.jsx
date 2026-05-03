import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PageHeader, Card, EmptyState } from "../../components/investor/Shared";
import { INVESTMENTS, REFUND_REQUESTS } from "../../mock-data/investor/data";
import RefundForm from "../../components/investor/refund/RefundForm";
import Requests from "../../components/investor/refund/Requests";

export default function Refunds() {
  const active = INVESTMENTS.filter(
    (i) => i.status === "active" || i.status === "funded",
  );
  const [listingId, setListingId] = useState(active[0]?.listingId ?? 0);
  const [reason, setReason] = useState("");
  const [agree, setAgree] = useState(false);
  const [filter, setFilter] = useState("All");
  const [submitted, setSubmitted] = useState(false);

  const selected = INVESTMENTS.find((i) => i.listingId === listingId);

  const filtered = useMemo(
    () =>
      REFUND_REQUESTS.filter((r) => filter === "All" || r.status === filter),
    [filter],
  );

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setReason("");
    setAgree(false);
  };

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

        <Requests filtered={filtered} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

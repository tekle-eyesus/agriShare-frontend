import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { formatETB } from "../../../utils/format";
import Modal from "../Modal";

function Field({ label, value, mono, highlight }) {
  return (
    <div
      className={`rounded-xl p-3 ${highlight ? "bg-primary/10 border border-primary/30" : "bg-base-200"}`}
    >
      <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p
        className={`text-sm font-semibold mt-0.5 ${mono ? "font-mono" : ""} ${highlight ? "text-primary" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function RequestModal({ active, setActive, note, setNote, force, setForce }) {
  return (
    <Modal
      open={!!active}
      onClose={() => setActive(null)}
      title="Review refund request"
      size="lg"
    >
      {active && (
        <div className="space-y-5 p-6">
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
            <Field label="Investor" value={active.investor} />
            <Field label="Farmer" value={active.farmer} />
            <Field label="Listing" value={active.listing} />
            <Field label="Request ID" value={active.id} mono />
            <Field label="Amount" value={formatETB(active.amount)} highlight />
            <Field label="Shares" value={active.shares} />
            <Field label="Requested" value={active.requestedAt} />
            <Field label="Status" value={active.status} />
          </div>

          <div>
            <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Reason
            </p>
            <p className="bg-base-200 p-3 rounded-xl text-sm italic">
              "{active.reason}"
            </p>
          </div>

          <div>
            <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Settlement preview
            </p>
            <div className="border border-base-300 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-base-200 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                <div className="p-3">Wallet</div>
                <div className="p-3 text-right">Before</div>
                <div className="p-3 text-right">After</div>
              </div>
              {[
                {
                  w: "Investor",
                  before: 142_500,
                  after: 142_500 + active.amount,
                },
                {
                  w: "Farmer",
                  before: 320_000,
                  after: 320_000 - active.amount,
                },
                {
                  w: "Escrow",
                  before: 580_000,
                  after: 580_000 - active.amount,
                },
              ].map((row) => (
                <div
                  key={row.w}
                  className="grid grid-cols-3 border-base-300 border-t text-sm"
                >
                  <div className="p-3 font-medium">{row.w}</div>
                  <div className="p-3 tabular-nums text-right">
                    {formatETB(row.before)}
                  </div>
                  <div className="p-3 font-semibold tabular-nums text-right">
                    {formatETB(row.after)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Admin note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Required for rejection, optional for approval…"
              className="rounded-xl w-full text-sm textarea textarea-bordered"
            />
          </div>

          <label className="flex items-start gap-3 bg-warning/10 p-3 border border-warning/30 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={force}
              onChange={() => setForce(!force)}
              className="mt-0.5 checkbox checkbox-warning checkbox-sm"
            />
            <div>
              <p className="flex items-center gap-2 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-warning" /> Force refund
              </p>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Override balance checks. Use only when farmer wallet is
                insufficient and platform must cover.
              </p>
            </div>
          </label>

          <div className="flex sm:flex-row flex-col gap-2 pt-2 border-base-300 border-t">
            <button className="flex-1 gap-2 normal-case btn btn-success">
              <CheckCircle2 className="w-4 h-4" /> Approve refund
            </button>
            <button className="flex-1 gap-2 btn-outline normal-case btn btn-error">
              <XCircle className="w-4 h-4" /> Reject request
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default RequestModal;

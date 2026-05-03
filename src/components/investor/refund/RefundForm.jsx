import { Send, AlertTriangle } from "lucide-react";
import { formatETB } from "../../../utils/format";

function RefundForm({
  submit,
  listingId,
  setListingId,
  active,
  selected,
  reason,
  setReason,
  agree,
  setAgree,
}) {
  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Investment
        </label>
        <select
          value={listingId}
          onChange={(e) => setListingId(+e.target.value)}
          className="mt-1.5 w-full select-bordered select-sm select"
        >
          {active.map((i) => (
            <option key={i.id} value={i.listingId}>
              {i.listingTitle}
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="space-y-1 bg-base-200 p-3 rounded-xl text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shares</span>
            <span className="font-semibold">{selected.shares}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Refund amount</span>
            <span className="font-bold text-primary">
              {formatETB(selected.amountInvested)}
            </span>
          </div>
        </div>
      )}

      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Reason (min 20 chars)
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          minLength={20}
          className="mt-1.5 w-full text-sm textarea textarea-bordered"
          rows={4}
          placeholder="Explain why you're requesting a refund…"
        />
        <p className="mt-1 text-[10px] text-muted-foreground">
          {reason.length}/20 minimum
        </p>
      </div>

      <div className="py-2 text-xs alert alert-warning">
        <AlertTriangle className="w-4 h-4" />
        <span>Processing typically takes 5–10 business days.</span>
      </div>

      <label className="flex items-start gap-2 text-xs cursor-pointer">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 checkbox checkbox-primary checkbox-xs"
        />
        <span>
          I understand that approval is at the discretion of AgriShare admins.
        </span>
      </label>

      <button
        type="submit"
        disabled={!agree || reason.length < 20}
        className="gap-2 w-full btn btn-primary"
      >
        <Send className="w-4 h-4" />
        Submit request
      </button>
    </form>
  );
}

export default RefundForm;

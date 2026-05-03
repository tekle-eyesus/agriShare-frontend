import { formatETB } from "../../../utils/format";
import Modal from "../Modal";

function ConfirmationModal({
  confirm,
  setConfirm,
  listing,
  shares,
  total,
  payment,
  setPayment,
  agree,
  setAgree,
}) {
  return (
    <Modal
      open={confirm}
      onClose={() => setConfirm(false)}
      title="Confirm investment"
      size="md"
    >
      <div className="space-y-4 p-6">
        <div className="space-y-2 bg-base-200 p-4 rounded-xl text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Listing</span>
            <span className="font-semibold text-right">{listing.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shares</span>
            <span className="font-semibold">{shares}</span>
          </div>
          <div className="flex justify-between pt-2 border-base-300 border-t text-base">
            <span>Total</span>
            <span className="font-bold text-primary">{formatETB(total)}</span>
          </div>
        </div>
        <div>
          <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
            Payment method
          </label>
          <div className="mt-2 w-full join">
            {["Wallet", "Telebirr", "Chapa"].map((p) => (
              <button
                key={p}
                onClick={() => setPayment(p)}
                className={`join-item btn btn-sm flex-1 ${payment === p ? "btn-primary" : "btn-outline"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-start gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 checkbox checkbox-primary checkbox-xs"
          />
          <span>
            I agree to the AgriShare investor terms and acknowledge the risks
            involved.
          </span>
        </label>
        <button disabled={!agree} className="w-full btn btn-primary">
          Confirm & invest
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;

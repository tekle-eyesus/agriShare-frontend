import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { WALLET } from "../../../mock-data/investor/data";
import { formatETB } from "../../../utils/format";

function WithdrawForm({ onClose }) {
  const [amount, setAmount] = useState(500);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="space-y-4 p-6"
    >
      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Amount (max {formatETB(WALLET.balance)})
        </label>
        <input
          type="number"
          min={100}
          max={WALLET.balance}
          value={amount}
          onChange={(e) => setAmount(+e.target.value || 0)}
          className="mt-1.5 w-full input input-bordered"
          required
        />
      </div>
      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Bank
        </label>
        <select className="mt-1.5 w-full select-bordered select">
          <option>Commercial Bank of Ethiopia</option>
          <option>Awash Bank</option>
          <option>Dashen Bank</option>
        </select>
      </div>
      <div className="gap-3 grid grid-cols-2">
        <div>
          <label className="font-semibold text-xs uppercase tracking-wide">
            Account name
          </label>
          <input
            className="mt-1.5 w-full input input-bordered"
            defaultValue="Yodit Solomon"
          />
        </div>
        <div>
          <label className="font-semibold text-xs uppercase tracking-wide">
            Account number
          </label>
          <input
            className="mt-1.5 w-full input input-bordered"
            defaultValue="1000123456789"
          />
        </div>
      </div>
      <div className="py-2 text-xs alert alert-warning">
        <AlertCircle className="w-4 h-4" />
        Processing takes 1–3 business days.
      </div>
      <button type="submit" className="w-full btn btn-primary">
        Request withdrawal
      </button>
    </form>
  );
}

export default WithdrawForm;

import { useState } from "react";
import { AlertCircle } from "lucide-react";

function DepositForm({ onClose }) {
  const [amount, setAmount] = useState(1000);
  const [method, setMethod] = useState("Telebirr");
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
          Amount (ETB)
        </label>
        <input
          type="number"
          min={100}
          value={amount}
          onChange={(e) => setAmount(+e.target.value || 0)}
          className="mt-1.5 w-full input input-bordered"
          required
        />
      </div>
      <div>
        <label className="font-semibold text-xs uppercase tracking-wide">
          Payment method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="mt-1.5 w-full select-bordered select"
        >
          <option>Telebirr</option>
          <option>Chapa</option>
          <option>Bank Transfer</option>
        </select>
      </div>
      <div className="py-2 text-xs alert alert-info">
        <AlertCircle className="w-4 h-4" />
        You'll be redirected to {method} to complete payment.
      </div>
      <button type="submit" className="w-full btn btn-primary">
        Initiate deposit
      </button>
    </form>
  );
}

export default DepositForm;

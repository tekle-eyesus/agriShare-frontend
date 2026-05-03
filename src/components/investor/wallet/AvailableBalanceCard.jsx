import { Minus, Plus, Wallet } from "lucide-react";
import { Card } from "../Shared";
import { formatETB } from "../../../utils/format";
import { WALLET } from "../../../mock-data/investor/data";

function AvailableBalanceCard({ setDeposit, setWithdraw }) {
  return (
    <Card
      className="bg-linear-to-br from-primary to-primary-glow p-6 border-0 text-primary-content"
      hover={false}
    >
      <div className="flex justify-between items-center">
        <p className="opacity-90 font-semibold text-xs uppercase tracking-wide">
          Available balance
        </p>
        <Wallet className="opacity-90 w-5 h-5" />
      </div>
      <p className="mt-2 font-display font-bold text-4xl">
        {formatETB(WALLET.balance)}
      </p>
      <div className="gap-2 grid grid-cols-2 mt-5">
        <button
          onClick={() => setDeposit(true)}
          className="gap-1 bg-white hover:bg-white/90 border-0 text-primary btn btn-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Deposit
        </button>
        <button
          onClick={() => setWithdraw(true)}
          className="gap-1 bg-white/20 hover:bg-white/30 border-0 text-white btn btn-sm"
        >
          <Minus className="w-3.5 h-3.5" />
          Withdraw
        </button>
      </div>
    </Card>
  );
}

export default AvailableBalanceCard;

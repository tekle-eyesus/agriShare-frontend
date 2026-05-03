import { Link } from "react-router-dom";
import { WALLET } from "../../../mock-data/investor/data";
import { formatETB } from "../../../utils/format";
import { Card } from "../shared";
import { Minus, Plus } from "lucide-react";

export default function Wallet() {
  return (
    <Card className="p-5">
          <h3 className="font-display font-bold text-lg">Wallet balance</h3>
          <p className="text-3xl font-display font-bold mt-3 text-primary">{formatETB(WALLET.balance)}</p>
          <p className="text-xs text-muted-foreground">Available for investing</p>
          <div className="grid grid-cols-2 gap-3 mt-5 text-xs">
            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-muted-foreground">Earned</p>
              <p className="font-semibold text-success mt-1">{formatETB(WALLET.totalEarned)}</p>
            </div>
            <div className="bg-base-200 rounded-xl p-3">
              <p className="text-muted-foreground">Pending</p>
              <p className="font-semibold text-warning mt-1">{formatETB(WALLET.pendingDistributions)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link to="/investor/wallet" className="btn btn-primary btn-sm gap-1"><Plus className="w-3.5 h-3.5"/>Deposit</Link>
            <Link to="/investor/wallet" className="btn btn-outline btn-sm gap-1"><Minus className="w-3.5 h-3.5"/>Withdraw</Link>
          </div>
        </Card>
  )
}

import { formatETB } from "../../../utils/format";
import { WALLET } from "../../../mock-data/investor/data";
import { ShoppingCart } from "lucide-react";
import { RiskBadge } from "../Shared";

function QuickView({ quickView, shares, setShares }) {
  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-3">
        <img
          src={quickView.image}
          alt=""
          className="rounded-xl w-20 h-20 object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold">{quickView.title}</p>
          <p className="text-muted-foreground text-xs">{quickView.farmer}</p>
          <div className="flex gap-1 mt-1.5">
            <RiskBadge level={quickView.riskLevel} />
            <span className="bg-primary/10 border-0 font-semibold text-primary badge badge-sm">
              {quickView.roi}% ROI
            </span>
          </div>
        </div>
      </div>
      <div className="bg-base-200 p-3 rounded-xl text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Share price</span>
          <span className="font-semibold">
            {formatETB(quickView.sharePrice)}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-muted-foreground">Available shares</span>
          <span className="font-semibold">{quickView.sharesAvailable}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-muted-foreground">Wallet balance</span>
          <span className="font-semibold text-primary">
            {formatETB(WALLET.balance)}
          </span>
        </div>
      </div>
      <div>
        <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          Shares
        </label>
        <div className="mt-2 w-full join">
          <button
            onClick={() => setShares(Math.max(1, shares - 1))}
            className="join-item btn btn-sm"
            aria-label="Decrease"
          >
            -
          </button>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(Math.max(1, +e.target.value || 1))}
            className="flex-1 text-center join-item input input-sm input-bordered"
          />
          <button
            onClick={() => setShares(shares + 1)}
            className="join-item btn btn-sm"
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between pt-2 border-base-300 border-t font-bold text-lg">
        <span>Total</span>
        <span className="text-primary">
          {formatETB(shares * quickView.sharePrice)}
        </span>
      </div>
      <button className="gap-2 w-full btn btn-primary">
        <ShoppingCart className="w-4 h-4" />
        Confirm investment
      </button>
    </div>
  );
}

export default QuickView;

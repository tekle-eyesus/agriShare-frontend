import { formatETB } from "../../../utils/format";
import { WALLET } from "../../../mock-data/investor/data";
import { ShoppingCart } from "lucide-react";
import { RiskBadge } from "../Shared";

function QuickView({ quickView, shares, setShares }) {
  const image = quickView?.asset?.photos?.[0]?.url || "https://placehold.co/600x400?text=No+Image";
  const title = quickView?.pitchTitle || "";
  const farmer = quickView?.farmer?.name || "Farmer";
  const riskLevel = "medium";
  const goal = quickView?.investmentGoalBirr || 1;
  const expectedYield = quickView?.expectedTotalYieldBirr || 0;
  const roi = ((expectedYield - goal) / goal * 100).toFixed(1);
  const sharePrice = quickView?.sharePricePerTokenBirr || 0;
  const sharesAvailable = quickView?.fundingRemainingBirr && sharePrice ? Math.floor(quickView.fundingRemainingBirr / sharePrice) : 0;

  return (
    <div className="space-y-4 p-6">
      <div className="flex gap-3">
        <img
          src={image}
          alt=""
          className="rounded-xl w-20 h-20 object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold">{title}</p>
          <p className="text-muted-foreground text-xs">{farmer}</p>
          <div className="flex gap-1 mt-1.5">
            <RiskBadge level={riskLevel} />
            <span className="bg-primary/10 border-0 font-semibold text-primary badge badge-sm px-2">
              {roi}% ROI
            </span>
          </div>
        </div>
      </div>
      <div className="bg-base-200 p-3 rounded-xl text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Share price</span>
          <span className="font-semibold">
            {formatETB(sharePrice)}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-muted-foreground">Available shares</span>
          <span className="font-semibold">{sharesAvailable}</span>
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
          {formatETB(shares * sharePrice)}
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

import { WALLET } from "../../../mock-data/investor/data";
import { formatETB } from "../../../utils/format";
import { Card } from "../../investor/Shared";
import {
  AlertTriangle,
  Clock,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Users,
} from "lucide-react";

function Investment({
  listing,
  shares,
  setShares,
  total,
  insufficient,
  setConfirm,
}) {
  return (
    <div className="lg:top-20 lg:sticky lg:self-start">
      <Card className="p-5" hover={false}>
        <p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          Invest in this listing
        </p>
        <p className="mt-1 font-display font-bold text-2xl">
          {formatETB(listing.sharePrice)}
          <span className="font-normal text-muted-foreground text-sm">
            {" "}
            / share
          </span>
        </p>

        <div className="mt-4">
          <label className="font-semibold text-xs">Number of shares</label>
          <div className="mt-1.5 w-full join">
            <button
              onClick={() => setShares(Math.max(1, shares - 1))}
              className="join-item btn btn-sm"
              aria-label="Decrease"
            >
              <Minus className="w-3 h-3" />
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
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Min 1 share · {listing.sharesAvailable} available
          </p>
        </div>

        <div className="space-y-2 mt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total cost</span>
            <span className="font-bold">{formatETB(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Wallet balance</span>
            <span className="font-semibold text-primary">
              {formatETB(WALLET.balance)}
            </span>
          </div>
        </div>

        {insufficient && (
          <div className="mt-3 py-2 text-xs alert alert-warning">
            <AlertTriangle className="w-4 h-4" />
            Insufficient balance. Top up first.
          </div>
        )}

        <button
          disabled={listing.status === "funded"}
          onClick={() => setConfirm(true)}
          className="gap-2 mt-4 w-full btn btn-primary"
        >
          <ShoppingCart className="w-4 h-4" />
          {listing.status === "funded" ? "Funded" : "Invest now"}
        </button>
        <button className="gap-2 mt-2 w-full btn btn-ghost btn-sm">
          <Heart className="w-4 h-4" />
          Add to watchlist
        </button>
      </Card>

      <Card className="mt-4 p-5" hover={false}>
        <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          Quick stats
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              Investors
            </span>
            <span className="font-semibold">{listing.investors}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              Days left
            </span>
            <span className="font-semibold">{listing.daysRemaining}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Investment;

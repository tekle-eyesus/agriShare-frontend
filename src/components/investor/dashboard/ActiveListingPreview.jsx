import { Link } from "react-router-dom";
import { INVESTMENTS } from "../../../mock-data/investor/data";
import { Card, StatusBadge } from "../Shared";
import { formatETB } from "../../../utils/format";
import { ChevronRight } from "lucide-react";

export default function ActiveListingPreview({ investedListings }) {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-display font-bold text-lg">
            Your active investments
          </h3>
          <p className="text-muted-foreground text-xs">
            Track progress and upcoming payouts
          </p>
        </div>
        <Link
          to="/investor/investments"
          className="inline-flex items-center gap-1 font-semibold text-primary text-xs"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {investedListings.map((listing) => {
          const inv = INVESTMENTS.find((i) => i.listingId === listing.id);
          return (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative bg-base-200 aspect-video overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="top-3 left-3 absolute">
                  <StatusBadge status={listing.type} />
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold truncate">{listing.title}</p>
                <p className="text-muted-foreground text-xs">
                  {inv.shares} shares · {formatETB(inv.amountInvested)}
                </p>
                <div className="mt-3">
                  <progress
                    className="w-full h-1.5 progress progress-primary"
                    value={listing.percentage}
                    max={100}
                  />
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {listing.percentage}% funded
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-base-200 border-t">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Next payout
                    </p>
                    <p className="font-semibold text-sm">
                      {inv.nextPayout || "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Expected
                    </p>
                    <p className="font-semibold text-success text-sm">
                      +{formatETB(inv.nextPayoutAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

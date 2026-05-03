import { Link } from "react-router-dom";
import { ExternalLink, RefreshCw } from "lucide-react";
import { formatETB } from "../../../utils/format";
import Box from "./Box";

function DrawerContent({ open }) {
  return (
    <div className="space-y-5 p-6">
      <div>
        <p className="text-muted-foreground text-xs uppercase tracking-wide">
          Listing
        </p>
        <p className="mt-1 font-display font-bold text-lg">
          {open.listingTitle}
        </p>
        <Link
          to={`/investor/marketplace/${open.listingId}`}
          className="inline-flex items-center gap-1 mt-1 font-semibold text-primary text-xs"
        >
          View listing <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
      <div className="gap-2 grid grid-cols-2">
        <Box label="Shares owned" value={String(open.shares)} />
        <Box label="Type" value={open.type} />
        <Box label="Invested" value={formatETB(open.amountInvested)} />
        <Box
          label="Current value"
          value={formatETB(open.currentValue)}
          accent
        />
        <Box label="ROI" value={`+${open.roi}%`} success />
        <Box label="Status" value={open.status} />
      </div>
      <div>
        <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase">
          Next payout
        </p>
        <div className="flex justify-between items-center bg-primary/5 p-4 border border-primary/20 rounded-xl">
          <div>
            <p className="font-semibold text-sm">
              {open.nextPayout || "Completed"}
            </p>
            <p className="text-muted-foreground text-xs">Estimated payout</p>
          </div>
          <p className="font-bold text-primary text-lg">
            +{formatETB(open.nextPayoutAmount)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/investor/marketplace/${open.listingId}`}
          className="flex-1 btn-outline btn btn-sm"
        >
          View listing
        </Link>
        {open.status === "active" && (
          <Link
            to="/investor/refunds"
            className="flex-1 gap-1 btn btn-warning btn-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Request refund
          </Link>
        )}
      </div>
    </div>
  );
}

export default DrawerContent;

import { ArrowUpRight, Clock, Eye, MapPin, Users } from "lucide-react";
import { formatETB } from "../../../utils/format";
import { Link } from "react-router-dom";
import { Card, RiskBadge, StatusBadge } from "../shared";

function Listing({ listing, handleQuickView }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative bg-base-200 aspect-16/10 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="top-3 left-3 absolute flex gap-1.5">
          <StatusBadge status={listing.type} />
          <RiskBadge level={listing.riskLevel} />
        </div>
        {listing.status === "funded" && (
          <div className="absolute inset-0 place-items-center grid bg-neutral/60">
            <span className="font-bold badge badge-success">Funded</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="font-semibold line-clamp-1">{listing.title}</p>
        <p className="flex items-center gap-1 mt-0.5 text-muted-foreground text-xs">
          <MapPin className="w-3 h-3" />
          {listing.location}
        </p>
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="font-semibold">{formatETB(listing.raised)}</span>
            <span className="text-muted-foreground">
              of {formatETB(listing.goal)}
            </span>
          </div>
          <progress
            className="w-full h-1.5 progress progress-primary"
            value={listing.percentage}
            max={100}
          />
        </div>
        <div className="gap-2 grid grid-cols-3 mt-3 text-center">
          <div className="bg-base-200 py-1.5 rounded-lg">
            <p className="text-[10px] text-muted-foreground">ROI</p>
            <p className="font-bold text-primary text-xs">{listing.roi}%</p>
          </div>
          <div className="bg-base-200 py-1.5 rounded-lg">
            <p className="flex justify-center items-center gap-1 text-[10px] text-muted-foreground">
              <Users className="w-2.5 h-2.5" />
            </p>
            <p className="font-bold text-xs">{listing.investors}</p>
          </div>
          <div className="bg-base-200 py-1.5 rounded-lg">
            <p className="flex justify-center items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-2.5 h-2.5" />
            </p>
            <p className="font-bold text-xs">{listing.daysRemaining}d</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-base-200 border-t">
          <button
            onClick={handleQuickView}
            className="flex-1 gap-1 btn btn-ghost btn-sm"
            title="Quick view"
          >
            <Eye className="w-3.5 h-3.5" /> Quick
          </button>
          <Link
            to={`/investor/marketplace/${listing.id}`}
            className="flex-1 gap-1 btn btn-primary btn-sm"
          >
            Invest <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Listing;

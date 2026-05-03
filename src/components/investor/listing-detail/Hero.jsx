import { BadgeCheck, MapPin, Share2 } from "lucide-react";
import { RatingStars, RiskBadge, StatusBadge } from "../../investor/Shared";

function Hero({ listing, avgRating }) {
  return (
    <div className="relative bg-base-300 rounded-2xl h-56 sm:h-72 lg:h-80 overflow-hidden">
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-neutral/85 via-neutral/30 to-transparent" />
      <div className="bottom-0 absolute inset-x-0 p-5 sm:p-6 text-white">
        <div className="flex flex-wrap gap-2 mb-2">
          <StatusBadge status={listing.status} />
          <StatusBadge status={listing.type} />
          <RiskBadge level={listing.riskLevel} />
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl">
          {listing.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-white/90 text-sm">
          <span className="flex items-center gap-1.5">
            {listing.farmer}
            {listing.farmerVerified && (
              <BadgeCheck className="w-4 h-4 text-info" />
            )}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1">
            <RatingStars rating={avgRating} size={12} /> {avgRating.toFixed(1)}
          </span>
        </div>
      </div>
      <button
        className="top-4 right-4 absolute bg-white/90 border-0 text-neutral btn btn-sm btn-circle"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Hero;

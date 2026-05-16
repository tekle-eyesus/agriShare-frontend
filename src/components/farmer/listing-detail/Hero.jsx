import { Card, StatusBadge } from "../Shared";
import { formatETB } from "../../../utils/format";

function Hero({ listing }) {
  const daysLeft = Math.ceil(
    (new Date(listing.investmentDeadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return (
    <Card className="mb-6 overflow-hidden" hover={false}>
      <div className="relative bg-base-200 aspect-21/9 sm:aspect-3/1 overflow-hidden">
        <img
          src={listing.asset.photos[0]?.url || ""}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral/70 to-transparent" />
        <div className="right-0 bottom-0 left-0 absolute p-5 sm:p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={listing.status} />
            <span className="opacity-80 text-xs">
              Asset: {listing.asset.name}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">
            {listing.pitchTitle}
          </h1>
        </div>
        {/* <button className="top-4 right-4 absolute bg-white/90 border-0 text-neutral btn btn-circle btn-sm" aria-label="Share"><Share2 className="w-4 h-4" /></button> */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-base-200 border-t divide-x divide-base-200">
        <Stat
          label="Goal Raised"
          value={`${listing.investmentProgressPercent.toFixed(2)}%`}
        />
        <Stat
          label="Total Invested"
          value={formatETB(listing.totalInvestedBirr)}
        />
        <Stat label="Investors" value={12} />
        <Stat
          label="Days Remaining"
          value={daysLeft > 0 ? `${daysLeft}` : "—"}
        />
      </div>
    </Card>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 text-center">
      <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 font-display font-bold text-lg sm:text-xl">{value}</p>
    </div>
  );
}

export default Hero;

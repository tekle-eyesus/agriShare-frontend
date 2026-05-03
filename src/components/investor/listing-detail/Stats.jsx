import { formatETB } from "../../../utils/format";
import { Card } from "../../investor/Shared";

function Stats({ listing }) {
  return (
    <Card className="p-0 overflow-hidden" hover={false}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-base-200">
        <Stat label="Goal" value={formatETB(listing.goal)} />
        <Stat label="Raised" value={formatETB(listing.raised)} accent />
        <Stat label="Investors" value={String(listing.investors)} />
        <Stat label="Days left" value={`${listing.daysRemaining}d`} />
        <Stat label="ROI" value={`${listing.roi}%`} accent />
        <Stat label="Min" value={formatETB(listing.minInvestment)} />
      </div>
      <div className="p-5 border-base-200 border-t">
        <div className="flex justify-between items-center mb-1.5 font-semibold text-xs">
          <span>{listing.percentage}% funded</span>
          <span className="text-muted-foreground">
            {formatETB(listing.goal - listing.raised)} left
          </span>
        </div>
        <progress
          className="w-full h-2 progress progress-primary"
          value={listing.percentage}
          max={100}
        />
      </div>
    </Card>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="p-4 text-center">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-base font-bold mt-1 ${accent ? "text-primary" : ""}`}>
        {value}
      </p>
    </div>
  );
}

export default Stats;

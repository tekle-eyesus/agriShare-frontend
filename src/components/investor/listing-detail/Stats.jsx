import { formatETB } from "../../../utils/format";
import { Card } from "../../investor/Shared";

function Stats({ listing }) {
  const goal = listing?.investmentGoalBirr || 1;
  const raised = listing?.totalInvestedBirr || 0;
  const expectedYield = listing?.expectedTotalYieldBirr || 0;
  const roi = ((expectedYield - goal) / goal * 100).toFixed(1);
  const investors = 0;
  const daysRemaining = listing?.investmentDeadline ? Math.max(0, Math.ceil((new Date(listing.investmentDeadline) - new Date()) / (1000 * 60 * 60 * 24))) : 0;
  const minInvestment = (listing?.minSharesPerInvestor || 1) * (listing?.sharePricePerTokenBirr || 0);
  const percentage = listing?.investmentProgressPercent || 0;

  return (
    <Card className="p-0 overflow-hidden" hover={false}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-base-200">
        <Stat label="Goal" value={formatETB(goal)} />
        <Stat label="Raised" value={formatETB(raised)} accent />
        <Stat label="Investors" value={String(investors)} />
        <Stat label="Days left" value={`${daysRemaining}d`} />
        <Stat label="ROI" value={`${roi}%`} accent />
        <Stat label="Min" value={formatETB(minInvestment)} />
      </div>
      <div className="p-5 border-base-200 border-t">
        <div className="flex justify-between items-center mb-1.5 font-semibold text-xs">
          <span>{percentage}% funded</span>
          <span className="text-muted-foreground">
            {formatETB(Math.max(0, goal - raised))} left
          </span>
        </div>
        <progress
          className="w-full h-2 progress progress-primary"
          value={percentage}
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

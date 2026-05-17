import { formatETB } from "../../../utils/format";

function Financial({ listing }) {
  const sharePrice = listing?.sharePricePerTokenBirr || 0;
  const totalShares = listing?.totalShares || 0;
  const sharesAvailable = sharePrice ? Math.floor((listing?.fundingRemainingBirr || 0) / sharePrice) : 0;
  const minInvestment = (listing?.minSharesPerInvestor || 1) * sharePrice;
  const goal = listing?.investmentGoalBirr || 1;
  const expectedYield = listing?.expectedTotalYieldBirr || 0;
  const roi = ((expectedYield - goal) / goal * 100).toFixed(1);
  const payoutFrequency = listing?.payoutMode || "End of term";
  const duration = "TBD";
  const expectedFirstPayout = "TBD";

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
      <FinancialRow label="Share price" value={formatETB(sharePrice)} />
      <FinancialRow label="Total shares" value={String(totalShares)} />
      <FinancialRow label="Available" value={String(sharesAvailable)} />
      <FinancialRow
        label="Min investment"
        value={formatETB(minInvestment)}
      />
      <FinancialRow
        label="ROI"
        value={`${roi}%`}
      />
      <FinancialRow label="Payout frequency" value={payoutFrequency} />
      <FinancialRow label="Duration" value={duration} />
      <FinancialRow label="First payout" value={expectedFirstPayout} />
    </div>
  );
}

function FinancialRow({ label, value }) {
  return (
    <div className="flex justify-between bg-base-200 p-3 rounded-xl text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default Financial;

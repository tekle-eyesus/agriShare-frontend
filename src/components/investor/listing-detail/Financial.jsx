import { formatETB } from "../../../utils/format";

function Financial({ listing }) {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
      <FinancialRow label="Share price" value={formatETB(listing.sharePrice)} />
      <FinancialRow label="Total shares" value={String(listing.totalShares)} />
      <FinancialRow label="Available" value={String(listing.sharesAvailable)} />
      <FinancialRow
        label="Min investment"
        value={formatETB(listing.minInvestment)}
      />
      <FinancialRow
        label="ROI"
        value={`${listing.roi}% (${listing.roiType})`}
      />
      <FinancialRow label="Payout frequency" value={listing.payoutFrequency} />
      <FinancialRow label="Duration" value={`${listing.duration} months`} />
      <FinancialRow label="First payout" value={listing.expectedFirstPayout} />
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

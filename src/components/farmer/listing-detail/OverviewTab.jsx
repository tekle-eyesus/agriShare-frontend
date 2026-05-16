import { FinancialTermCard } from "./Cards";
import { TabContent } from "./Tab";

function OverviewTab({ listing, activeTab }) {
  const ROI =
    (listing.investmentGoalBirr / listing.expectedTotalYieldBirr) * 100;
  return (
    <TabContent value="overview" activeTab={activeTab}>
      <div>
        <h3 className="mb-3 font-semibold text-lg">Full Description</h3>
        <p className="text-base-content/70 leading-relaxed">
          {listing.pitchText}
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg">Financial Terms</h3>
        <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <FinancialTermCard
            label="Share Price"
            value={`${listing.sharePricePerTokenBirr} Birr`}
          />
          <FinancialTermCard
            label="Total Shares"
            value={`${listing.totalShares} shares`}
          />
          <FinancialTermCard
            label="Min Investment"
            value={`${listing.minSharesPerInvestor} shares`}
          />
          <FinancialTermCard
            label="Payout Structure"
            value={`${listing.payoutMode.toUpperCase()} ${ROI.toFixed(2)}% ROI`}
          />
          <FinancialTermCard label="Frequency" value="Quarterly" />
          <FinancialTermCard label="Duration" value="12 months" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg">Progress Milestones</h3>
        {/* <div className="space-y-4">
          <MilestoneItem
            percentage={25}
            currentProgress={listing.investmentProgressPercent}
            label="Early bird investors"
          />
          <MilestoneItem
            percentage={50}
            currentProgress={listing.investmentProgressPercent}
            label="Half-way milestone"
          />
          <MilestoneItem
            percentage={75}
            currentProgress={listing.investmentProgressPercent}
            label="Almost there!"
          />
          <MilestoneItem
            percentage={100}
            currentProgress={listing.investmentProgressPercent}
            label="Fully funded"
          />
        </div> */}
        <div className="gap-2 grid grid-cols-4 text-xs text-center">
          {[25, 50, 75, 100].map((m) => {
            const reached = listing.investmentProgressPercent >= m;
            return (
              <div
                key={m}
                className={`rounded-xl p-3 border-2 ${reached ? "border-success bg-success/5" : "border-base-300"}`}
              >
                <p
                  className={`text-xl font-display font-bold ${reached ? "text-success" : "text-muted-foreground"}`}
                >
                  {m}%
                </p>
                <p className="mt-1 text-muted-foreground">
                  {reached ? "Reached" : "Pending"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </TabContent>
  );
}

export default OverviewTab;

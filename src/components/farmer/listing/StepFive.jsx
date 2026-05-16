import { formatETB } from "../../../utils/format";

function StepFive({
  verifiedAssets,
  formValues,
  goal,
  sharesPct,
  sharesToSell,
  sharePrice,
  expectedYield,
  projectedRoiPct,
}) {
  const selectedAsset = verifiedAssets.find(
    (a) => a._id === formValues.assetId,
  );
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg">Review & Submit</h3>
      <div className="space-y-2 bg-base-200 p-4 rounded-xl text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Asset</span>
          <span className="font-semibold">{selectedAsset?.name || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pitch</span>
          <span className="max-w-[60%] font-semibold text-right truncate">
            {formValues.pitchTitle || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Goal</span>
          <span className="font-semibold">{goal ? formatETB(goal) : "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shares to Sell</span>
          <span className="font-semibold">
            {sharesPct ? `${sharesPct}% (${sharesToSell}/100)` : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Price / Share</span>
          <span className="font-semibold">
            {sharePrice > 0 ? formatETB(Math.round(sharePrice)) : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Yield</span>
          <span className="font-semibold">
            {expectedYield ? formatETB(expectedYield) : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Projected ROI</span>
          <span className="font-semibold">
            {goal > 0 ? `${projectedRoiPct.toFixed(1)}%` : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Deadline</span>
          <span className="font-semibold">
            {formValues.investmentDeadline || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payout</span>
          <span className="font-semibold">
            {formValues.payoutMode === "fixed"
              ? `Fixed · ${formValues.paydayDate || "—"}`
              : `Offset · ${formValues.payoffDaysFromRelease || "—"} days from release`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Min Shares / Investor</span>
          <span className="font-semibold">
            {formValues.minSharesPerInvestor || "—"}
          </span>
        </div>
      </div>
      {/* <div className="bg-info/10 border-info/20 rounded-xl text-info-content text-sm alert alert-info">
        Your listing will be reviewed by AgriShare admins before going live
        (24–48 hours). 20 credits will be deducted on submission.
      </div> */}
    </div>
  );
}

export default StepFive;

import { formatETB } from "../../../utils/format";

function StepThree({
  register,
  errors,
  watch,
  projectedRoiPct,
  sharesToSell,
  sharePrice,
  goal,
}) {
  const formValues = watch();
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg">Financial Terms</h3>
      <div className="gap-3 grid grid-cols-2">
        <div>
          <label className="font-semibold label-text">
            Investment Goal (ETB) *
          </label>
          <input
            type="number"
            min={1000}
            {...register("investmentGoalBirr", { valueAsNumber: true })}
            className="mt-1.5 rounded-xl w-full input input-bordered"
            placeholder="500000"
          />
          {errors.investmentGoalBirr && (
            <p className="mt-1 text-[11px] text-error">
              {errors.investmentGoalBirr.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-semibold label-text">
            Shares to Sell (%) *
          </label>
          <input
            type="number"
            min={1}
            max={49}
            {...register("sharesToSellPercent", { valueAsNumber: true })}
            className="mt-1.5 rounded-xl w-full input input-bordered"
            placeholder="30"
          />
          {errors.sharesToSellPercent && (
            <p className="mt-1 text-[11px] text-error">
              {errors.sharesToSellPercent.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-semibold label-text">
            Expected Total Yield (ETB) *
          </label>
          <input
            type="number"
            min={5000}
            {...register("expectedTotalYieldBirr", { valueAsNumber: true })}
            className="mt-1.5 rounded-xl w-full input input-bordered"
            placeholder="650000"
          />
          {errors.expectedTotalYieldBirr && (
            <p className="mt-1 text-[11px] text-error">
              {errors.expectedTotalYieldBirr.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-semibold label-text">
            Min Shares per Investor
          </label>
          <input
            type="number"
            min={1}
            {...register("minSharesPerInvestor", { valueAsNumber: true })}
            className="mt-1.5 rounded-xl w-full input input-bordered"
          />
          {errors.minSharesPerInvestor && (
            <p className="mt-1 text-[11px] text-error">
              {errors.minSharesPerInvestor.message}
            </p>
          )}
        </div>
      </div>

      {/* Auto-calculated */}
      <div className="gap-3 grid grid-cols-3 bg-base-200 p-3 rounded-xl">
        <div>
          <p className="text-[11px] text-muted-foreground">Total Shares</p>
          <p className="font-semibold text-sm">100</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Shares For Sale</p>
          <p className="font-semibold text-sm">{sharesToSell || "—"}</p>
        </div>
        <div>
          <p className="text-[11px] text-muted-foreground">Price / Share</p>
          <p className="font-semibold text-sm">
            {sharePrice > 0 ? formatETB(Math.round(sharePrice)) : "—"}
          </p>
        </div>
        <div className="col-span-3 pt-2 border-base-300 border-t">
          <p className="text-[11px] text-muted-foreground">
            Projected ROI (vs goal)
          </p>
          <p
            className={`font-semibold text-sm ${projectedRoiPct >= 0 ? "text-success" : "text-error"}`}
          >
            {goal > 0 ? `${projectedRoiPct.toFixed(1)}%` : "—"}
          </p>
        </div>
      </div>

      <div>
        <label className="font-semibold label-text">
          Investment Deadline *
        </label>
        <input
          type="date"
          {...register("investmentDeadline")}
          min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
          className="mt-1.5 rounded-xl w-full input input-bordered"
        />
        {errors.investmentDeadline && (
          <p className="mt-1 text-[11px] text-error">
            {errors.investmentDeadline.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-semibold label-text">Payout Mode *</label>
        <div className="gap-3 grid grid-cols-2 mt-1.5">
          <label
            className={`rounded-xl border-2 p-3 cursor-pointer ${formValues.payoutMode === "fixed" ? "border-primary bg-primary/5" : "border-base-300"}`}
          >
            <input
              type="radio"
              name="payout"
              className="radio radio-primary radio-sm"
              value="fixed"
              {...register("payoutMode")}
            />
            <span className="ml-2 font-semibold text-sm">Fixed Payday</span>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Specific payout date after deadline
            </p>
          </label>
          <label
            className={`rounded-xl border-2 p-3 cursor-pointer ${formValues.payoutMode === "offset" ? "border-primary bg-primary/5" : "border-base-300"}`}
          >
            <input
              type="radio"
              name="payout"
              className="radio radio-primary radio-sm"
              value="offset"
              {...register("payoutMode")}
            />
            <span className="ml-2 font-semibold text-sm">
              Offset (Days from Release)
            </span>
            <p className="mt-1 text-[11px] text-muted-foreground">
              N days after funds release
            </p>
          </label>
        </div>
        {errors.payoutMode && (
          <p className="mt-1 text-[11px] text-error">
            {errors.payoutMode.message}
          </p>
        )}
      </div>

      {formValues.payoutMode === "fixed" ? (
        <div>
          <label className="font-semibold label-text">Payday Date *</label>
          <input
            type="date"
            {...register("paydayDate")}
            min={formValues.investmentDeadline || undefined}
            className="mt-1.5 rounded-xl w-full input input-bordered"
          />
          {errors.paydayDate && (
            <p className="mt-1 text-[11px] text-error">
              {errors.paydayDate.message}
            </p>
          )}
        </div>
      ) : (
        <div>
          <label className="font-semibold label-text">
            Payoff Days From Release *
          </label>
          <input
            type="number"
            min={1}
            {...register("payoffDaysFromRelease", { valueAsNumber: true })}
            className="mt-1.5 rounded-xl w-full input input-bordered"
            placeholder="120"
          />
          {errors.payoffDaysFromRelease && (
            <p className="mt-1 text-[11px] text-error">
              {errors.payoffDaysFromRelease.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default StepThree;

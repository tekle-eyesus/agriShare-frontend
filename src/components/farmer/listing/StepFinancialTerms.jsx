import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

function StepFinancialTerms({ payoutStructure, setPayoutStructure }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h3 className="mb-4 font-semibold text-lg">Financial Terms</h3>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">
              Total Investment Goal (ETB) *
            </span>
          </label>
          <div className="relative">
            <DollarSign className="top-1/2 left-3 absolute w-4 h-4 text-base-content/40 -translate-y-1/2" />
            <input
              type="number"
              placeholder="500,000"
              min={50000}
              className="pl-10 w-full input input-bordered"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">
              Price Per Share (ETB) *
            </span>
          </label>
          <div className="relative">
            <DollarSign className="top-1/2 left-3 absolute w-4 h-4 text-base-content/40 -translate-y-1/2" />
            <input
              type="number"
              placeholder="1,000"
              defaultValue={1000}
              className="pl-10 w-full input input-bordered"
            />
          </div>
        </div>
      </div>

      <div className="bg-primary/5 shadow w-full stats">
        <div className="stat">
          <div className="stat-title">Total Shares</div>
          <div className="text-primary stat-value">500</div>
          <div className="stat-desc">Auto-calculated</div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">
            Minimum Investment (Shares)
          </span>
        </label>
        <input
          type="number"
          defaultValue={1}
          min={1}
          className="w-full input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">Payout Structure *</span>
        </label>
        <div className="space-y-3">
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              payoutStructure === "fixed"
                ? "border-primary bg-primary/5"
                : "border-base-200"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="payout"
                value="fixed"
                checked={payoutStructure === "fixed"}
                onChange={(e) => setPayoutStructure(e.target.value)}
                className="mt-1 radio radio-primary"
              />
              <div className="flex-1">
                <span className="font-medium">Fixed ROI</span>
                <input
                  type="number"
                  placeholder="Percentage per cycle"
                  className="mt-2 w-full input input-bordered"
                  disabled={payoutStructure !== "fixed"}
                />
              </div>
            </label>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              payoutStructure === "revenue"
                ? "border-primary bg-primary/5"
                : "border-base-200"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="payout"
                value="revenue"
                checked={payoutStructure === "revenue"}
                onChange={(e) => setPayoutStructure(e.target.value)}
                className="mt-1 radio radio-primary"
              />
              <div className="flex-1">
                <span className="font-medium">Revenue Share</span>
                <input
                  type="number"
                  placeholder="Percentage of yield"
                  className="mt-2 w-full input input-bordered"
                  disabled={payoutStructure !== "revenue"}
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Payout Frequency *</span>
          </label>
          <select className="w-full select-bordered select">
            <option value="">Select Frequency</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="biannually">Bi-annually</option>
            <option value="annually">Annually</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">
              Investment Duration (Months) *
            </span>
          </label>
          <input
            type="number"
            min={6}
            max={60}
            placeholder="12"
            className="w-full input input-bordered"
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">
            Expected First Payout Date
          </span>
        </label>
        <input type="date" className="w-full input input-bordered" />
      </div>
    </motion.div>
  );
}

export default StepFinancialTerms;

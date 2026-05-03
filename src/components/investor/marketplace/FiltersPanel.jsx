import { formatETB } from "../../../utils/format";

const REGIONS = ["All", "Amhara", "Oromia", "Tigray", "SNNPR"];

function FiltersPanel({
  type,
  setType,
  region,
  setRegion,
  minRoi,
  setMinRoi,
  maxInvest,
  setMaxInvest,
  riskFilters,
  setRiskFilters,
  reset,
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          Asset type
        </label>
        <div className="mt-2 w-full join">
          {["All", "Farmland", "Livestock"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`join-item btn btn-sm flex-1 ${type === t ? "btn-primary" : "btn-outline"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          Region
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="mt-2 w-full select-bordered select-sm select"
        >
          {REGIONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
            Min ROI
          </label>
          <span className="font-semibold text-primary text-xs">{minRoi}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          value={minRoi}
          onChange={(e) => setMinRoi(+e.target.value)}
          className="mt-2 range range-primary range-xs"
        />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
            Max min-investment
          </label>
          <span className="font-semibold text-primary text-xs">
            {formatETB(maxInvest)}
          </span>
        </div>
        <input
          type="range"
          min={250}
          max={5000}
          step={250}
          value={maxInvest}
          onChange={(e) => setMaxInvest(+e.target.value)}
          className="mt-2 range range-primary range-xs"
        />
      </div>
      <div>
        <label className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
          Risk level
        </label>
        <div className="space-y-1.5 mt-2">
          {["low", "medium", "high"].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 text-sm capitalize cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={riskFilters[r]}
                onChange={(e) =>
                  setRiskFilters({ ...riskFilters, [r]: e.target.checked })
                }
              />
              {r}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={reset} className="flex-1 btn-outline btn btn-sm">
          Reset
        </button>
        <button
          onClick={() => setFiltersOpen(false)}
          className="lg:hidden flex-1 btn btn-primary btn-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default FiltersPanel;

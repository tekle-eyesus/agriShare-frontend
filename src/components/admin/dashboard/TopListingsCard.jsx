import { Card } from "../../../components/admin/shared";
import { TOP_LISTINGS } from "../../../mock-data/admin/data";
import { formatETB } from "../../../utils/format";

function TopListingsCard() {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-lg">Top Listings</h3>
        <span className="text-muted-foreground text-xs">By funding %</span>
      </div>
      <div className="space-y-4">
        {TOP_LISTINGS.map((l, i) => (
          <div key={l.name}>
            <div className="flex justify-between items-center mb-1.5">
              <p className="flex items-center gap-2 font-medium text-sm truncate">
                <span className="tabular-nums text-muted-foreground text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.name}
              </p>
              <span className="font-semibold tabular-nums text-xs">
                {Math.round(l.raised * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <progress
                className={`progress flex-1 h-2 ${l.raised > 0.7 ? "progress-success" : l.raised > 0.4 ? "progress-info" : "progress-warning"}`}
                value={l.raised * 100}
                max={100}
              />
              <span className="w-20 tabular-nums text-[11px] text-muted-foreground text-right">
                {formatETB(l.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default TopListingsCard;

import { AlertTriangle } from "lucide-react";

function Overview({ listing }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 font-display font-bold">About this opportunity</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {listing.description}
        </p>
      </div>
      <div>
        <h3 className="mb-3 font-display font-bold">Use of funds</h3>
        <div className="space-y-2">
          {listing.useOfFunds.map((u, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1 text-xs">
                <span>{u.label}</span>
                <span className="font-semibold">{u.pct}%</span>
              </div>
              <progress
                className="w-full h-1.5 progress progress-primary"
                value={u.pct}
                max={100}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="flex items-center gap-2 mb-2 font-display font-bold">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Risk factors
        </h3>
        <ul className="space-y-1.5 text-sm">
          {listing.risks.map((r) => (
            <li
              key={r}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="bg-warning mt-2 rounded-full w-1 h-1" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Overview;

import { AlertTriangle } from "lucide-react";

function Overview({ listing }) {
  const description = listing?.pitchText || "No description provided.";
  const useOfFunds = listing?.useOfFunds || "Not specified.";
  const risksStr = listing?.riskFactors || "";
  const risksList = risksStr.split(",").map(r => r.trim()).filter(Boolean);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 font-display font-bold">About this opportunity</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div>
        <h3 className="mb-3 font-display font-bold">Use of funds</h3>
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {useOfFunds}
          </p>
        </div>
      </div>
      {risksList.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 mb-2 font-display font-bold">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Risk factors
          </h3>
          <ul className="space-y-1.5 text-sm">
            {risksList.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="bg-warning mt-2 rounded-full w-1 h-1 min-w-[4px]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Overview;

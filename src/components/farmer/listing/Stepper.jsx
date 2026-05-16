import { Check } from "lucide-react";

function Stepper({ totalSteps, step }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={n} className="flex flex-1 last:flex-none items-center">
            <div
              className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold shrink-0 ${
                done
                  ? "bg-success text-success-content"
                  : active
                    ? "bg-primary text-primary-content"
                    : "bg-base-300 text-muted-foreground"
              }`}
            >
              {done ? <Check className="w-3.5 h-3.5" /> : n}
            </div>
            {n < totalSteps && (
              <div
                className={`h-0.5 flex-1 mx-1 ${done ? "bg-success" : "bg-base-300"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;

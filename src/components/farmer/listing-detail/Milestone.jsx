import { CheckCircle } from "lucide-react";

export function MilestoneItem({ percentage, currentProgress, label }) {
  const isCompleted = percentage <= currentProgress;

  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isCompleted
            ? "bg-success text-white"
            : "bg-base-200 text-base-content/50"
        }`}
      >
        {isCompleted ? <CheckCircle className="w-5 h-5" /> : percentage}
      </div>
      <div className="flex-1">
        <div className="font-medium">{percentage}% Funded</div>
        <div className="text-xs text-base-content/60">{label}</div>
      </div>
    </div>
  );
}

export default MilestoneItem;

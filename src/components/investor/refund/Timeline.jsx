import { CheckCircle2, Clock, Send } from "lucide-react";

function Timeline({ status }) {
  const steps = [
    { label: "Submitted", icon: Send, done: true },
    { label: "Under review", icon: Clock, done: status !== "pending" || true },
    {
      label: status === "rejected" ? "Rejected" : "Approved",
      icon: CheckCircle2,
      done: status === "approved" || status === "rejected",
    },
    { label: "Processed", icon: CheckCircle2, done: status === "approved" },
  ];
  return (
    <div className="flex justify-between items-center gap-1">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col flex-1 items-center text-center">
          <div
            className={`w-9 h-9 rounded-full grid place-items-center ${s.done ? "bg-primary text-primary-content" : "bg-base-200 text-muted-foreground"}`}
          >
            <s.icon className="w-4 h-4" />
          </div>
          <p
            className={`text-[10px] font-semibold mt-1.5 ${s.done ? "text-primary" : "text-muted-foreground"}`}
          >
            {s.label}
          </p>
          {i < steps.length - 1 && (
            <div
              className={`hidden sm:block w-full h-0.5 -mt-5 ${s.done ? "bg-primary" : "bg-base-300"}`}
              style={{ marginLeft: "100%" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Timeline;

import { CheckCircle } from "lucide-react";

function VerificationStatusCard({ status, title, message, icon: Icon, color }) {
  const colors = {
    verified: "bg-success/20 border-success/30 text-success",
    pending: "bg-warning/20 border-warning/30 text-warning",
    rejected: "bg-error/20 border-error/30 text-error",
  };

  return (
    <div
      className={`p-6 rounded-xl border ${colors[color] || colors.verified} flex items-start gap-4`}
    >
      <div className="flex justify-center items-center bg-white/50 rounded-full w-12 h-12">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="opacity-80 text-sm">{message}</p>
      </div>
      <div className="gap-1 badge badge-ghost">
        <CheckCircle className="w-3 h-3" />
        {status}
      </div>
    </div>
  );
}

export default VerificationStatusCard;

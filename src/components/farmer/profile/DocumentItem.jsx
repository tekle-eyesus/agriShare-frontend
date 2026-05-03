import { CheckCircle, Clock } from "lucide-react";

function DocumentItem({ title, date, status, onView }) {
  return (
    <div className="flex justify-between items-center p-4 border border-base-200 rounded-lg">
      <div className="flex items-center gap-3">
        {status === "verified" ? (
          <CheckCircle className="w-5 h-5 text-success" />
        ) : (
          <Clock className="w-5 h-5 text-warning" />
        )}
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-base-content/60">Uploaded on {date}</div>
        </div>
      </div>
      <button onClick={onView} className="btn btn-ghost btn-sm">
        View
      </button>
    </div>
  );
}

export default DocumentItem;

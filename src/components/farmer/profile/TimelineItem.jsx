import { CheckCircle, Clock } from "lucide-react";

function TimelineItem({ title, date, status, isLast }) {
  const icons = {
    completed: <CheckCircle className="w-4 h-4 text-success" />,
    pending: <Clock className="w-4 h-4 text-warning" />,
    current: <div className="bg-primary rounded-full w-4 h-4" />,
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center bg-base-200 rounded-full w-8 h-8">
          {icons[status]}
        </div>
        {!isLast && <div className="flex-1 bg-base-200 mt-2 w-0.5"></div>}
      </div>
      <div className={`pb-6 ${isLast ? "" : ""}`}>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-base-content/60">{date}</div>
      </div>
    </div>
  );
}

export default TimelineItem;

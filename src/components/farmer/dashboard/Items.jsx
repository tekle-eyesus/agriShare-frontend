import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Bell } from "lucide-react";
import { fadeInUp } from "../../../utils/motionVariants";

export const ActivityItem = ({ activity }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-start gap-4 pb-4 border-base-200 last:border-0 border-b"
    >
      <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10 shrink-0">
        <span className="font-semibold text-primary">
          {activity.investor.charAt(0)}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold">{activity.investor}</span>{" "}
          {activity.action}{" "}
          <span className="font-semibold">{activity.listing}</span>
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="font-semibold text-primary text-sm">
            {activity.amount.toLocaleString()} ETB
          </span>
          <span className="text-xs text-base-content/50">
            {activity.timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const UpdateItem = ({ update }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="pb-4 border-base-200 last:border-0 border-b"
    >
      <h4 className="mb-1 font-medium text-sm">{update.title}</h4>
      <p className="mb-2 text-xs text-base-content/60">{update.listing}</p>
      <p className="text-xs text-base-content/40">Posted {update.postedAt}</p>
    </motion.div>
  );
};

export const NotificationItem = ({ notification }) => {
  const getIcon = () => {
    switch (notification.icon) {
      case "check":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "trending":
        return <TrendingUp className="w-5 h-5 text-info" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex gap-3 p-3 rounded-lg ${notification.type === "success" ? "bg-success/10" : "bg-info/10"}`}
    >
      {getIcon()}
      <div className="flex-1">
        <p className="text-sm">{notification.title}</p>
        <p className="text-xs text-base-content/50">{notification.time}</p>
      </div>
    </motion.div>
  );
};

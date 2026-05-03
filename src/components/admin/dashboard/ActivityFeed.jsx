import { motion } from "framer-motion";
import { Card } from "../../../components/admin/shared";
import { RECENT_ACTIVITY } from "../../../mock-data/admin/data";
import { itemUp } from "../../../utils/motionVariants";
import { timeAgo } from "../../../utils/format";

function ActivityFeed() {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-bold text-lg">Recent Activity</h3>
        <button className="font-semibold text-primary text-xs hover:underline">
          View all
        </button>
      </div>
      <ul className="space-y-3">
        {RECENT_ACTIVITY.map((a, i) => (
          <motion.li
            key={i}
            variants={itemUp}
            className="group flex items-start gap-3"
          >
            <div className="avatar placeholder shrink-0">
              <div className="rounded-full w-8 h-8 text-accent-content gradient-accent">
                <span className="font-bold text-[10px]">
                  {a.admin
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-snug">
                <span className="font-semibold">{a.admin}</span>{" "}
                <span className="text-muted-foreground">{a.action}</span>{" "}
                <span className="font-medium">{a.target}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {timeAgo(a.at)}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

export default ActivityFeed;

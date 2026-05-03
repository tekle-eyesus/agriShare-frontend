import { motion } from "framer-motion";
import { itemUp } from "../../../utils/motionVariants";

function QueueAlertCard({ title, count, color, icon: Icon, href }) {
  return (
    <motion.a
      href={href}
      variants={itemUp}
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 bg-base-100 shadow-card hover:shadow-elevated p-4 border border-base-300 rounded-xl transition-shadow"
    >
      <div className={`w-10 h-10 rounded-lg grid place-items-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{title}</p>
        <p className="text-muted-foreground text-xs">Tap to review</p>
      </div>
      <span className="bg-primary border-0 font-bold text-primary-content badge badge-lg">
        {count}
      </span>
    </motion.a>
  );
}

export default QueueAlertCard;

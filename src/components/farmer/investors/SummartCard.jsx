import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";

function SummaryCard({ title, value, icon: Icon, color = "primary" }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      className="bg-base-100 shadow-md border border-base-200 card"
    >
      <div className="p-6 card-body">
        <div className="flex justify-between items-center">
          <div>
            <div className="mb-1 text-sm text-base-content/60">{title}</div>
            <div
              className={`text-3xl font-bold ${color === "primary" ? "text-primary" : ""}`}
            >
              {value}
            </div>
          </div>
          <div className="flex justify-center items-center bg-primary/10 rounded-full w-12 h-12">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SummaryCard;

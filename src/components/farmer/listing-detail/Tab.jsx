import { motion } from "framer-motion";
import { slideIn } from "../../../utils/motionVariants";

export const TabButton = ({ value, activeTab, onTabChange, children }) => {
  return (
    <button
      onClick={() => onTabChange(value)}
      className={`px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
        activeTab === value
          ? "bg-primary text-white shadow-md"
          : "text-base-content/70 hover:bg-base-200"
      }`}
    >
      {children}
    </button>
  );
};
export const TabContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
};

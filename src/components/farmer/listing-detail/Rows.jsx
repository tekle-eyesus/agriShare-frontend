import { fadeInUp } from "../../../utils/motionVariants";
import { motion } from "framer-motion";

export const InvestorRow = ({ investor }) => {
  return (
    <motion.tr
      variants={fadeInUp}
      className="hover:bg-base-200/50 border-base-200 border-b transition-colors"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-primary/10 rounded-full w-8 h-8 text-primary">
              <span className="font-semibold text-sm">
                {investor.name.charAt(0)}
              </span>
            </div>
          </div>
          <span className="font-medium">{investor.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">{investor.shares}</td>
      <td className="px-4 py-3 font-semibold">
        {investor.amount.toLocaleString()} ETB
      </td>
      <td className="px-4 py-3 text-sm text-base-content/60">
        {investor.date}
      </td>
      <td className="px-4 py-3">
        <div className="badge badge-success badge-sm">{investor.status}</div>
      </td>
    </motion.tr>
  );
};

export const DistributionRow = ({ distribution }) => {
  return (
    <motion.tr
      variants={fadeInUp}
      className="hover:bg-base-200/50 border-base-200 border-b transition-colors"
    >
      <td className="px-4 py-3">{distribution.date}</td>
      <td className="px-4 py-3 font-semibold">
        {distribution.amount.toLocaleString()} ETB
      </td>
      <td className="px-4 py-3">{distribution.investors}</td>
      <td className="px-4 py-3">
        <div className="badge badge-success badge-sm">
          {distribution.status}
        </div>
      </td>
    </motion.tr>
  );
};

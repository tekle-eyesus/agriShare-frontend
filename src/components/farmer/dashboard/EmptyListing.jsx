import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeInUp } from "../../../utils/motionVariants";

function EmptyListings() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-center py-12 text-center"
    >
      <div className="mb-4 text-base-content/30">
        <svg
          className="mx-auto w-24 h-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="mb-4 text-base-content/70">
        You haven't created any listings yet.
      </p>
      <Link to="/listings" className="gap-2 btn btn-primary">
        <Plus className="w-4 h-4" />
        Create New Listing
      </Link>
    </motion.div>
  );
}

export default EmptyListings;

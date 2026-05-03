import { Link } from "react-router-dom";
import { Clock, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";

const StatusBadge = ({ status }) => {
  const variants = {
    Active: "badge-success",
    Funded: "badge-info",
    Completed: "badge-primary",
    Cancelled: "badge-error",
  };
  return (
    <motion.div
      variants={fadeInUp}
      className={`badge ${variants[status] || "badge-ghost"}`}
    >
      {status}
    </motion.div>
  );
};

function ListingCard({ listing }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="bg-base-100 shadow-md border border-base-200 overflow-hidden card"
    >
      <figure className="relative h-48">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="top-3 right-3 absolute">
          <StatusBadge status={listing.status} />
        </div>
      </figure>
      <div className="p-4 card-body">
        <h3 className="font-semibold text-base line-clamp-1 card-title">
          {listing.title}
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Investment Goal</span>
            <span className="font-semibold">{listing.percentage}%</span>
          </div>
          <progress
            className="w-full h-2 progress progress-primary"
            value={listing.percentage}
            max="100"
          />
          <div className="flex justify-between text-xs">
            <span>{listing.raised.toLocaleString()} ETB raised</span>
            <span>Goal: {listing.goal.toLocaleString()} ETB</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 text-sm text-base-content/60">
          <span>{listing.investors} investors</span>
          {listing.daysRemaining > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{listing.daysRemaining} days left</span>
            </div>
          )}
        </div>

        <div className="gap-2 mt-3 card-actions">
          <Link
            to={`/listings/${listing.id}`}
            className="flex-1 btn btn-primary btn-sm"
          >
            Manage
          </Link>
          <button className="btn-outline btn btn-sm">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ListingCard;

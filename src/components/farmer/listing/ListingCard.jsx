import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";
import {
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const variants = {
    Active: "badge-success",
    Funded: "badge-info",
    Completed: "badge-primary",
    Cancelled: "badge-error",
    Draft: "badge-warning",
  };
  return (
    <div className={`badge ${variants[status] || "badge-ghost"} gap-1`}>
      {status}
    </div>
  );
};

function ListingCard({ listing }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
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
      <div className="p-5 card-body">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-1 card-title">
              {listing.title}
            </h3>
            <p className="mt-1 text-xs text-base-content/60">
              Asset: {listing.asset}
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Investment Goal</span>
            <span className="font-semibold text-primary">
              {listing.percentage}%
            </span>
          </div>
          <progress
            className="w-full h-2 progress progress-primary"
            value={listing.percentage}
            max="100"
          />
          <div className="flex justify-between text-xs">
            <span className="font-medium">
              {listing.raised.toLocaleString()} ETB
            </span>
            <span className="text-base-content/50">
              Goal: {listing.goal.toLocaleString()} ETB
            </span>
          </div>
        </div>

        <div className="gap-3 grid grid-cols-2 mt-3">
          <div>
            <div className="text-xs text-base-content/50">Investors</div>
            <div className="flex items-center gap-1 font-semibold">
              <Users className="w-3 h-3" />
              {listing.investors}
            </div>
          </div>
          <div>
            <div className="text-xs text-base-content/50">Shares Sold</div>
            <div className="font-semibold">
              {listing.sharesSold}/{listing.totalShares}
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-2 text-xs text-base-content/50">
          <div className="flex items-center gap-1">
            {listing.status === "Funded" ? (
              <CheckCircle className="w-3 h-3 text-success" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            <span>Deadline: {listing.deadline}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Payout: {listing.payoutMode}</span>
          </div>
        </div>

        <div className="gap-2 mt-4 card-actions">
          <Link
            to={`/listings/${listing.id}`}
            className="flex-1 btn btn-primary btn-sm"
          >
            View Details
          </Link>
          <button className="btn-outline btn btn-sm">
            <MessageSquare className="w-4 h-4" />
            Update
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ListingCard;

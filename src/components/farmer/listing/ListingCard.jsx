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
  // Format currency values
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate progress percentage
  const progressPercentage =
    listing.totalInvestedBirr > 0
      ? Math.round(
          (listing.totalInvestedBirr / listing.investmentGoalBirr) * 100,
        )
      : 0;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-base-100 shadow-md border border-base-200 overflow-hidden card"
    >
      <figure className="relative h-48">
        <img
          src={listing.asset?.photos?.[0]?.url}
          alt={listing.pitchTitle}
          className="w-full h-full object-cover"
        />
        <div className="top-3 left-3 absolute">
          <StatusBadge status={listing.status} />
        </div>
        <div className="top-3 right-3 absolute">
          <span className="text-xs text-base-content/60">
            {listing.asset?.type}
          </span>
        </div>
      </figure>
      <div className="p-5 card-body">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-1 card-title">
              {listing.pitchTitle}
            </h3>
            <p className="mt-1 text-xs text-base-content/60">
              Asset: {listing.asset?.name}
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Funding Progress</span>
            <span className="font-semibold text-primary">
              {progressPercentage}%
            </span>
          </div>
          <progress
            className="w-full h-2 progress progress-primary"
            value={progressPercentage}
            max="100"
          />
          <div className="flex justify-between text-xs">
            <span className="font-medium">
              {formatCurrency(listing.totalInvestedBirr)}
            </span>
            <span className="text-base-content/50">
              Goal: {formatCurrency(listing.investmentGoalBirr)}
            </span>
          </div>
        </div>

        <div className="gap-3 grid grid-cols-2 mt-3">
          <div>
            <div className="text-xs text-base-content/50">Investors</div>
            <div className="flex items-center gap-1 font-semibold">
              <Users className="w-3 h-3" />
              {listing.totalShares -
                (listing.totalShares * listing.sharesToSellPercent) / 100}
            </div>
          </div>
          <div>
            <div className="text-xs text-base-content/50">Shares Available</div>
            <div className="font-semibold">
              {listing.totalShares -
                Math.floor(
                  (listing.totalShares * listing.sharesToSellPercent) / 100,
                )}
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-2 text-xs text-base-content/50">
          <div className="flex items-center gap-1">
            {listing.status === "active" ? (
              <Clock className="w-3 h-3 text-warning" />
            ) : listing.status === "funded" ? (
              <CheckCircle className="w-3 h-3 text-success" />
            ) : listing.status === "completed" ? (
              <CheckCircle className="w-3 h-3 text-primary" />
            ) : (
              <Clock className="w-3 h-3 text-base-content/40" />
            )}
            <span className="ml-2">
              {listing.status === "active"
                ? `${formatDate(listing.investmentDeadline)} days left`
                : listing.status === "funded"
                  ? "Goal reached"
                  : listing.status === "completed"
                    ? "Completed"
                    : `${formatDate(listing.releasedToFarmerAt)}`}
            </span>
          </div>
        </div>

        <div className="mt-2 text-xs text-base-content/50">
          <div className="flex items-center gap-2">
            <span className="text-base-content/60">Expected Yield:</span>
            <span className="font-medium">
              {formatCurrency(listing.expectedTotalYieldBirr)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base-content/60">First Payout:</span>
            <span className="font-medium">
              {formatDate(listing.paydayDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base-content/60">Use of Funds:</span>
            <span className="font-medium">{listing.useOfFunds}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base-content/60">Risk Factors:</span>
            <span className="font-medium">{listing.riskFactors}</span>
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

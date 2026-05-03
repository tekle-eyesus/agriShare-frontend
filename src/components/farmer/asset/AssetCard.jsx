import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";
import { MapPin, FileText, ImageIcon, Edit, Trash2 } from "lucide-react";
import { AssetTypeBadge } from "./Badges";
import { StatusBadge } from "./Badges";

function AssetCard({ asset, onViewDetails, onEdit, onDelete }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-base-100 shadow-md hover:shadow-xl border border-base-200 transition-all duration-200 card"
    >
      <figure className="relative h-48">
        <img
          src={asset.image}
          alt={asset.name}
          className="w-full h-full object-cover"
        />
        <div className="top-3 left-3 absolute">
          <AssetTypeBadge type={asset.type} />
        </div>
        <div className="top-3 right-3 absolute">
          <StatusBadge status={asset.status} />
        </div>
      </figure>

      <div className="p-5 card-body">
        <h3 className="font-semibold text-base line-clamp-1 card-title">
          {asset.name}
        </h3>

        <div className="flex items-start gap-2 text-sm text-base-content/70">
          <MapPin className="mt-0.5 w-4 h-4 shrink-0" />
          <span className="text-xs line-clamp-2">{asset.location}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-medium text-sm">{asset.size}</span>
        </div>

        <div className="flex items-center gap-4 mt-2 text-xs text-base-content/60">
          <div className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>{asset.documents} docs</span>
          </div>
          <div className="flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{asset.images} images</span>
          </div>
        </div>

        {asset.hasListing && (
          <div className="bg-base-200 mt-3 p-2 rounded-lg text-xs">
            Used in:{" "}
            <span className="font-medium text-primary">
              {asset.listingName}
            </span>
          </div>
        )}

        <div className="justify-stretch gap-2 mt-4 card-actions">
          <button
            onClick={() => onViewDetails(asset)}
            className="flex-1 btn btn-primary btn-sm"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(asset)}
            className="btn-outline btn btn-sm"
          >
            <Edit className="w-4 h-4" />
          </button>
          {!asset.hasListing && (
            <button
              onClick={() => onDelete(asset)}
              className="btn-outline btn btn-sm btn-error"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AssetCard;

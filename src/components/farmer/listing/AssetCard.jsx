import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function AssetCard({ asset, isSelected, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(asset.id)}
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-base-200 hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="radio"
          checked={isSelected}
          onChange={() => onSelect(asset.id)}
          className="mt-1 radio radio-primary radio-sm"
        />
        <div className="flex-1">
          <h4 className="mb-1 font-semibold">{asset.name}</h4>
          <div className="text-sm text-base-content/60">
            <div>{asset.type}</div>
            <div>{asset.size}</div>
          </div>
          {asset.verified && (
            <div className="gap-1 mt-2 badge badge-success">
              <CheckCircle className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AssetCard;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import AssetCard from "./AssetCard";

function StepSelectAsset({ assets, selectedAsset, onSelectAsset }) {
  const verifiedAssets = assets.filter((a) => a.verified);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="mb-4 font-semibold text-lg">Select Asset to Tokenize</h3>
      <div className="shadow-sm mb-6 alert alert-info">
        <AlertCircle className="w-5 h-5" />
        <span>
          Only verified assets can be tokenized. Pending assets will appear once
          verified.
        </span>
      </div>
      <div className="gap-4 grid sm:grid-cols-2">
        {verifiedAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAsset === asset.id}
            onSelect={onSelectAsset}
          />
        ))}
      </div>
      <div className="mt-6">
        <Link to="/assets" className="text-sm link link-primary">
          + Create New Asset
        </Link>
      </div>
    </motion.div>
  );
}

export default StepSelectAsset;

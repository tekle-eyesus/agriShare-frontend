import { motion } from "framer-motion";
import { CheckCircle, DollarSign, TrendingUp, Shield } from "lucide-react";

function StepReviewSubmit() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="mb-4 font-semibold text-lg">Review Your Listing</h3>

      <div className="space-y-4 bg-base-200/30 p-6 rounded-xl">
        <div>
          <h4 className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-success" />
            Selected Asset
          </h4>
          <p className="mt-1 ml-6 text-sm text-base-content/70">
            Teff Farm - Gozamin
          </p>
        </div>
        <div>
          <h4 className="flex items-center gap-2 font-medium">
            <DollarSign className="w-4 h-4 text-primary" />
            Investment Goal
          </h4>
          <p className="mt-1 ml-6 text-sm text-base-content/70">500,000 ETB</p>
        </div>
        <div>
          <h4 className="flex items-center gap-2 font-medium">
            <TrendingUp className="w-4 h-4 text-primary" />
            Payout Structure
          </h4>
          <p className="mt-1 ml-6 text-sm text-base-content/70">
            Fixed ROI - 12% quarterly
          </p>
        </div>
      </div>

      <div className="shadow-lg mt-6 alert alert-info">
        <Shield className="w-5 h-5" />
        <div>
          <h4 className="font-bold">Review Required</h4>
          <p className="text-sm">
            Your listing will be reviewed by admins before going live (typically
            24-48 hours).
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default StepReviewSubmit;

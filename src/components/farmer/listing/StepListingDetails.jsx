import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

function StepListingDetails() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h3 className="mb-4 font-semibold text-lg">Listing Details</h3>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">Pitch Title *</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Invest in Premium Teff Production"
          maxLength={120}
          className="w-full input input-bordered"
        />
        <label className="label">
          <span className="label-text-alt">Max 120 characters</span>
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">Short Description *</span>
        </label>
        <textarea
          placeholder="Brief description (50-300 characters)"
          rows={2}
          maxLength={300}
          className="resize-none textarea textarea-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">
            Full Story/Business Plan *
          </span>
        </label>
        <textarea
          placeholder="Tell your story and explain your business plan (200-5000 characters)"
          rows={6}
          minLength={200}
          maxLength={5000}
          className="resize-none textarea textarea-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">Cover Image *</span>
        </label>
        <div className="p-8 border-2 border-base-300 hover:border-primary border-dashed rounded-lg text-center transition-colors cursor-pointer">
          <input type="file" className="hidden" id="cover" accept=".jpg,.png" />
          <label htmlFor="cover" className="cursor-pointer">
            <ImageIcon className="mx-auto mb-3 w-12 h-12 text-base-content/40" />
            <p className="text-sm text-base-content/70">Upload cover image</p>
            <p className="mt-1 text-xs text-base-content/50">
              16:9 ratio recommended, max 5MB
            </p>
          </label>
        </div>
      </div>
    </motion.div>
  );
}

export default StepListingDetails;

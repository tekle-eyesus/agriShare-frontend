import { motion } from "framer-motion";

function EmptyState({ onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-base-100 shadow-md border border-base-200 card"
    >
      <div className="items-center py-12 text-center card-body">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h3 className="card-title">No assets found</h3>
        <p className="text-base-content/70">
          Click 'Create New Asset' to add your first farmland or livestock
          asset.
        </p>
        <div className="mt-4 card-actions">
          <button onClick={onCreate} className="gap-2 btn btn-primary">
            <Plus className="w-5 h-5" />
            Create New Asset
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EmptyState;

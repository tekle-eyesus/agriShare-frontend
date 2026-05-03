import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import FilterChips from "../../components/farmer/asset/Filter";
import { mockAssets } from "../../mock-data/farmer/asset";
import CreateAssetModal from "../../components/farmer/asset/CreateAssetModal";
import EmptyState from "../../components/farmer/asset/EmptyState";
import AssetCard from "../../components/farmer/asset/AssetCard";
import { staggerContainer } from "../../utils/motionVariants";

export function Assets() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" ||
      asset.type === filterType ||
      asset.status === filterType;
    return matchesSearch && matchesType;
  });

  const handleViewDetails = (asset) => {
    console.log("View details:", asset);
    // Implement view details logic
  };

  const handleEdit = (asset) => {
    console.log("Edit asset:", asset);
    // Implement edit logic
  };

  const handleDelete = (asset) => {
    console.log("Delete asset:", asset);
    // Implement delete logic with confirmation
  };

  const handleSaveAsset = () => {
    console.log("Save asset");
    setShowCreateModal(false);
  };

  return (
    <div className="mx-auto px-4 py-6 max-w-[1536px]">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="mb-2 font-bold text-3xl">
          My Assets (Farmland & Livestock)
        </h1>
        <p className="text-base-content/70">
          Manage your agricultural assets before creating investment listings
        </p>
      </motion.div>

      {/* Filter/Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base-100 shadow-md mb-6 p-6 border border-base-200 card"
      >
        <div className="flex sm:flex-row flex-col gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="top-1/2 left-3 absolute w-5 h-5 text-base-content/40 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by asset name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full input input-bordered"
              />
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="gap-2 btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Create New Asset
          </button>
        </div>

        <FilterChips activeFilter={filterType} onFilterChange={setFilterType} />
      </motion.div>

      {/* Asset Grid */}
      {filteredAssets.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState onCreate={() => setShowCreateModal(true)} />
      )}

      {/* Create Asset Modal */}
      <CreateAssetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveAsset}
      />
    </div>
  );
}

export default Assets;

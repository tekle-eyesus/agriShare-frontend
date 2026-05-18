import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Loader2 } from "lucide-react";
import FilterChips from "../../components/farmer/asset/Filter";
import CreateAssetModal from "../../components/farmer/asset/CreateAssetModal";
import EmptyState from "../../components/farmer/asset/EmptyState";
import AssetCard from "../../components/farmer/asset/AssetCard";
import ViewAssetModal from "../../components/farmer/asset/ViewAssetModal";
import { staggerContainer } from "../../utils/motionVariants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";
import { useIntersectionObserver } from "../../hook/useIntersectionObserver";

const LIMIT = 12;

export function Assets() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewing, setViewing] = useState(null);
  const [page, setPage] = useState(1);
  const { farmer } = useAPI();
  
  const {
    data: { data: { assets = [] } = {} },
  } = useSuspenseQuery({
    queryKey: ["assets"],
    queryFn: () => farmer.getAssets(),
  });

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filterType]);

  const filteredAssets = assets?.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      asset.location.region
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase()) ||
      asset.location.woreda
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase()) ||
      asset.location.zone.toLowerCase().startsWith(searchQuery.toLowerCase());
    const matchesType =
      filterType === "all" ||
      asset.type === filterType ||
      asset.status === filterType;
    return matchesSearch && matchesType;
  }) || [];

  const visibleAssets = filteredAssets.slice(0, page * LIMIT);
  const hasNextPage = page * LIMIT < filteredAssets.length;

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: () => setPage((p) => p + 1),
    enabled: hasNextPage,
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
        <h1 className="mb-2 font-bold text-3xl">My Assets</h1>
        <p className="text-base-content/70">
          Manage your agricultural assets before creating investment listings
        </p>
      </motion.div>

      {/* Filter/Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base-100 shadow-md mb-6 p-4 border border-base-200 card"
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
                className="pl-10 outline outline-gray-100 focus:outline-gray-400 w-full input input-bordered"
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
      {filteredAssets?.length > 0 ? (
        <>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {visibleAssets.map((asset) => (
                <AssetCard
                  key={asset._id}
                  asset={asset}
                  onViewDetails={() => setViewing(asset)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          <div
            ref={loadMoreRef}
            className="flex justify-center p-6 min-h-[60px]"
          >
            {hasNextPage && (
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            )}
          </div>
        </>
      ) : (
        <EmptyState onCreate={() => setShowCreateModal(true)} />
      )}

      {/* Create Asset Modal */}
      <CreateAssetModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveAsset}
      />
      <ViewAssetModal asset={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}

export default Assets;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import { mockListings } from "../../mock-data/farmer/listing";

import { staggerContainer } from "../../utils/motionVariants";
import ListingCard from "../../components/farmer/listing/ListingCard";
import CreateListingModal from "../../components/farmer/listing/CreateListingModal";

export function Listings() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const filteredListings = mockListings.filter((listing) => {
    if (activeTab === "active") return listing.status === "Active";
    if (activeTab === "funded") return listing.status === "Funded";
    return true;
  });

  const tabs = [
    { id: "active", label: "Active" },
    { id: "funded", label: "Funded" },
    { id: "completed", label: "Completed" },
    { id: "draft", label: "Draft" },
  ];

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-[1536px]">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="mb-2 font-bold text-3xl">My Investment Listings</h1>
          <p className="text-base-content/70">
            Tokenize your assets and raise capital from investors
          </p>
        </motion.div>

        {/* Tabs Section */}
        <div className="bg-base-100 shadow-md mb-6 border border-base-200 card">
          <div className="p-2 card-body">
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-base-200 p-1 rounded-xl tabs tabs-boxed">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="gap-2 ml-auto btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Create New Listing
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
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
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="card-title">No listings found</h3>
              <p className="text-base-content/70">
                Create your first listing to start raising capital.
              </p>
              <div className="mt-4 card-actions">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="gap-2 btn btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  Create New Listing
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Create Listing Modal */}
        <CreateListingModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </div>
  );
}

export default Listings;

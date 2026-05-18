import { lazy, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";

import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";
const PostUpdateModal = lazy(
  () => import("../../components/farmer/listing-detail/UpdateModals"),
);
const DeleteModal = lazy(
  () => import("../../components/farmer/listing-detail/UpdateModals"),
);
const EditUpdateModal = lazy(
  () => import("../../components/farmer/listing-detail/UpdateModals"),
);
const Hero = lazy(() => import("../../components/farmer/listing-detail/Hero"));
const Tabs = lazy(() => import("../../components/farmer/listing-detail/Tabs"));
const OverviewTab = lazy(
  () => import("../../components/farmer/listing-detail/OverviewTab"),
);
const InvestorsTab = lazy(
  () => import("../../components/farmer/listing-detail/InvestorsTab"),
);
const UpdatesTab = lazy(
  () => import("../../components/farmer/listing-detail/UpdatesTab"),
);
const ReviewTab = lazy(
  () => import("../../components/farmer/listing-detail/ReviewTab"),
);
const PayoutTab = lazy(
  () => import("../../components/farmer/listing-detail/PayoutTab"),
);
const AnalyticsTab = lazy(
  () => import("../../components/farmer/listing-detail/AnalyticsTab"),
);
const ActionBar = lazy(
  () => import("../../components/farmer/listing-detail/ActionBar"),
);
//TODO: make these pages import lazily
//TODO: investors needs to be fetched
//TODO: change the Hero with the one we generated
//TODO: after clicking view detail in listing card it does not display the details but reloading that page renders it
//TODO: somehow between switching tabs we are getting pages re-rendered fix
export function ListingDetail() {
  const { id } = useParams();
  const { farmer } = useAPI();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUpdate, setDeletingUpdate] = useState(null);
  const { data } = useSuspenseQuery({
    queryKey: [`listing-${id}`],
    queryFn: () => farmer.getListing(id),
  });
  const listing =
    data?.data?.data?.listing || data?.data?.listing || data?.listing;

  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries(["listing-updates", id]);
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-[1536px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link to={-1} className="gap-2 btn btn-ghost btn-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to My Listings
          </Link>
        </motion.div>

        
          <Hero listing={listing} />

          <div className="bg-base-100 shadow-md border border-base-200 card">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="p-6">
              {activeTab === "overview" && <OverviewTab listing={listing} activeTab={activeTab} />}
              {activeTab === "investors" && <InvestorsTab activeTab={activeTab} listingId={id} />}
              {activeTab === "updates" && (
                <UpdatesTab
                  activeTab={activeTab}
                  setPostOpen={setPostOpen}
                  setEditingUpdate={setEditingUpdate}
                  setDeleteOpen={setDeleteOpen}
                  setDeletingUpdate={setDeletingUpdate}
                  listingId={id}
                />
              )}
              {activeTab === "reviews" && <ReviewTab activeTab={activeTab} listingId={id} />}
              {activeTab === "payouts" && <PayoutTab activeTab={activeTab} />}
              {activeTab === "analytics" && <AnalyticsTab activeTab={activeTab} listing={listing} />}
            </div>
          </div>

          <ActionBar setShowUpdateModal={setPostOpen} />

          <PostUpdateModal
            open={postOpen}
            onClose={() => setPostOpen(false)}
            listingId={id}
            onSuccess={handleUpdateSuccess}
          />
          <EditUpdateModal
            update={editingUpdate}
            onClose={() => setEditingUpdate(null)}
            listingId={id}
            updateId={editingUpdate?._id}
            onSuccess={handleUpdateSuccess}
          />
          <DeleteModal
            open={deleteOpen}
            onClose={() => {
              setDeleteOpen(false);
              setDeletingUpdate(null);
            }}
            update={deletingUpdate}
            listingId={id}
            onSuccess={handleUpdateSuccess}
          />
      </div>
    </div>
  );
}

export default ListingDetail;

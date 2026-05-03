import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Modal from "../../components/investor/Modal";
import { REVIEWS as INITIAL } from "../../mock-data/investor/data";
import ReviewForm from "../../components/investor/review/ReviewForm";
import ReviewCard from "../../components/investor/review/ReviewCard";
import { Card, EmptyState, PageHeader } from "../../components/investor/Shared";

export default function MyReviews() {
  const [reviews, setReviews] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [composing, setComposing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const remove = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="My Reviews"
        subtitle="Reviews you've left for projects you invested in."
        actions={
          <button
            onClick={() => setComposing(true)}
            className="gap-2 btn btn-primary btn-sm"
          >
            <Plus className="w-4 h-4" />
            Write review
          </button>
        }
      />

      {reviews.length === 0 ? (
        <Card className="p-0" hover={false}>
          <EmptyState
            title="No reviews yet"
            message="After your first investment, you can share feedback with other investors."
          />
        </Card>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          className="gap-4 grid grid-cols-1 md:grid-cols-2"
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              setEditing={setEditing}
              setConfirmDelete={setConfirmDelete}
            />
          ))}
        </motion.div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit review"
        size="md"
      >
        {editing && (
          <ReviewForm
            initial={editing}
            onSubmit={(rating, text) => {
              setReviews(
                reviews.map((r) =>
                  r.id === editing.id ? { ...r, rating, text } : r,
                ),
              );
              setEditing(null);
            }}
          />
        )}
      </Modal>

      <Modal
        open={composing}
        onClose={() => setComposing(false)}
        title="Write a review"
        size="md"
      >
        <ReviewForm
          initial={null}
          onSubmit={(rating, text) => {
            setReviews([
              {
                id: Date.now(),
                listingId: 99,
                listingTitle: "Honey Production — Wollega",
                image:
                  "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
                rating,
                text,
                date: new Date().toISOString().slice(0, 10),
                farmerResponse: "",
              },
              ...reviews,
            ]);
            setComposing(false);
          }}
        />
      </Modal>

      <Modal
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Delete review?"
        size="sm"
      >
        <div className="p-6">
          <p className="text-muted-foreground text-sm">
            This action cannot be undone.
          </p>
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setConfirmDelete(null)}
              className="flex-1 btn-outline btn btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => confirmDelete && remove(confirmDelete)}
              className="flex-1 btn btn-error btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

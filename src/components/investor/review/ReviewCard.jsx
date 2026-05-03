import { Card, RatingStars } from "../Shared";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";

function ReviewCard({ review, setEditing, setConfirmDelete }) {
  return (
    <Card key={review.id} className="flex flex-col p-5" hover={false}>
      <div className="flex gap-3">
        <img
          src={review.image}
          alt=""
          className="rounded-xl w-16 h-16 object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{review.listingTitle}</p>
          <RatingStars rating={review.rating} />
          <p className="mt-1 text-[11px] text-muted-foreground">
            {review.date}
          </p>
        </div>
      </div>
      <p className="mt-3 text-muted-foreground text-sm">{review.text}</p>
      {review.farmerResponse && (
        <div className="bg-base-200 mt-3 p-3 rounded-xl">
          <p className="flex items-center gap-1.5 font-semibold text-[11px] text-primary">
            <MessageCircle className="w-3 h-3" />
            Farmer response
          </p>
          <p className="mt-1 text-muted-foreground text-xs">
            {review.farmerResponse}
          </p>
        </div>
      )}
      <div className="flex gap-2 mt-4 pt-3 border-base-200 border-t">
        <button
          onClick={() => setEditing(review)}
          className="flex-1 gap-1 btn btn-ghost btn-sm"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => setConfirmDelete(review.id)}
          className="flex-1 gap-1 text-error btn btn-ghost btn-sm"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </Card>
  );
}

export default ReviewCard;

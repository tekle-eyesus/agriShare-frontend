import { Star } from "lucide-react";
import { EmptyState } from "../../investor/Shared";

function Reviews({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        title="No reviews yet"
        message="No investors have reviewed this listing yet."
        icon={Star}
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r._id} className="pb-4 border-base-200 last:border-0 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-base-300 rounded-full w-8 text-base-content">
                  <span className="text-xs">{(r.user?.name || "U")[0]}</span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{r.user?.name || "User"}</p>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {new Date(r.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground text-sm">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;

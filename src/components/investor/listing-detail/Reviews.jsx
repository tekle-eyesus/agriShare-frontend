import { LISTING_REVIEWS } from "../../../mock-data/investor/data";
import { RatingStars } from "../../investor/Shared";

function Reviews({ avgRating }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
        <div className="text-center">
          <p className="font-bold text-primary text-3xl">
            {avgRating.toFixed(1)}
          </p>
          <RatingStars rating={avgRating} />
        </div>
        <div className="text-muted-foreground text-xs">
          Based on {LISTING_REVIEWS.length} investor reviews
        </div>
      </div>
      {LISTING_REVIEWS.map((r) => (
        <div key={r.id} className="pb-4 border-base-200 last:border-0 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-base-300 rounded-full w-8 text-base-content">
                  <span className="text-xs">{r.reviewer[0]}</span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{r.reviewer}</p>
                <RatingStars rating={r.rating} />
              </div>
            </div>
            <span className="text-muted-foreground text-xs">{r.date}</span>
          </div>
          <p className="mt-2 text-muted-foreground text-sm">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;

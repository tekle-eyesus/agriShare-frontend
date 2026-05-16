import { useSuspenseQuery } from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";
import { ReviewCard } from "./Cards";
import { TabContent } from "./Tab";
import { Card, EmptyState } from "../Shared";
import { Star } from "lucide-react";

function ReviewTab({ activeTab, listingId }) {
  const { farmer } = useAPI();
  const { data: { data: { reviews } = {} } = {} } = useSuspenseQuery({
    queryKey: ["listing-reviews", listingId],
    queryFn: () => farmer.getListingReviews({ listingId }),
  });
  console.log(reviews, "😪");
  return (
    <TabContent value="reviews" activeTab={activeTab}>
      <h3 className="mb-6 font-semibold text-lg">Investor Reviews</h3>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="p-0" hover={false}>
            <EmptyState
              title="No reviews yet"
              message="No investors have reviewed this listing yet."
              icon={Star}
            />
          </Card>
        ) : (
          reviews?.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </TabContent>
  );
}

export default ReviewTab;

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";
import { ReviewCard } from "./Cards";
import { TabContent } from "./Tab";
import { Card, EmptyState } from "../Shared";
import { Star, Loader2 } from "lucide-react";
import { useIntersectionObserver } from "../../../hook/useIntersectionObserver";

function ReviewTab({ activeTab, listingId }) {
  const { farmer } = useAPI();

  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["listing-reviews", listingId],
    queryFn: ({ pageParam = 1 }) => farmer.getListingReviews({ listingId, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const reviews = reviewsData?.pages.flatMap(page => page.data?.reviews || []) || [];

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
          <>
            {reviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
            
            {hasNextPage && (
              <div ref={observerRef} className="py-4 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </>
        )}
      </div>
    </TabContent>
  );
}

export default ReviewTab;

import { Star, Loader2 } from "lucide-react";
import { EmptyState } from "../../investor/Shared";
import { useAPI } from "../../../hook/useApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "../../../hook/useIntersectionObserver";

function Reviews({ listingId }) {
  const { multipleUsers } = useAPI();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["listing-reviews", listingId],
    queryFn: ({ pageParam = 1 }) => multipleUsers.getListingReviews({ listingId, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!listingId,
  });

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div className="p-4 text-center">Loading reviews...</div>;

  const reviews = data?.pages.flatMap(page => page.data?.reviews || []) || [];

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
                  <span className="text-xs">{(r.user?.name || r.user?.firstName || "U")[0]}</span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm">{r.user?.name || r.user?.firstName || "User"}</p>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">
              {new Date(r.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground text-sm">{r.comment}</p>
        </div>
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="py-4 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}

export default Reviews;

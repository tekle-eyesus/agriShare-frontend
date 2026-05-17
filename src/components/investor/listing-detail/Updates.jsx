import { useAPI } from "../../../hook/useApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Calendar, Loader2 } from "lucide-react";
import { useIntersectionObserver } from "../../../hook/useIntersectionObserver";

function Updates({ listingId }) {
  const { multipleUsers } = useAPI();
  
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["listing-updates", listingId],
    queryFn: ({ pageParam = 1 }) => multipleUsers.getListingUpdates({ listingId, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!listingId,
  });

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div className="p-4 text-center">Loading updates...</div>;
  
  const updates = data?.pages.flatMap(page => page.data?.updates || []) || [];

  if (!updates.length) return <div className="p-4 text-center text-muted-foreground">No updates yet.</div>;

  return (
    <div className="space-y-5">
      {updates.map((u) => (
        <div key={u._id} className="relative pl-4 border-primary/30 border-l-2">
          <span className="top-1 -left-[7px] absolute bg-primary rounded-full ring-4 ring-base-100 w-3 h-3" />
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar className="w-3 h-3" />
            {new Date(u.createdAt || u.date || Date.now()).toLocaleDateString()}
          </div>
          <p className="mt-1 font-semibold">{u.title}</p>
          <p className="mt-1 text-muted-foreground text-sm">{u.body || u.content}</p>
          {u.images && u.images.length > 0 && (
            <div className="gap-2 grid grid-cols-2 mt-3">
              {u.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url || img}
                  alt=""
                  className="rounded-lg object-cover aspect-video"
                />
              ))}
            </div>
          )}
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

export default Updates;

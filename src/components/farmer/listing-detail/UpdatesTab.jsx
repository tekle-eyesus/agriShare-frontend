import { Megaphone, Loader2 } from "lucide-react";
import { TabContent } from "./Tab";
import { UpdateCardModified } from "./Cards";
import { Card, EmptyState } from "../Shared";
import {
  useSuspenseInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";
import { useIntersectionObserver } from "../../../hook/useIntersectionObserver";
import toast from "react-hot-toast";

function UpdatesTab({
  activeTab,
  setPostOpen,
  setDeleteOpen,
  setEditingUpdate,
  setDeletingUpdate,
  listingId,
}) {
  const { farmer } = useAPI();
  const queryClient = useQueryClient();
  
  const { data: updatesData, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["listing-updates", listingId],
    queryFn: ({ pageParam = 1 }) => farmer.getListingUpdates({ listingId, page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const updates = updatesData?.pages.flatMap(page => page.data?.updates || []) || [];

  const handleDeleteUpdate = (update) => {
    setDeletingUpdate(update);
    setDeleteOpen(true);
  };

  return (
    <TabContent value="updates" activeTab={activeTab}>
      <div>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setPostOpen(true)}
            className="gap-2 btn btn-primary btn-sm"
          >
            <Megaphone className="w-4 h-4" />
            Post New Update
          </button>
        </div>
        {updates.length === 0 ? (
          <Card className="p-0" hover={false}>
            <EmptyState
              title="No updates yet"
              message="Post your first update to keep investors engaged."
              icon={Megaphone}
            />
          </Card>
        ) : (
          <div className="relative">
            {updates.map((u) => (
              <UpdateCardModified
                key={u._id}
                u={u}
                setEditingUpdate={setEditingUpdate}
                onDelete={handleDeleteUpdate}
              />
            ))}
            {hasNextPage && (
              <div ref={observerRef} className="py-4 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
          </div>
        )}
      </div>
    </TabContent>
  );
}

export default UpdatesTab;

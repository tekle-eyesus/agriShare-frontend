import { Download, Loader2, Users } from "lucide-react";
import { InvestorRow } from "./Rows";
import { TabContent } from "./Tab";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAPI } from "../../../hook/useApi";
import { useIntersectionObserver } from "../../../hook/useIntersectionObserver";
import { Card, EmptyState } from "../Shared";

function InvestorsTab({ activeTab, listingId }) {
  const { farmer } = useAPI();

  const { data: investorsData, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["listing-investors", listingId],
    queryFn: ({ pageParam = 1 }) => farmer.getListingInvestors({listingId,  page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    initialPageParam: 1,
  });

  const investors = investorsData?.pages.flatMap(page => page.data?.items || []) || [];
  const totalInvestors = investorsData?.pages[0]?.data?.total || 0;

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <TabContent value="investors" activeTab={activeTab}>
      {totalInvestors > 0 && <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="font-semibold text-lg">
          Investor List ({totalInvestors} investors)
        </h3>
        <button className="gap-2 btn-outline btn btn-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>}

      {investors.length === 0 ? (
        <Card className="p-0" hover={false}>
          <EmptyState
            title="No investors yet"
            message="There are currently no investors for this listing."
            icon={Users}
          />
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th className="px-4 py-3">Investor Name</th>
                <th className="px-4 py-3">Shares Owned</th>
                <th className="px-4 py-3">Amount Invested</th>
                <th className="px-4 py-3">Date Invested</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <InvestorRow key={investor._id || investor.id} investor={investor} />
              ))}
            </tbody>
          </table>
          <div
            ref={loadMoreRef}
            className="flex justify-center p-4 min-h-[40px]"
          >
            {isFetchingNextPage ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : hasNextPage ? (
              <span className="text-sm text-muted-foreground">
                Scroll for more
              </span>
            ) : null}
          </div>
        </div>
      )}
    </TabContent>
  );
}

export default InvestorsTab;

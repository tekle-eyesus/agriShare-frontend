import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import {
  PageHeader,
  Card,
  EmptyState,
  fadeInUp,
  staggerContainer,
} from "../../components/investor/Shared";
import Modal from "../../components/investor/Modal";
import QuickView from "../../components/investor/marketplace/QuickView";
import Listing from "../../components/investor/marketplace/Listing";
import FiltersPanel from "../../components/investor/marketplace/FiltersPanel";
import { useAPI } from "../../hook/useApi";
import { useQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "../../hook/useIntersectionObserver";

const SORTS = ["Newest", "Popular", "Highest ROI", "Ending soon"];
const LIMIT = 12;

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [region, setRegion] = useState("All");
  const [riskFilters, setRiskFilters] = useState({
    low: true,
    medium: true,
    high: true,
  });
  const [minRoi, setMinRoi] = useState(0);
  const [maxInvest, setMaxInvest] = useState(5000);
  const [sort, setSort] = useState("Newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [shares, setShares] = useState(1);
  const [page, setPage] = useState(1);

  const { multipleUsers } = useAPI();

  const { data: { data: { listings: activeListings } = {} } = {} } = useQuery({
    queryKey: ["active-listings"],
    queryFn: () => multipleUsers.getActiveListings(),
  });

  useEffect(() => {
    setPage(1);
  }, [search, type, region, riskFilters, minRoi, maxInvest, sort]);

  const filtered = useMemo(() => {
    if (!activeListings) return [];
    
    let arr = activeListings.filter((l) => {
      const expectedYield = l.expectedTotalYieldBirr || 0;
      const goal = l.investmentGoalBirr || 1;
      const roi = Number(((expectedYield - goal) / goal * 100).toFixed(1));
      const minInvestment = l.minSharesPerInvestor * l.sharePricePerTokenBirr;
      const title = l.pitchTitle || "";
      const farmerName = l.farmer?.name || "Farmer";
      const typeStr = l.asset?.type || "unknown";
      const locationRegion = l.asset?.location?.region || "";
      const riskLevel = "medium";
      
      if (
        search &&
        !title.toLowerCase().includes(search.toLowerCase()) &&
        !farmerName.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (type !== "All" && typeStr !== type) return false;
      if (region !== "All" && !locationRegion.toLowerCase().includes(region.toLowerCase())) return false;
      if (!riskFilters[riskLevel]) return false;
      if (roi < minRoi) return false;
      if (minInvestment > maxInvest) return false;
      return true;
    });

    if (sort === "Highest ROI") {
      arr = [...arr].sort((a, b) => {
        const roiA = ((a.expectedTotalYieldBirr || 0) - (a.investmentGoalBirr || 1)) / (a.investmentGoalBirr || 1);
        const roiB = ((b.expectedTotalYieldBirr || 0) - (b.investmentGoalBirr || 1)) / (b.investmentGoalBirr || 1);
        return roiB - roiA;
      });
    }
    if (sort === "Ending soon") {
      arr = [...arr].sort((a, b) => {
        const daysA = Math.ceil((new Date(a.investmentDeadline) - new Date()) / (1000 * 60 * 60 * 24));
        const daysB = Math.ceil((new Date(b.investmentDeadline) - new Date()) / (1000 * 60 * 60 * 24));
        return daysA - daysB;
      });
    }
    if (sort === "Popular") {
      arr = [...arr].sort((a, b) => (b.totalInvestedBirr || 0) - (a.totalInvestedBirr || 0));
    }
    return arr;
  }, [activeListings, search, type, region, riskFilters, minRoi, maxInvest, sort]);

  const reset = () => {
    setSearch("");
    setType("All");
    setRegion("All");
    setMinRoi(0);
    setMaxInvest(5000);
    setRiskFilters({ low: true, medium: true, high: true });
    setSort("Newest");
  };

  const visibleListings = filtered.slice(0, page * LIMIT);
  const hasNextPage = page * LIMIT < filtered.length;

  const { loadMoreRef } = useIntersectionObserver({
    onIntersect: () => setPage((p) => p + 1),
    enabled: hasNextPage,
  });

  const FiltersPanelComponent = (
    <FiltersPanel
      region={region}
      setRegion={setRegion}
      minRoi={minRoi}
      setMinRoi={setMinRoi}
      maxInvest={maxInvest}
      setMaxInvest={setMaxInvest}
      riskFilters={riskFilters}
      setRiskFilters={setRiskFilters}
      reset={reset}
    />
  );

  return (
    <div>
      <PageHeader
        title="Marketplace"
        subtitle="Discover farmland and livestock investment opportunities."
        actions={
          <>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="hidden sm:flex select-bordered select-sm select"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button
              className="lg:hidden gap-2 border btn-outline btn btn-sm"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </>
        }
      />

      <div className="flex lg:flex-row flex-col gap-6">
        <aside className="hidden lg:block w-72 shrink-0">
          <Card className="top-20 sticky p-5" hover={false}>
            {FiltersPanelComponent}
          </Card>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex gap-2 mb-4">
            <label className="flex flex-1 items-center gap-2 input input-sm input-bordered">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search listing or farmer…"
                className="bg-transparent outline-none grow"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sm:hidden select-bordered select-sm select"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <p className="mb-3 text-muted-foreground text-xs">
            {filtered.length} listings found
          </p>

          {filtered.length === 0 ? (
            <Card className="p-0" hover={false}>
              <EmptyState
                title="No listings match your filters"
                message="Try adjusting your filters or search keywords."
                action={
                  <button onClick={reset} className="btn btn-primary btn-sm">
                    Reset filters
                  </button>
                }
              />
            </Card>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleListings.map((listing) => (
                  <motion.div key={listing.id || listing._id} variants={fadeInUp}>
                    <Listing
                      listing={listing}
                      handleQuickView={() => {
                        setQuickView(listing);
                        setShares(1);
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              <div
                ref={loadMoreRef}
                className="flex justify-center p-6 min-h-[60px]"
              >
                {hasNextPage && (
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        size="md"
      >
        <div className="p-6">{FiltersPanelComponent}</div>
      </Modal>

      <Modal
        open={!!quickView}
        onClose={() => setQuickView(null)}
        title="Quick invest"
        size="md"
      >
        {quickView && (
          <QuickView
            quickView={quickView}
            shares={shares}
            setShares={setShares}
          />
        )}
      </Modal>
    </div>
  );
}

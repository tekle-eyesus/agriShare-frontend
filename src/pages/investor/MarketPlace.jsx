import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  PageHeader,
  Card,
  EmptyState,
  fadeInUp,
  staggerContainer,
} from "../../components/investor/Shared";
import Modal from "../../components/investor/Modal";
import { LISTINGS } from "../../mock-data/investor/data";
import QuickView from "../../components/investor/marketplace/QuickView";
import Listing from "../../components/investor/marketplace/Listing";
import FiltersPanel from "../../components/investor/marketplace/FiltersPanel";
const SORTS = ["Newest", "Popular", "Highest ROI", "Ending soon"];

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

  const filtered = useMemo(() => {
    let arr = LISTINGS.filter((l) => {
      if (
        search &&
        !l.title.toLowerCase().includes(search.toLowerCase()) &&
        !l.farmer.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (type !== "All" && l.type !== type) return false;
      if (region !== "All" && !l.location.includes(region)) return false;
      if (!riskFilters[l.riskLevel]) return false;
      if (l.roi < minRoi) return false;
      if (l.minInvestment > maxInvest) return false;
      return true;
    });
    if (sort === "Highest ROI") arr = [...arr].sort((a, b) => b.roi - a.roi);
    if (sort === "Ending soon")
      arr = [...arr].sort((a, b) => a.daysRemaining - b.daysRemaining);
    if (sort === "Popular")
      arr = [...arr].sort((a, b) => b.investors - a.investors);
    return arr;
  }, [search, type, region, riskFilters, minRoi, maxInvest, sort]);

  const reset = () => {
    setSearch("");
    setType("All");
    setRegion("All");
    setMinRoi(0);
    setMaxInvest(5000);
    setRiskFilters({ low: true, medium: true, high: true });
    setSort("Newest");
  };

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
              className="lg:hidden gap-2 btn-outline btn btn-sm"
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
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((listing) => (
                <motion.div key={listing.id} variants={fadeInUp}>
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

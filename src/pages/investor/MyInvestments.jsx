import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { PageHeader, Card, EmptyState } from "../../components/investor/Shared";
import { Drawer } from "../../components/investor/Modal";
import MobileCard from "../../components/investor/investment/MobileCard";
import DesktopTable from "../../components/investor/investment/DesktopTable";
import DrawerContent from "../../components/investor/investment/DrawerContent";
import FilterCard from "../../components/investor/investment/FilterCard";
import { useQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";

export default function MyInvestments() {
  const { investor } = useAPI();
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const { data: activeRes, isLoading: isLoadingActive } = useQuery({
    queryKey: ["active-investments"],
    queryFn: investor.getActiveInvestments,
  });

  const { data: historyRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["history-investments"],
    queryFn: investor.getInvestmentHistory,
  });

  const mappedInvestments = useMemo(() => {
    const active = activeRes?.data?.investments || [];
    const history = historyRes?.data?.history || [];
    const all = [...active, ...history];

    return all.map((inv) => {
      const listing = inv.listing || {};
      const asset = listing.asset || {};
      const shares = inv.sharesOwned || inv.shares || 0;
      const sharePrice = listing.sharePricePerTokenBirr || 0; // Might not be populated, fallback to 0
      const amountInvested = shares * sharePrice || 0; 
      
      // Calculate basic ROI if data is available
      let roi = 0;
      if (listing.investmentGoalBirr && listing.expectedTotalYieldBirr) {
        roi = ((listing.expectedTotalYieldBirr - listing.investmentGoalBirr) / listing.investmentGoalBirr) * 100;
      }

      return {
        id: inv._id,
        listingId: listing._id,
        listingTitle: listing.pitchTitle || asset.name || "Investment Listing",
        shares: shares,
        amountInvested: amountInvested,
        currentValue: amountInvested + (amountInvested * (roi / 100)),
        roi: roi.toFixed(1),
        nextPayout: listing.effectivePaydayDate ? new Date(listing.effectivePaydayDate).toLocaleDateString() : "N/A",
        status: inv.status,
        type: asset.type || "unknown",
        image: asset.photos?.[0]?.url || "https://placehold.co/600x400?text=Listing+Image",
      };
    });
  }, [activeRes, historyRes]);

  const filtered = useMemo(
    () =>
      mappedInvestments.filter((i) => {
        if (status !== "All" && i.status !== status) return false;
        if (type !== "All" && i.type !== type) return false;
        if (
          search &&
          !i.listingTitle.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [status, type, search, mappedInvestments],
  );

  const exportCSV = () => {
    const header =
      "Listing,Shares,Invested,Current Value,ROI %,Next Payout,Status\n";
    const rows = filtered
      .map(
        (i) =>
          `"${i.listingTitle}",${i.shares},${i.amountInvested},${i.currentValue},${i.roi},${i.nextPayout || ""},${i.status}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investments.csv";
    a.click();
  };

  if (isLoadingActive || isLoadingHistory) {
    return <div className="p-10 text-center">Loading investments...</div>;
  }

  return (
    <div>
      <PageHeader
        title="My Investments"
        subtitle="Track your portfolio, ROI, and upcoming payouts."
        actions={
          <button
            onClick={exportCSV}
            className="gap-2 border btn-outline btn btn-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      <FilterCard
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        type={type}
        setType={setType}
      />

      {filtered.length === 0 ? (
        <Card className="mt-4 p-0" hover={false}>
          <EmptyState
            title="No investments match"
            message="Try resetting filters or browse the marketplace."
            action={
              <Link
                to="/investor/marketplace"
                className="btn btn-primary btn-sm"
              >
                Browse marketplace
              </Link>
            }
          />
        </Card>
      ) : (
        <>
          <DesktopTable filtered={filtered} setOpen={setOpen} />
          <MobileCard filtered={filtered} setOpen={setOpen} />
        </>
      )}

      <Drawer
        open={!!open}
        onClose={() => setOpen(null)}
        title="Investment details"
      >
        {open && <DrawerContent open={open} />}
      </Drawer>
    </div>
  );
}

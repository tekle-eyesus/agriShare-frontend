import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { PageHeader, Card, EmptyState } from "../../components/investor/Shared";
import { Drawer } from "../../components/investor/Modal";
import { INVESTMENTS, LISTINGS } from "../../mock-data/investor/data";
import MobileCard from "../../components/investor/investment/MobileCard";
import DesktopTable from "../../components/investor/investment/DesktopTable";
import DrawerContent from "../../components/investor/investment/DrawerContent";
import FilterCard from "../../components/investor/investment/FilterCard";

export default function MyInvestments() {
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(
    () =>
      INVESTMENTS.filter((i) => {
        if (status !== "All" && i.status !== status) return false;
        if (type !== "All" && i.type !== type) return false;
        if (
          search &&
          !i.listingTitle.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        return true;
      }),
    [status, type, search],
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

  const listingFor = (id) => LISTINGS.find((l) => l.id === id);

  return (
    <div>
      <PageHeader
        title="My Investments"
        subtitle="Track your portfolio, ROI, and upcoming payouts."
        actions={
          <button onClick={exportCSV} className="gap-2 btn-outline btn btn-sm">
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

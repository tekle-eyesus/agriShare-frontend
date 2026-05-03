import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, DollarSign, User2, TrendingUp } from "lucide-react";

import SummaryCard from "../../components/farmer/investors/SummartCard";
import InvestorRow from "../../components/farmer/investors/InvestorRow";
import InvestorDetailModal from "../../components/farmer/investors/InvestorDetailModal";
import CommunicationSection from "../../components/farmer/investors/CommunicationSection";
import EmptyState from "../../components/farmer/investors/EmptyState";
import { mockInvestors } from "../../mock-data/farmer/investor";

export function Investors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredInvestors = mockInvestors.filter((investor) => {
    const matchesSearch =
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesListing =
      !selectedListing || investor.listings.includes(selectedListing);

    let matchesRange = true;
    if (investmentRange === "low") {
      matchesRange = investor.totalInvested < 10000;
    } else if (investmentRange === "mid") {
      matchesRange =
        investor.totalInvested >= 10000 && investor.totalInvested <= 25000;
    } else if (investmentRange === "high") {
      matchesRange = investor.totalInvested > 25000;
    }

    return matchesSearch && matchesListing && matchesRange;
  });

  const totalInvestors = filteredInvestors.length;
  const totalCapital = filteredInvestors.reduce(
    (sum, inv) => sum + inv.totalInvested,
    0,
  );
  const avgInvestment =
    totalInvestors > 0 ? Math.round(totalCapital / totalInvestors) : 0;

  const handleViewDetails = (investor) => {
    setSelectedInvestor(investor);
    setShowDetailModal(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Total Invested",
      "Listings",
      "First Investment",
      "Last Investment",
    ];
    const rows = filteredInvestors.map((inv) => [
      inv.name,
      inv.email,
      inv.phone,
      inv.totalInvested,
      inv.listings.join(", "),
      inv.firstInvestment,
      inv.lastInvestment,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investors_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="mx-auto px-4 py-6 max-w-[1536px]">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="mb-2 font-bold text-3xl">My Investors</h1>
          <p className="text-base-content/70">
            Manage relationships with people who invested in your farm
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="gap-4 grid grid-cols-1 sm:grid-cols-3 mb-6"
        >
          <SummaryCard
            title="Total Unique Investors"
            value={totalInvestors}
            icon={User2}
            color="primary"
          />
          <SummaryCard
            title="Total Capital Raised"
            value={`${totalCapital.toLocaleString()} ETB`}
            icon={DollarSign}
          />
          <SummaryCard
            title="Average Investment"
            value={`${avgInvestment.toLocaleString()} ETB`}
            icon={TrendingUp}
          />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-100 shadow-md mb-6 border border-base-200 card"
        >
          <div className="p-6 card-body">
            <div className="flex sm:flex-row flex-col gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="top-1/2 left-3 absolute w-5 h-5 text-base-content/40 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or listing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full input input-bordered"
                />
              </div>
              <button
                onClick={handleExportCSV}
                className="gap-2 btn-outline btn"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedListing}
                onChange={(e) => setSelectedListing(e.target.value)}
                className="select-bordered select-sm select"
              >
                <option value="">All Listings</option>
                <option value="Teff Farm">Teff Farm</option>
                <option value="Coffee Plantation">Coffee Plantation</option>
              </select>

              <select
                value={investmentRange}
                onChange={(e) => setInvestmentRange(e.target.value)}
                className="select-bordered select-sm select"
              >
                <option value="">Investment Range</option>
                <option value="low">Under 10,000 ETB</option>
                <option value="mid">10,000 - 25,000 ETB</option>
                <option value="high">Over 25,000 ETB</option>
              </select>

              {(searchQuery || selectedListing || investmentRange) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedListing("");
                    setInvestmentRange("");
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Investor Table */}
        {filteredInvestors.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-base-100 shadow-md border border-base-200 overflow-hidden card"
          >
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="px-6 py-4">Investor Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Total Invested</th>
                    <th className="px-6 py-4">Listings</th>
                    <th className="px-6 py-4">First Investment</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredInvestors.map((investor) => (
                      <InvestorRow
                        key={investor.id}
                        investor={investor}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <EmptyState />
        )}

        {/* Communication Section */}
        <div className="mt-6">
          <CommunicationSection />
        </div>

        {/* Investor Detail Modal */}
        <InvestorDetailModal
          investor={selectedInvestor}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      </div>
    </div>
  );
}

export default Investors;

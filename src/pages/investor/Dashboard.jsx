import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { PageHeader, staggerContainer } from "../../components/investor/Shared";
import {
  PORTFOLIO_KPIS,
  INVESTMENTS,
  LISTINGS,
} from "../../mock-data/investor/data";
import { formatETB } from "../../utils/format";
import DistributionChart from "../../components/investor/dashboard/DistributionChart";
import WalletComponent from "../../components/investor/dashboard/Wallet";
import AllocationAndInvestment from "../../components/investor/dashboard/AllocationAndInvestment";
import ActiveListingPreview from "../../components/investor/dashboard/ActiveListingPreview";
import Recommended from "../../components/investor/dashboard/Recommended";
import KPICard from "../../components/investor/dashboard/KPICard";

export default function InvestorDashboard() {
  const investedListings = INVESTMENTS.slice(0, 3)
    .map((inv) => LISTINGS.find((l) => l.id === inv.listingId))
    .filter(Boolean);
  const recommended = LISTINGS.filter(
    (l) =>
      !INVESTMENTS.some((i) => i.listingId === l.id) && l.status === "active",
  ).slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Welcome back, Yodit 👋"
        subtitle="Here's how your AgriShare portfolio is performing today."
        actions={
          <Link
            to="/investor/marketplace"
            className="gap-2 btn btn-primary btn-sm"
          >
            <Sparkles className="w-4 h-4" /> Browse marketplace
          </Link>
        }
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KPICard
          title="Total Invested"
          value={formatETB(PORTFOLIO_KPIS.totalInvested.value)}
          trend={PORTFOLIO_KPIS.totalInvested.trend}
          icon={PiggyBank}
        />
        <KPICard
          title="Portfolio Value"
          value={formatETB(PORTFOLIO_KPIS.portfolioValue.value)}
          trend={PORTFOLIO_KPIS.portfolioValue.trend}
          icon={BarChart3}
          accent
        />
        <KPICard
          title="Total Returns"
          value={formatETB(PORTFOLIO_KPIS.totalReturns.value)}
          trend={PORTFOLIO_KPIS.totalReturns.trend}
          icon={TrendingUp}
        />
        <KPICard
          title="Active Investments"
          value={PORTFOLIO_KPIS.activeInvestments.value}
          desc="Across 3 sectors"
          icon={Wallet}
        />
      </motion.div>

      <div className="gap-4 grid grid-cols-1 xl:grid-cols-3 mt-6">
        <DistributionChart />
        <WalletComponent />
      </div>
      <AllocationAndInvestment />
      <ActiveListingPreview investedListings={investedListings} />
      <Recommended recommended={recommended} />
    </div>
  );
}

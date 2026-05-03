import { motion } from "framer-motion";
import {
  Users,
  Layers,
  Wallet,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "../../components/admin/shared";
import { KPIS } from "../../mock-data/admin/data";
import { formatETB, formatNumber } from "../../utils/format";
import KPICard from "../../components/admin/dashboard/KPICard";
import QueueAlertCard from "../../components/admin/dashboard/QueueAlertCard";
import TopListingsCard from "../../components/admin/dashboard/TopListingsCard";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import SystemStatusCard from "../../components/admin/dashboard/SystemStatusCard";
import ActivityFeed from "../../components/admin/dashboard/ActivityFeed";
import { stagger } from "../../utils/motionVariants";

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Teklehiwot. Here's what needs your attention today."
        actions={
          <>
            <button className="gap-2 btn-outline normal-case btn btn-sm">
              <Download className="w-3.5 h-3.5" /> Export report
            </button>
            <button className="gap-2 normal-case btn btn-sm btn-primary">
              <TrendingUp className="w-3.5 h-3.5" /> View analytics
            </button>
          </>
        }
      />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-6"
      >
        <KPICard
          title="Total Users"
          value={formatNumber(KPIS.totalUsers.value)}
          trend={KPIS.totalUsers.trend}
          icon={Users}
          breakdown={KPIS.totalUsers.breakdown}
          gradient
        />
        <KPICard
          title="Active Listings"
          value={KPIS.activeListings.value}
          trend={KPIS.activeListings.trend}
          icon={Layers}
          breakdown={KPIS.activeListings.breakdown}
        />
        <KPICard
          title="Investment Volume"
          value={formatETB(KPIS.investmentVolume.value)}
          trend={KPIS.investmentVolume.trend}
          icon={Wallet}
        />
        <KPICard
          title="Pending Verifications"
          value={KPIS.pendingVerifications.value}
          icon={ShieldCheck}
          breakdown={KPIS.pendingVerifications.breakdown}
        />
        <KPICard
          title="Pending Refunds"
          value={KPIS.pendingRefunds.value}
          urgent={KPIS.pendingRefunds.urgent}
          icon={RotateCcw}
        />
        <KPICard
          title="Platform Revenue"
          value={formatETB(KPIS.platformRevenue.value)}
          trend={KPIS.platformRevenue.trend}
          icon={TrendingUp}
        />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6"
      >
        <QueueAlertCard
          title="Farmer verifications"
          count={12}
          color="bg-primary/10 text-primary"
          icon={CheckCircle2}
          href="/farmers"
        />
        <QueueAlertCard
          title="Asset verifications"
          count={6}
          color="bg-info/10 text-info"
          icon={Layers}
          href="/assets"
        />
        <QueueAlertCard
          title="Risk alerts"
          count={5}
          color="bg-warning/15 text-warning"
          icon={AlertCircle}
          href="/risk"
        />
        <QueueAlertCard
          title="Refund requests"
          count={7}
          color="bg-error/10 text-error"
          icon={RotateCcw}
          href="/refunds"
        />
      </motion.div>

      <div className="gap-5 grid grid-cols-1 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <RevenueChart />
          <TopListingsCard />
        </div>
        <div className="space-y-5">
          <SystemStatusCard />
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}

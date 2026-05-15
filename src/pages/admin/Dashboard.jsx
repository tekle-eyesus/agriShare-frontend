import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAPI } from "../../hook/useApi";

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
  FileText,
  Bell,
} from "lucide-react";
import { PageHeader } from "../../components/admin/shared";
import { formatETB, formatNumber } from "../../utils/format";
import KPICard from "../../components/admin/dashboard/KPICard";
import QueueAlertCard from "../../components/admin/dashboard/QueueAlertCard";

import { stagger } from "../../utils/motionVariants";
import UsersSummary from "../../components/admin/dashboard/UsersSummary";
import ListingsSummary from "../../components/admin/dashboard/ListingsSummary";
import InvestmentSummary from "../../components/admin/dashboard/InvestmentSummary";

export default function Dashboard() {
  const { admin } = useAPI();
  const {
    data: { data },
  } = useSuspenseQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => admin.getDashboardData(),
  });

  const totalPendingVerifications =
    data?.queues.pendingFarmerVerifications + data.queues.pendingAssets;

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, Teklehiwot. Overview generated at ${new Date(data.generatedAt).toLocaleString()}.`}
      />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-6"
      >
        <KPICard
          title="Total Users"
          value={formatNumber(data.users.total)}
          icon={Users}
          gradient
          breakdown={{
            Farmers: data.users.farmers,
            Investors: data.users.investors,
            Admins: data.users.admins,
          }}
        />
        <KPICard
          title="Active Listings"
          value={formatNumber(data.listings.active)}
          icon={Layers}
          breakdown={{
            Funded: data.listings.funded,
            Completed: data.listings.completed,
            Cancelled: data.listings.cancelled,
            Failed: data.listings.failed,
            Refunded: data.listings.refunded,
          }}
        />
        <KPICard
          title="Total Contracts"
          value={formatNumber(data.investments.totalContracts)}
          icon={FileText}
          breakdown={{
            Active: data.investments.activeContracts,
            Completed: data.investments.completedContracts,
            Refunded: data.investments.refundedContracts,
          }}
        />
        <KPICard
          title="Gross Investment"
          value={formatETB(data.investments.grossInvestmentBirr)}
          icon={Wallet}
        />
        <KPICard
          title="Pending Verifications"
          value={formatNumber(totalPendingVerifications)}
          icon={ShieldCheck}
          breakdown={{
            Farmers: data.queues.pendingFarmerVerifications,
            Assets: data.queues.pendingAssets,
          }}
        />
        <KPICard
          title="Refunded Amount"
          value={formatETB(data.investments.refundedAmountBirr)}
          icon={RotateCcw}
          badge={{
            label: "contracts",
            count: data.investments.refundedContracts,
            color: "badge-error",
          }}
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
          count={data.queues.pendingFarmerVerifications}
          color="bg-primary/10 text-primary"
          icon={CheckCircle2}
          href="/farmers"
        />
        <QueueAlertCard
          title="Asset verifications"
          count={data.queues.pendingAssets}
          color="bg-info/10 text-info"
          icon={Layers}
          href="/assets"
        />
        <QueueAlertCard
          title="Unread notifications"
          count={data.notifications.unread}
          color="bg-warning/15 text-warning"
          icon={Bell}
          href="#"
        />
      </motion.div>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="gap-5 grid grid-cols-1 lg:grid-cols-3 mb-6"
      >
        <UsersSummary users={data.users} />
        <ListingsSummary listings={data.listings} />
        <InvestmentSummary investments={data.investments} />
      </motion.div>

      {data.users.total === 0 && (
        <div className="mb-6 alert alert-info">
          <AlertCircle className="w-5 h-5" />
          <span>
            No data available yet. The platform overview shows zero counts
            across all metrics.
          </span>
        </div>
      )}
    </>
  );
}

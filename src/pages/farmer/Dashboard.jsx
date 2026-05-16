import { MessageCircle, Phone } from "lucide-react";

import Hero from "../../components/farmer/dashboard/Hero";
import VerificationBanner from "../../components/farmer/dashboard/VerificationBanner";
import Financials from "../../components/farmer/dashboard/Financials";
import AssetsListingsAndQuickActions from "../../components/farmer/dashboard/AssetsListingsAndQuickActions";
import { PageHeader } from "../../components/farmer/Shared";
import { useAPI } from "../../hook/useApi";
import { useSuspenseQuery } from "@tanstack/react-query";

function Dashboard() {
  const { farmer } = useAPI();
  const { data } = useSuspenseQuery({
    queryKey: ["farmer-dashboard"],
    queryFn: () => farmer.getDashboardData(),
  });
  const user = data?.data?.user || {};
  const stats = data?.data?.stats || {};
  const firstName = user.fullName?.split(" ")[0] || "";
  const walletNegative = user.walletBalance < 0;
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
      })
    : "";

  return (
    <div>
      <PageHeader
        title="Farmer Dashboard"
        subtitle="Your account, assets, and listings at a glance."
      />

      <Hero firstName={firstName} memberSince={memberSince} user={user} />

      {user.verificationStatus !== "verified" && <VerificationBanner />}

      <Financials user={user} stats={stats} walletNegative={walletNegative} />

      <AssetsListingsAndQuickActions stats={stats} />
    </div>
  );
}

export default Dashboard;

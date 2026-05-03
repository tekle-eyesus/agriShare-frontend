import { motion } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Wallet, BarChart3, Zap } from "lucide-react";
import { PageHeader } from "../../components/admin/shared";
import InvestmentTab from "../../components/admin/analytics/InvestmentTab";
import DistributionTab from "../../components/admin/analytics/DistributionTab";
import CreditsTab from "../../components/admin/analytics/CreditsTab";

const TABS = [
  { id: "investment", label: "Investment", icon: Wallet },
  { id: "distribution", label: "Distribution", icon: BarChart3 },
  { id: "credits", label: "AgriCredits", icon: Zap },
];

export default function Analytics() {
  const [tab, setTab] = useState("investment");
  const [range, setRange] = useState("30d");

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Investment, distribution and credit insights across the AgriShare platform."
        actions={
          <>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="rounded-lg select-bordered select-sm select"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="custom">Custom range…</option>
            </select>
            <button className="gap-2 btn-outline normal-case btn btn-sm">
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <button className="gap-2 normal-case btn btn-sm btn-primary">
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
          </>
        }
      />

      <div
        role="tablist"
        className="inline-flex bg-base-100 mb-5 p-1 border border-base-300 rounded-xl tabs tabs-boxed"
      >
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`tab gap-2 normal-case font-semibold ${tab === t.id ? "bg-primary text-primary-content" : ""}`}
            >
              <Icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tab === "investment" && <InvestmentTab />}
        {tab === "distribution" && <DistributionTab />}
        {tab === "credits" && <CreditsTab />}
      </motion.div>
    </>
  );
}

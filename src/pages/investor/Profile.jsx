import { useState } from "react";
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Trash2,
  BadgeCheck,
} from "lucide-react";
import { PageHeader, Card } from "../../components/investor/Shared";
import DeleteSection from "../../components/investor/profile/DeleteSection";
import ProfileSection from "../../components/investor/profile/ProfileSection";
import PaymentSection from "../../components/investor/profile/PaymentSection";
import NotifSection from "../../components/investor/profile/NotifSection";
import KYCSection from "../../components/investor/profile/KYCSection";
import SecuritySection from "../../components/investor/profile/SecuritySection";

const SECTIONS = [
  { id: "profile", label: "Profile information", icon: User },
  { id: "payment", label: "Payment methods", icon: CreditCard },
  { id: "notifications", label: "Notification preferences", icon: Bell },
  { id: "kyc", label: "KYC / Verification", icon: BadgeCheck },
  { id: "security", label: "Security", icon: Shield },
  { id: "delete", label: "Delete account", icon: Trash2 },
];

export default function Profile() {
  const [section, setSection] = useState("profile");
  return (
    <div>
      <PageHeader
        title="Profile & Settings"
        subtitle="Manage your account, payment methods, and security."
      />

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
        <Card className="lg:top-20 lg:sticky p-3 h-fit" hover={false}>
          <nav className="space-y-1">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const active = section === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-base-content/70 hover:bg-base-200"
                  } ${s.id === "delete" ? (active ? "" : "text-error") : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </Card>

        <div className="space-y-4 lg:col-span-3">
          {section === "profile" && <ProfileSection />}
          {section === "payment" && <PaymentSection />}
          {section === "notifications" && <NotifSection />}
          {section === "kyc" && <KYCSection />}
          {section === "security" && <SecuritySection />}
          {section === "delete" && <DeleteSection />}
        </div>
      </div>
    </div>
  );
}

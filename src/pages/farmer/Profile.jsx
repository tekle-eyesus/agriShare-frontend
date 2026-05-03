import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SettingsNav from "../../components/farmer/profile/SettingsNav";
import ProfileSection from "../../components/farmer/profile/ProfileSection";
import VerificationSection from "../../components/farmer/profile/VerificationSection";
import BankingSection from "../../components/farmer/profile/BankingSection";
import NotificationsSection from "../../components/farmer/profile/NotificationSection";
import SecuritySection from "../../components/farmer/profile/SecuritySection";
import AccountDeletionSection from "../../components/farmer/profile/AccountDeletionSection";

export function Profile() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "verification":
        return <VerificationSection />;
      case "banking":
        return <BankingSection />;
      case "notifications":
        return <NotificationsSection />;
      case "security":
        return <SecuritySection />;
      case "account":
        return <AccountDeletionSection />;
      default:
        return <ProfileSection />;
    }
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
          <h1 className="mb-2 font-bold text-3xl">Profile & Settings</h1>
          <p className="text-base-content/70">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SettingsNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-base-100 shadow-md border border-base-200 card">
              <div className="p-6 card-body">
                <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

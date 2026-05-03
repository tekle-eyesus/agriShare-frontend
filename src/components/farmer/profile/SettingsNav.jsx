import { motion } from "framer-motion";
import { User, Shield, CreditCard, Bell, Lock, Trash2 } from "lucide-react";

export function SettingsNav({ activeSection, onSectionChange }) {
  const navItems = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "verification", label: "Verification Status", icon: Shield },
    { id: "banking", label: "Bank & Payout Settings", icon: CreditCard },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "account", label: "Account Deletion", icon: Trash2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="top-6 sticky bg-base-100 shadow-md border border-base-200 card"
    >
      <div className="p-4 card-body">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                activeSection === item.id
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/70 hover:bg-base-200"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}

export default SettingsNav;

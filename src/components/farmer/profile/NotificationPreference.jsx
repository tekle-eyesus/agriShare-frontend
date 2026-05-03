import { useState } from "react";
import { motion } from "framer-motion";

const ToggleSwitch = ({ checked, onCheckedChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="toggle toggle-primary toggle-sm"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

function NotificationPreference({
  title,
  description,
  emailDefault,
  inAppDefault,
}) {
  const [email, setEmail] = useState(emailDefault);
  const [inApp, setInApp] = useState(inAppDefault);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 hover:shadow-sm p-4 border border-base-200 rounded-lg transition-shadow"
    >
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-base-content/60">{description}</div>
      </div>
      <div className="flex gap-6">
        <ToggleSwitch
          checked={email}
          onCheckedChange={setEmail}
          label="Email"
        />
        <ToggleSwitch
          checked={inApp}
          onCheckedChange={setInApp}
          label="In-app"
        />
      </div>
    </motion.div>
  );
}

export default NotificationPreference;

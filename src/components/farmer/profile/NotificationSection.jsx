import { motion } from "framer-motion";
import { Save } from "lucide-react";
import NotificationPreference from "./NotificationPreference";

function NotificationsSection() {
  return (
    <motion.div
      key="notifications"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      <h2 className="font-bold text-2xl">Notification Preferences</h2>
      <p className="text-base-content/60">
        Choose how you want to receive notifications
      </p>

      <div className="space-y-4">
        <NotificationPreference
          title="New Investment Alerts"
          description="Get notified when someone invests in your listings"
          emailDefault={true}
          inAppDefault={true}
        />
        <NotificationPreference
          title="Investor Reviews"
          description="Get notified when investors leave reviews"
          emailDefault={true}
          inAppDefault={true}
        />
        <NotificationPreference
          title="Listing Update Reminders"
          description="Weekly digest reminding you to post updates"
          emailDefault={false}
          inAppDefault={true}
        />
        <NotificationPreference
          title="Payout Reminders"
          description="Reminders about upcoming payout dates"
          emailDefault={true}
          inAppDefault={true}
        />
        <NotificationPreference
          title="Platform Announcements"
          description="Important updates and news from AgriShare"
          emailDefault={true}
          inAppDefault={false}
        />
        <NotificationPreference
          title="Marketing Communications"
          description="Tips, best practices, and promotional content"
          emailDefault={false}
          inAppDefault={false}
        />
      </div>

      <button className="gap-2 btn btn-primary">
        <Save className="w-4 h-4" />
        Save Preferences
      </button>
    </motion.div>
  );
}

export default NotificationsSection;

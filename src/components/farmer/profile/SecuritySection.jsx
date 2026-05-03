import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import ActiveSessionItem from "./ActiveSessionItem";

export function SecuritySection() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      key="security"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      <h2 className="font-bold text-2xl">Security</h2>

      <div>
        <h3 className="mb-4 font-semibold">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Current Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="pr-10 w-full input input-bordered"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="top-1/2 right-3 absolute -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">New Password</span>
            </label>
            <input type="password" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">
                Confirm New Password
              </span>
            </label>
            <input type="password" className="input input-bordered" />
          </div>
          <button className="btn btn-primary">Update Password</button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Two-Factor Authentication</h3>
        <div className="p-6 border border-base-200 rounded-xl">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
            <div>
              <div className="mb-1 font-medium">Authenticator App</div>
              <div className="text-sm text-base-content/60">
                Use an authenticator app to generate verification codes
              </div>
            </div>
            <button className="btn btn-primary btn-sm">Setup</button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Active Sessions</h3>
        <div className="space-y-3">
          <ActiveSessionItem
            device="Current Session"
            location="Addis Ababa, Ethiopia"
            browser="Chrome on Windows"
            lastActive="Just now"
            isCurrent={true}
          />
          <ActiveSessionItem
            device="Mobile Device"
            location="Debre Markos, Ethiopia"
            browser="Safari on iOS"
            lastActive="2 hours ago"
            isCurrent={false}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Login History</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-base-200 border-b">
            <span>Today, 9:30 AM</span>
            <span className="text-base-content/60">Chrome on Windows</span>
          </div>
          <div className="flex justify-between py-2 border-base-200 border-b">
            <span>Yesterday, 3:15 PM</span>
            <span className="text-base-content/60">Safari on iOS</span>
          </div>
          <div className="flex justify-between py-2 border-base-200 border-b">
            <span>Apr 26, 10:20 AM</span>
            <span className="text-base-content/60">Chrome on Windows</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SecuritySection;

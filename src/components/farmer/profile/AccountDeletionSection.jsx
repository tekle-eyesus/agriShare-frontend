import { motion } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";
import { slideIn } from "../../../utils/motionVariants";

export function AccountDeletionSection() {
  return (
    <motion.div
      key="account"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      <h2 className="font-bold text-2xl">Account Deletion</h2>

      <div className="shadow-lg alert alert-error">
        <AlertTriangle className="w-6 h-6" />
        <div>
          <h3 className="font-bold">Warning: This action is permanent</h3>
          <div className="text-sm">
            Deleting your account will permanently remove all your data.
          </div>
        </div>
      </div>

      <div className="bg-error/10 p-6 border border-error/30 rounded-xl">
        <h3 className="mb-3 font-semibold text-error">
          What happens when you delete your account?
        </h3>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>Permanently delete all your assets and listings</li>
          <li>Remove your profile and all associated data</li>
          <li>Cancel all active investment campaigns</li>
          <li>
            Process refunds for active investors (may take 5-10 business days)
          </li>
          <li>Remove access to the platform immediately</li>
        </ul>
        <p className="mt-4 font-medium text-error text-sm">
          This action cannot be undone. Please be certain before proceeding.
        </p>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">
            To confirm deletion, please tell us why you're leaving (optional)
          </span>
        </label>
        <textarea
          rows={4}
          placeholder="Your feedback helps us improve..."
          className="resize-none textarea textarea-bordered"
        />
      </div>

      <button className="gap-2 btn btn-error">
        <Trash2 className="w-4 h-4" />
        Request Account Deletion
      </button>

      <p className="text-sm text-base-content/60">
        Need help with something?{" "}
        <a href="#" className="link link-primary">
          Contact support
        </a>{" "}
        instead.
      </p>
    </motion.div>
  );
}

export default AccountDeletionSection;

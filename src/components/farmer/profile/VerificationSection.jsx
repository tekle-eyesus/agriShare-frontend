import { motion } from "framer-motion";
import { CheckCircle, Upload } from "lucide-react";

import VerificationStatusCard from "./VerificationStatusCard";
import DocumentItem from "./DocumentItem";
import TimelineItem from "./TimelineItem";

function VerificationSection() {
  return (
    <motion.div
      key="verification"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      <h2 className="font-bold text-2xl">Verification Status</h2>

      <VerificationStatusCard
        status="Verified"
        title="Verified Farmer"
        message="Your Fayda ID has been verified and your account is in good standing."
        icon={CheckCircle}
        color="verified"
      />

      <div>
        <h3 className="mb-4 font-semibold">Fayda ID Verification</h3>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Fayda ID Number</span>
            </label>
            <input
              type="text"
              defaultValue="FYD-1234567890"
              disabled
              className="bg-base-200 input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">
                Verification Status
              </span>
            </label>
            <div className="gap-2 py-3 text-sm badge badge-success">
              <CheckCircle className="w-4 h-4" />
              Verified
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Document Uploads</h3>
        <div className="space-y-3">
          <DocumentItem
            title="Land Certificate"
            date="2026-01-10"
            status="verified"
            onView={() => console.log("View document")}
          />
          <DocumentItem
            title="Business License"
            date="2026-01-10"
            status="verified"
            onView={() => console.log("View document")}
          />
        </div>
        <button className="gap-2 mt-4 btn-outline btn btn-sm">
          <Upload className="w-4 h-4" />
          Upload New Document
        </button>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Verification History</h3>
        <TimelineItem
          title="Account Verified"
          date="January 15, 2026"
          status="completed"
          isLast={false}
        />
        <TimelineItem
          title="Documents Submitted"
          date="January 10, 2026"
          status="completed"
          isLast={true}
        />
      </div>
    </motion.div>
  );
}

export default VerificationSection;

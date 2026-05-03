import { motion } from "framer-motion";
import { Send } from "lucide-react";

function CommunicationSection() {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-base-100 shadow-md border border-base-200 card"
    >
      <div className="p-6 card-body">
        <h3 className="font-semibold text-lg card-title">Communication</h3>
        <button className="gap-2 w-full sm:w-auto btn btn-primary">
          <Send className="w-4 h-4" />
          Send Broadcast Message
        </button>
        <p className="mt-2 text-sm text-base-content/60">
          Send updates to all investors or filter by specific listing
        </p>
      </div>
    </motion.div>
  );
}

export default CommunicationSection;

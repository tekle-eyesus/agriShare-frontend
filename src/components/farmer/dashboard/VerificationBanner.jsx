import { motion } from "framer-motion";
import { Card } from "../Shared";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeInUp } from "../../../utils/motionVariants";

function VerificationBanner() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="mt-4"
    >
      <Card className="bg-warning/5 p-4 border-warning/30" hover={false}>
        <div className="flex items-start gap-3">
          <div className="place-items-center grid bg-warning/15 rounded-xl w-9 h-9 text-warning shrink-0">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">
              Verify your Fayda ID to start listing
            </p>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Listings can only be created once your farmer account is verified.
            </p>
          </div>
          <Link
            to="/farmer/verification"
            className="gap-1 btn btn-warning btn-sm"
          >
            Verify <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

export default VerificationBanner;

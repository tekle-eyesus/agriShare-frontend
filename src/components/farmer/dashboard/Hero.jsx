import { fadeInUp } from "../../../utils/motionVariants";
import {
  BadgeCheck,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "../Shared";

function Hero({ firstName, memberSince, user }) {
  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate">
      <Card className="relative bg-linear-to-br from-primary to-primary-glow p-6 sm:p-8 border-0 overflow-hidden text-primary-content">
        <div className="-top-10 -right-10 absolute bg-white/10 blur-2xl rounded-full w-48 h-48" />
        <div className="-right-20 bottom-0 absolute bg-accent/20 blur-3xl rounded-full w-72 h-72" />
        <div className="relative flex sm:flex-row flex-col justify-between sm:items-center gap-4">
          <div>
            <p className="text-primary-content/80 text-sm">Selam,</p>
            <h1 className="mt-1 font-display font-bold text-2xl sm:text-3xl">
              Welcome back, {firstName}!
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <VerificationPill status={user?.verificationStatus} />
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {user.isActive ? "Active Account" : "Inactive"}
              </span>
              <span className="text-primary-content/80 text-xs">
                Member since {memberSince}
              </span>
            </div>
          </div>
          <Link
            to={
              user.verificationStatus === "verified"
                ? "/farmer/listings"
                : "/farmer/verification"
            }
            className="self-start gap-2 btn btn-secondary btn-sm"
          >
            {user.verificationStatus === "verified" ? (
              <>
                <Plus className="w-4 h-4" /> Create new listing
              </>
            ) : (
              <>
                <BadgeCheck className="w-4 h-4" /> Complete verification
              </>
            )}
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

function VerificationPill({ status }) {
  const map = {
    verified: {
      label: "Verified",
      cls: "bg-success/15 text-success",
      Icon: BadgeCheck,
    },
    pending: {
      label: "Verification Pending",
      cls: "bg-warning/15 text-warning",
      Icon: Clock,
    },
    rejected: {
      label: "Verification Rejected",
      cls: "bg-error/15 text-error",
      Icon: ShieldAlert,
    },
    unverified: {
      label: "Not Verified",
      cls: "bg-base-300 text-base-content/80",
      Icon: ShieldAlert,
    },
  };
  const m = map[status] ?? map.unverified;
  const Icon = m.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${m.cls}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {m.label}
    </span>
  );
}

export default Hero;

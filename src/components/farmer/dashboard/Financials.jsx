import { motion } from "framer-motion";
import { Wallet, Coins, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { formatETB } from "../../../utils/format";
import { Card } from "../Shared";
import { fadeInUp, staggerContainer } from "../../../utils/motionVariants";

function Financials({ user, stats, walletNegative }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-6"
    >
      <motion.div variants={fadeInUp}>
        <Card className="p-5 h-full">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Wallet Balance
              </p>
              <p
                className={`text-2xl sm:text-3xl font-display font-bold mt-2 ${walletNegative ? "text-error" : ""}`}
              >
                {formatETB(user.walletBalance)}
              </p>
              {walletNegative && (
                <p className="mt-1 text-[11px] text-error">
                  Negative balance — settle outstanding dues.
                </p>
              )}
            </div>
            <div className="place-items-center grid bg-primary/10 rounded-xl w-10 h-10 text-primary">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <Link
            to="/farmer/wallet"
            className="mt-4 w-full btn btn-primary btn-sm"
          >
            Manage Wallet
          </Link>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="p-5 h-full">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                AgriCredits
              </p>
              <p className="mt-2 font-display font-bold text-2xl sm:text-3xl">
                {user.agriCreditsBalance}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Used for listing fees & services.
              </p>
            </div>
            <div className="place-items-center grid bg-accent/10 rounded-xl w-10 h-10 text-accent">
              <Coins className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="p-5 h-full">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Total Funding Goal
              </p>
              <p className="mt-2 font-display font-bold text-2xl sm:text-3xl">
                {formatETB(stats.financials.totalGoalBirr)}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Across all your listings.
              </p>
            </div>
            <div className="place-items-center grid bg-success/10 rounded-xl w-10 h-10 text-success">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default Financials;

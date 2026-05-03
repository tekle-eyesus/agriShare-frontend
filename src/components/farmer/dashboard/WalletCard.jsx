import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";

function WalletCard({
  title,
  amount,
  buttonText,
  buttonAction,
  icon: Icon,
  buttonVariant = "primary",
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      className="bg-base-100 shadow-md border border-base-200 card"
    >
      <div className="p-6 card-body">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-base-content/60">{title}</span>
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="mb-4 font-bold text-2xl">{amount}</div>
        <button
          onClick={buttonAction}
          className={`btn btn-${buttonVariant} btn-sm w-full`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}

export default WalletCard;

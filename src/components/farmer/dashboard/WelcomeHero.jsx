import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { fadeInUp } from "../../../utils/motionVariants";

function WelcomeHero({ farmerName, isVerified }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-base-100 shadow-md border border-base-200 card"
    >
      <div className="p-6 card-body">
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="mb-2 font-bold text-2xl sm:text-3xl">
              Welcome back, {farmerName}!
            </h1>
            {isVerified && (
              <div className="gap-1 badge badge-success">
                <CheckCircle className="w-3 h-3" />
                Fayda Verified
              </div>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="flex justify-center items-center bg-primary rounded-full w-12 text-white">
                <span className="font-semibold text-lg">
                  {farmerName.charAt(0)}
                </span>
              </div>
            </label>
            {/* <ul
              tabIndex={0}
              className="z-10 bg-base-100 shadow p-2 border border-base-200 rounded-box w-52 dropdown-menu dropdown-menu-end"
            >
              <li>
                <Link to="/profile" className="text-sm dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-sm dropdown-item">
                  Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="text-error text-sm dropdown-item">
                  Logout
                </button>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeHero;

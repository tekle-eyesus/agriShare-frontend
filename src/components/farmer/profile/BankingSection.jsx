import { motion } from "framer-motion";
import { Building, Smartphone, Save } from "lucide-react";

export function BankingSection() {
  return (
    <motion.div
      key="banking"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      className="space-y-6"
    >
      <h2 className="font-bold text-2xl">Bank & Payout Settings</h2>

      <div>
        <h3 className="flex items-center gap-2 mb-4 font-semibold">
          <Building className="w-4 h-4" />
          Bank Account Information
        </h3>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Bank Name</span>
            </label>
            <select className="select-bordered select">
              <option value="">Select Bank</option>
              <option value="cbe">Commercial Bank of Ethiopia</option>
              <option value="dashen">Dashen Bank</option>
              <option value="awash">Awash Bank</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">
                Account Holder Name
              </span>
            </label>
            <input
              type="text"
              defaultValue="Dawit Tesfaye"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Account Number</span>
            </label>
            <input
              type="text"
              defaultValue="1000123456789"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Branch Name</span>
            </label>
            <input
              type="text"
              defaultValue="Debre Markos Branch"
              className="input input-bordered"
            />
          </div>
        </div>
        <button className="mt-4 btn-outline btn btn-sm">Verify Account</button>
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-4 font-semibold">
          <Smartphone className="w-4 h-4" />
          Mobile Money
        </h3>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Telebirr Number</span>
            </label>
            <input
              type="tel"
              placeholder="+251-91-234-5678"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-medium label-text">Chapa Account</span>
            </label>
            <input
              type="text"
              placeholder="Optional"
              className="input input-bordered"
            />
          </div>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-medium label-text">Default Payout Method</span>
        </label>
        <select className="select-bordered select">
          <option value="bank">Bank Account</option>
          <option value="telebirr">Telebirr</option>
          <option value="chapa">Chapa</option>
        </select>
      </div>

      <button className="gap-2 btn btn-primary">
        <Save className="w-4 h-4" />
        Save Banking Details
      </button>

      <div>
        <h3 className="mb-4 font-semibold">Payout History</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">2026-04-01</td>
                <td className="px-4 py-3 font-semibold">45,230 ETB</td>
                <td className="px-4 py-3">Bank Account</td>
                <td className="px-4 py-3">
                  <div className="badge badge-success">Completed</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default BankingSection;

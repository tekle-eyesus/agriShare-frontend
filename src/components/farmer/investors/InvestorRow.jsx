import { motion } from "framer-motion";

function InvestorRow({ investor, onViewDetails }) {
  return (
    <motion.tr
      variants={tableRowVariants}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className="border-base-200 border-b transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-primary/10 rounded-full w-10 h-10 text-primary">
              <span className="font-semibold text-sm">
                {investor.name.charAt(0)}
              </span>
            </div>
          </div>
          <div>
            <div className="font-semibold">{investor.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1 text-base-content/70">
            <Mail className="w-3 h-3" />
            <span>{investor.email}</span>
          </div>
          <div className="flex items-center gap-1 text-base-content/70">
            <Phone className="w-3 h-3" />
            <span>{investor.phone}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-primary">
          {investor.totalInvested.toLocaleString()} ETB
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {investor.listings.map((listing, idx) => (
            <span key={idx} className="badge badge-ghost badge-sm">
              {listing}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-base-content/60">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{investor.firstInvestment}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onViewDetails(investor)}
          className="gap-2 btn btn-primary btn-sm"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      </td>
    </motion.tr>
  );
}

export default InvestorRow;

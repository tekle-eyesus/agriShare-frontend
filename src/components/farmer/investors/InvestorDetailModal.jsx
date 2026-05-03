import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Phone, Send } from "lucide-react";
import { overlayVariants, modalVariants } from "../../../utils/animations";
import { mockInvestmentHistory } from "../../../mock-data/farmer/investor";

const Dialog = {
  Title: ({ children, className }) => (
    <div className={className}>{children}</div>
  ),
};

function InvestorDetailModal({ investor, isOpen, onClose }) {
  const investmentHistory = mockInvestmentHistory[investor?.id] || [];

  if (!investor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-50 fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="top-1/2 left-1/2 z-50 fixed bg-base-100 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2"
          >
            <div className="top-0 sticky bg-base-100 p-6 border-base-200 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary/10 rounded-full w-12 h-12 text-primary">
                        <span className="font-semibold text-lg">
                          {investor.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Dialog.Title className="font-bold text-2xl">
                        {investor.name}
                      </Dialog.Title>
                      <div className="space-y-1 mt-1 text-sm text-base-content/60">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {investor.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {investor.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 p-6">
              {/* Investment Summary */}
              <div>
                <h4 className="flex items-center gap-2 mb-3 font-semibold">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Investment Summary
                </h4>
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div className="bg-base-200/50 card">
                    <div className="p-4 card-body">
                      <div className="text-sm text-base-content/60">
                        Total Invested
                      </div>
                      <div className="font-bold text-primary text-2xl">
                        {investor.totalInvested.toLocaleString()} ETB
                      </div>
                    </div>
                  </div>
                  <div className="bg-base-200/50 card">
                    <div className="p-4 card-body">
                      <div className="text-sm text-base-content/60">
                        Listings
                      </div>
                      <div className="font-bold text-2xl">
                        {investor.listings.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment History */}
              <div>
                <h4 className="flex items-center gap-2 mb-3 font-semibold">
                  <FolderOpen className="w-4 h-4 text-primary" />
                  Investment History
                </h4>
                <div className="space-y-3">
                  {investmentHistory.map((investment, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex justify-between items-center hover:shadow-sm p-4 border border-base-200 rounded-lg transition-shadow"
                    >
                      <div>
                        <div className="font-medium">{investment.listing}</div>
                        <div className="text-sm text-base-content/60">
                          {investment.shares} shares • {investment.date}
                        </div>
                      </div>
                      <div className="font-semibold text-primary">
                        {investment.amount.toLocaleString()} ETB
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-primary/5 shadow w-full stats">
                <div className="stat">
                  <div className="stat-title">First Investment</div>
                  <div className="text-sm stat-value">
                    {investor.firstInvestment}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Last Investment</div>
                  <div className="text-sm stat-value">
                    {investor.lastInvestment}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bottom-0 sticky flex justify-end gap-3 bg-base-200 p-6 border-base-300 border-t">
              <button onClick={onClose} className="btn btn-ghost">
                Close
              </button>
              <button className="gap-2 btn btn-primary">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default InvestorDetailModal;

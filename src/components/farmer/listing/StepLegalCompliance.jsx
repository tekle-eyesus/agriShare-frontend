import { motion } from "framer-motion";

function StepLegalCompliance() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="mb-4 font-semibold text-lg">Legal & Compliance</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 border border-base-200 rounded-lg">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 checkbox checkbox-primary"
          />
          <label htmlFor="terms" className="text-sm">
            <span className="font-medium">Terms & Conditions</span>
            <p className="mt-1 text-base-content/60">
              I confirm that all information provided is accurate and complete
              to the best of my knowledge.
            </p>
          </label>
        </div>

        <div className="flex items-start gap-3 p-4 border border-base-200 rounded-lg">
          <input
            type="checkbox"
            id="risk"
            className="mt-1 checkbox checkbox-primary"
          />
          <label htmlFor="risk" className="text-sm">
            <span className="font-medium">Risk Disclosure</span>
            <p className="mt-1 text-base-content/60">
              I understand and accept the risk disclosure and acknowledge that
              investments carry inherent risks.
            </p>
          </label>
        </div>

        <div className="flex items-start gap-3 p-4 border border-base-200 rounded-lg">
          <input
            type="checkbox"
            id="agreement"
            className="mt-1 checkbox checkbox-primary"
          />
          <label htmlFor="agreement" className="text-sm">
            <span className="font-medium">Farmer's Agreement</span>
            <p className="mt-1 text-base-content/60">
              I have read and agree to the{" "}
              <a href="#" className="link link-primary">
                Farmer's Agreement
              </a>
            </p>
          </label>
        </div>
      </div>
    </motion.div>
  );
}

export default StepLegalCompliance;

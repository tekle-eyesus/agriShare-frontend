import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import StepIndicator from "./StepIndicator";
import StepSelectAsset from "./StepSelectAsset";
import StepListingDetails from "./StepListingDetails";
import StepFinancialTerms from "./StepFinancialTerms";
import StepLegalCompliance from "./StepLegalCompliance";
import StepReviewSubmit from "./StepReviewSubmit";
import { modalVariants, overlayVariants } from "../../../utils/motionVariants";
import { mockAssets } from "../../../mock-data/farmer/listing";

function CreateListingModal({ isOpen, onClose }) {
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [payoutStructure, setPayoutStructure] = useState("fixed");

  const nextStep = () => setWizardStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setWizardStep((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

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
            className="top-1/2 left-1/2 z-50 fixed bg-base-100 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2"
          >
            {/* Modal Header */}
            <div className="top-0 z-10 sticky bg-base-100 p-6 border-base-200 border-b">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-2xl">
                  Create Investment Listing
                </h2>
                <button
                  onClick={onClose}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <StepIndicator currentStep={wizardStep} totalSteps={5} />
            </div>

            {/* Modal Body */}
            <div className="p-6 min-h-[400px]">
              <AnimatePresence mode="wait">
                {wizardStep === 1 && (
                  <StepSelectAsset
                    key="step1"
                    assets={mockAssets}
                    selectedAsset={selectedAsset}
                    onSelectAsset={setSelectedAsset}
                  />
                )}
                {wizardStep === 2 && <StepListingDetails key="step2" />}
                {wizardStep === 3 && (
                  <StepFinancialTerms
                    key="step3"
                    payoutStructure={payoutStructure}
                    setPayoutStructure={setPayoutStructure}
                  />
                )}
                {wizardStep === 4 && <StepLegalCompliance key="step4" />}
                {wizardStep === 5 && <StepReviewSubmit key="step5" />}
              </AnimatePresence>
            </div>

            {/* Modal Footer */}
            <div className="bottom-0 sticky flex justify-between gap-3 bg-base-200 p-6 border-base-300 border-t">
              <button
                onClick={prevStep}
                disabled={wizardStep === 1}
                className="gap-2 btn-outline btn"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="flex gap-3">
                <button className="btn btn-ghost">Save as Draft</button>
                {wizardStep < 5 ? (
                  <button onClick={nextStep} className="gap-2 btn btn-primary">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="btn btn-primary">
                    Submit for Verification
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CreateListingModal;

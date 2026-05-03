import { CheckCircle } from "lucide-react";

function StepIndicator({ currentStep, totalSteps }) {
  const steps = ["Asset", "Details", "Financial", "Legal", "Review"];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={stepNumber} className="flex flex-1 items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isCompleted
                    ? "bg-success text-white"
                    : isActive
                      ? "bg-primary text-white shadow-lg scale-105"
                      : "bg-base-200 text-base-content/50"
                }`}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                    currentStep > stepNumber ? "bg-success" : "bg-base-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-base-content/60">
        {steps.map((step, index) => (
          <span key={index} className="flex-1 text-center">
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export default StepIndicator;

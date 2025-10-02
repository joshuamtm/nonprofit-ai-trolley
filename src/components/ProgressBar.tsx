import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  const stepNames = [
    "Context",
    "AI Initiative",
    "Concerns",
    "Risk Tolerance",
    "Review & Generate",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-2">
        {stepNames.map((name, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isClickable = onStepClick && stepNumber < currentStep;

          return (
            <div
              key={index}
              className={`text-xs font-medium ${
                stepNumber <= currentStep ? "text-primary" : "text-gray-400"
              }`}
            >
              <div
                onClick={() => isClickable && onStepClick(stepNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  stepNumber <= currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                } ${isClickable ? "cursor-pointer hover:bg-primary-dark hover:scale-110 transition-all" : ""}`}
                title={isClickable ? `Go back to ${name}` : ""}
              >
                {stepNumber}
              </div>
              <span className="hidden sm:inline">{name}</span>
            </div>
          );
        })}
      </div>
      <div className="progress-step">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
};

export default ProgressBar;

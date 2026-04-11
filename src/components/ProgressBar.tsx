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
  const stepNames = [
    "Context",
    "AI Initiative",
    "Concerns",
    "Readiness",
    "Analysis",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Railway track progress */}
      <div className="relative">
        {/* Track rail lines */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-rail-light" />
        <div className="absolute top-4 left-0 right-0">
          <motion.div
            className="h-0.5 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Sleeper ties (subtle cross marks along the track) */}
        <div className="absolute top-2.5 left-0 right-0 flex justify-between px-[4%]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-3 bg-rail-light rounded-full"
            />
          ))}
        </div>

        {/* Station stops */}
        <div className="relative flex justify-between">
          {stepNames.map((name, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isClickable = onStepClick && stepNumber < currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / totalSteps}%` }}
              >
                {/* Station marker */}
                <motion.div
                  onClick={() => isClickable && onStepClick(stepNumber)}
                  className={`
                    relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                    text-xs font-semibold border-2 transition-all duration-300
                    ${isCurrent
                      ? 'bg-primary border-primary text-white shadow-md'
                      : isCompleted
                        ? 'bg-primary border-primary text-white'
                        : 'bg-background border-rail-light text-text-muted'
                    }
                    ${isClickable ? 'cursor-pointer hover:scale-110 hover:shadow-lg' : ''}
                  `}
                  title={isClickable ? `Go back to ${name}` : ""}
                  initial={false}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </motion.div>

                {/* Station label */}
                <span
                  className={`mt-2 text-xs font-medium text-center leading-tight ${
                    isCurrent ? 'text-primary' : isCompleted ? 'text-primary/70' : 'text-text-muted'
                  }`}
                >
                  <span className="hidden sm:inline">{name}</span>
                  <span className="sm:hidden">{stepNumber}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

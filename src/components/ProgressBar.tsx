import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  const stepNames = [
    'Context',
    'AI Initiative',
    'Concerns',
    'Risk Tolerance',
    'Review & Generate'
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-2">
        {stepNames.map((name, index) => (
          <div
            key={index}
            className={`text-xs font-medium ${
              index + 1 <= currentStep ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              index + 1 <= currentStep
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {index + 1}
            </div>
            <span className="hidden sm:inline">{name}</span>
          </div>
        ))}
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
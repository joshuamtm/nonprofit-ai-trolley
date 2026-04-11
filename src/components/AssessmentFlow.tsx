import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SessionData } from "../types";
import WelcomeSection from "./WelcomeSection";
import StepOne from "./QuestionFlow/StepOne";
import EnhancedStepTwo from "./QuestionFlow/EnhancedStepTwo";
import StepThree from "./QuestionFlow/StepThree";
import StepFour from "./QuestionFlow/StepFour";
import EnhancedReviewStep from "./QuestionFlow/EnhancedReviewStep";
import ProgressBar from "./ProgressBar";

const STORAGE_KEY = 'trolley-assessment-data';
const STEP_KEY = 'trolley-assessment-step';

const loadSavedData = (): Partial<SessionData> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
};

const loadSavedStep = (): number => {
  try {
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? parseInt(saved, 10) : 0;
  } catch { return 0; }
};

const AssessmentFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(loadSavedStep);
  const [sessionData, setSessionData] = useState<Partial<SessionData>>(loadSavedData);

  const totalSteps = 5;

  const updateSessionData = (data: Partial<SessionData>) => {
    setSessionData((prev) => {
      const updated = { ...prev, ...data };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  // Persist step changes
  React.useEffect(() => {
    try { localStorage.setItem(STEP_KEY, String(currentStep)); } catch {}
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step < currentStep) {
      setCurrentStep(step);
    }
  };

  const startAssessment = () => {
    setCurrentStep(1);
  };

  const startOver = () => {
    setSessionData({});
    setCurrentStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);
    } catch {}
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeSection onGetStarted={startAssessment} />;
      case 1:
        return (
          <StepOne
            data={sessionData}
            updateData={updateSessionData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <EnhancedStepTwo
            data={sessionData}
            updateData={updateSessionData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <StepThree
            data={sessionData}
            updateData={updateSessionData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <StepFour
            data={sessionData}
            updateData={updateSessionData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <EnhancedReviewStep data={sessionData as SessionData} onPrev={prevStep} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header — visible during assessment steps */}
        {currentStep > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="flex justify-between items-center max-w-3xl mx-auto">
              <div className="text-left">
                <h1 className="font-display text-title text-textDark">
                  The Nonprofit AI Trolley Problem
                </h1>
                <p className="text-sm text-text-muted mt-1">
                  Navigating the ethics of AI implementation
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={startOver}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-text-muted hover:text-secondary border border-rail-light rounded-xl hover:border-secondary/30 transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Over
                </button>
                <a
                  href="/methodology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Methodology
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress bar */}
        {currentStep > 0 && (
          <div className="mb-10">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              onStepClick={goToStep}
            />
          </div>
        )}

        {/* Step content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer attribution */}
        <div className="mt-16 text-center">
          <p className="text-xs text-text-muted/60">
            Powered by{' '}
            <a href="https://mtm.now" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Meet the Moment
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;

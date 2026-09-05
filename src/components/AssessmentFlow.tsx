import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SessionData } from "../types";
import WelcomeSection from "./WelcomeSection";
import StepOne from "./QuestionFlow/StepOne";
import EnhancedStepTwo from "./QuestionFlow/EnhancedStepTwo";
import StepThree from "./QuestionFlow/StepThree";
import StepFour from "./QuestionFlow/StepFour";
import EnhancedReviewStep from "./QuestionFlow/EnhancedReviewStep";
import SectionStrip from "./SectionStrip";
import CarbonStrip from "./CarbonStrip";

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
  const reduceMotion = useReducedMotion();

  const totalSteps = 5;

  const updateSessionData = (data: Partial<SessionData>) => {
    setSessionData((prev) => {
      const updated = { ...prev, ...data };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  React.useEffect(() => {
    try { localStorage.setItem(STEP_KEY, String(currentStep)); } catch {}
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [currentStep, reduceMotion]);

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };
  const goToStep = (step: number) => { if (step >= 1 && step < currentStep) setCurrentStep(step); };
  const startAssessment = () => setCurrentStep(1);

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
      case 0: return <WelcomeSection onGetStarted={startAssessment} />;
      case 1: return <StepOne data={sessionData} updateData={updateSessionData} onNext={nextStep} />;
      case 2: return <EnhancedStepTwo data={sessionData} updateData={updateSessionData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <StepThree data={sessionData} updateData={updateSessionData} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <StepFour data={sessionData} updateData={updateSessionData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <EnhancedReviewStep data={sessionData as SessionData} onPrev={prevStep} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Box nameplate */}
      <header className="max-w-panel mx-auto w-full px-4 pt-4">
        <div className="rule-bottom pb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <a href="https://mtm.now" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
            <img src="/mtm-logo-horizontal.png" alt="Meet the Moment" className="h-5 w-auto" />
          </a>
          <div className="flex items-center gap-x-4 font-display text-[12px] uppercase tracking-[0.1em] text-ink-soft">
            <span className="hidden sm:inline">The Nonprofit AI Trolley Problem</span>
            <a href="/methodology" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-signal">Method</a>
            {currentStep > 0 && (
              <button type="button" onClick={startOver} className="text-ink hover:text-signal">Start over</button>
            )}
          </div>
        </div>

        {currentStep > 0 && (
          <div className="mt-3">
            <SectionStrip currentStep={currentStep} onStepClick={goToStep} />
          </div>
        )}
      </header>

      <main className="max-w-panel mx-auto w-full px-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentStep > 0 && <CarbonStrip data={sessionData} />}

      <footer className="max-w-panel mx-auto w-full px-4 py-8">
        <div className="hairline pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px] text-ink-soft">
          <p>A free tool from <a href="https://mtm.now" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 text-ink hover:text-signal">Meet the Moment</a>, technology advisory for nonprofits.</p>
          <p className="font-mono text-[12px]">No sign-up · your answers stay in your browser · free</p>
        </div>
      </footer>
    </div>
  );
};

export default AssessmentFlow;

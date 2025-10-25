import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SessionData } from "../types";
import WelcomeSection from "./WelcomeSection";
import ProgressBar from "./ProgressBar";
import LoadingSpinner from "./LoadingSpinner";

// Lazy load assessment steps for better performance
const StepOne = lazy(() => import("./QuestionFlow/StepOne"));
const EnhancedStepTwo = lazy(() => import("./QuestionFlow/EnhancedStepTwo"));
const StepThree = lazy(() => import("./QuestionFlow/StepThree"));
const StepFour = lazy(() => import("./QuestionFlow/StepFour"));
const EnhancedReviewStep = lazy(() => import("./QuestionFlow/EnhancedReviewStep"));

const AssessmentFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionData, setSessionData] = useState<Partial<SessionData>>({});

  const totalSteps = 5;

  const updateSessionData = (data: Partial<SessionData>) => {
    setSessionData((prev) => ({ ...prev, ...data }));
  };

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {currentStep > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-3xl mx-auto">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                  The Nonprofit AI Trolley Problem
                </h1>
                <p className="text-base sm:text-lg text-gray-600">
                  Navigate the ethical complexities of AI implementation
                </p>
              </div>
              <a
                href="/methodology"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
              >
                📚 Methodology
              </a>
            </div>
          </motion.div>
        )}

        {currentStep > 0 && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={goToStep}
          />
        )}

        <div className="max-w-3xl mx-auto mt-8">
          <Suspense fallback={<LoadingSpinner />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;

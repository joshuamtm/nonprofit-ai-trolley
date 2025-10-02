import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SessionData } from "./types";
import WelcomeSection from "./components/WelcomeSection";
import StepOne from "./components/QuestionFlow/StepOne";
import EnhancedStepTwo from "./components/QuestionFlow/EnhancedStepTwo";
import StepThree from "./components/QuestionFlow/StepThree";
import StepFour from "./components/QuestionFlow/StepFour";
import EnhancedReviewStep from "./components/QuestionFlow/EnhancedReviewStep";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for welcome screen
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
          <EnhancedReviewStep
            data={sessionData as SessionData}
            onPrev={prevStep}
          />
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
            <h1 className="text-4xl font-bold text-primary mb-2">
              The Nonprofit AI Trolley Problem
            </h1>
            <p className="text-lg text-gray-600">
              Navigate the ethical complexities of AI implementation
            </p>
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
        </div>
      </div>
    </div>
  );
}

export default App;

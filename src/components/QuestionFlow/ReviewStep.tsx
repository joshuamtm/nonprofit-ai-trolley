import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SessionData } from '../../types';
import TrolleyScene from '../TrolleyAnimation/TrolleyScene';
import { generateAnalysis } from '../../utils/analysisGenerator';
import { generatePDF } from '../../utils/pdfGenerator';

interface ReviewStepProps {
  data: SessionData;
  onPrev: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data, onPrev }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    const analysis = generateAnalysis(data);

    setTimeout(() => {
      generatePDF(data, analysis);
      setIsGenerating(false);
    }, 1500);
  };

  const handlePathSelect = (path: 'pull' | 'dont-pull' | 'safeguards') => {
    setSelectedPath(path);
  };

  const getPathDescription = () => {
    switch(selectedPath) {
      case 'pull':
        return {
          title: 'Path 1: Implement AI',
          description: 'This path involves moving forward with your AI initiative, accepting the associated risks while pursuing the potential benefits.',
          color: 'text-green-600'
        };
      case 'dont-pull':
        return {
          title: 'Path 2: Maintain Status Quo',
          description: 'This path avoids AI implementation, maintaining current operations and avoiding AI-related risks.',
          color: 'text-blue-600'
        };
      case 'safeguards':
        return {
          title: 'Path 3: Implement with Safeguards',
          description: 'This path implements AI with comprehensive risk mitigation strategies and phased rollout.',
          color: 'text-yellow-600'
        };
      default:
        return null;
    }
  };

  const pathDescription = getPathDescription();

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="mb-6">Step 5: Review & Generate Your Analysis</h2>
        <p className="text-gray-600 mb-6">
          Click on a path below to explore your options, then generate your personalized ethical analysis report.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Your Responses Summary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium">Organization:</span> {data.organizationType}
            </div>
            <div>
              <span className="font-medium">AI Type:</span> {data.aiInitiativeType}
            </div>
            <div>
              <span className="font-medium">Urgency:</span> {data.problemUrgency}
            </div>
            <div>
              <span className="font-medium">Readiness:</span> {data.stakeholderReadiness}
            </div>
          </div>
        </div>

        <TrolleyScene onPathSelect={handlePathSelect} />

        {pathDescription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-white border-2 border-gray-200 rounded-lg"
          >
            <h3 className={`font-semibold text-lg ${pathDescription.color}`}>
              {pathDescription.title}
            </h3>
            <p className="text-gray-600 mt-2">{pathDescription.description}</p>
          </motion.div>
        )}

        <div className="flex justify-between items-center mt-8">
          <motion.button
            type="button"
            onClick={onPrev}
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>

          <motion.button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className={`btn-secondary ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={!isGenerating ? { scale: 1.05 } : {}}
            whileTap={!isGenerating ? { scale: 0.95 } : {}}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Report...
              </span>
            ) : (
              '📄 Generate PDF Report'
            )}
          </motion.button>
        </div>

        {selectedPath && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
            <p className="text-sm text-blue-700">
              <strong>Ready to generate!</strong> Click the "Generate PDF Report" button to receive your comprehensive ethical analysis with detailed recommendations for all three paths.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
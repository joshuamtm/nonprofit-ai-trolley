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
  const [analysis] = useState(() => generateAnalysis(data));

  const handleGeneratePDF = () => {
    setIsGenerating(true);

    setTimeout(() => {
      generatePDF(data, analysis);
      setIsGenerating(false);
    }, 1500);
  };

  const handlePathSelect = (path: 'pull' | 'dont-pull' | 'safeguards') => {
    setSelectedPath(path);
  };

  const getPathDetails = () => {
    switch(selectedPath) {
      case 'pull':
        return {
          title: 'Path 1: Pull the Lever (Implement AI)',
          description: 'Moving forward with AI implementation, accepting calculated risks for potential benefits.',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          benefits: analysis.pullLever.benefits.slice(0, 3),
          risks: analysis.pullLever.risks.slice(0, 3),
          recommendation: 'Best if your organization has urgent needs and capacity to manage risks.'
        };
      case 'dont-pull':
        return {
          title: "Path 2: Don't Pull the Lever (Status Quo)",
          description: 'Maintaining current operations without AI implementation.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          benefits: analysis.dontPull.benefits.slice(0, 3),
          risks: analysis.dontPull.risks.slice(0, 3),
          recommendation: 'Consider if AI risks outweigh benefits or resources are limited.'
        };
      case 'safeguards':
        return {
          title: 'Path 3: Pull with Safeguards (Responsible Implementation)',
          description: 'Implementing AI with comprehensive risk mitigation strategies.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          benefits: analysis.withSafeguards.benefits.slice(0, 3),
          risks: ['Slower implementation timeline', 'Higher initial costs', 'More complex governance'],
          recommendation: 'Ideal balance of innovation and risk management for most organizations.'
        };
      default:
        return null;
    }
  };

  const pathDetails = getPathDetails();

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

        {pathDetails && (
          <motion.div
            key={selectedPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-6 p-6 ${pathDetails.bgColor} border-2 ${pathDetails.borderColor} rounded-lg`}
          >
            <h3 className={`font-bold text-xl ${pathDetails.color} mb-3`}>
              {pathDetails.title}
            </h3>
            <p className="text-gray-700 mb-4">{pathDetails.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Key Benefits:</h4>
                <ul className="space-y-1">
                  {pathDetails.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600">• {benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">⚠️ Key Risks:</h4>
                <ul className="space-y-1">
                  {pathDetails.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-gray-600">• {risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white bg-opacity-50 rounded p-3">
              <p className="text-sm font-medium text-gray-700">
                💡 <strong>Recommendation:</strong> {pathDetails.recommendation}
              </p>
            </div>
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

        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400">
          <p className="text-sm text-green-700">
            <strong>📊 About Your PDF Report:</strong> The generated report will include a comprehensive analysis of <strong>ALL THREE PATHS</strong>,
            regardless of which one you explore above. You'll receive detailed benefits, risks, and recommendations for each option to help guide your decision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
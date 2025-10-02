import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Eye, AlertCircle, CheckCircle, XCircle, BookOpen } from "lucide-react";
import { SessionData } from "../../types";
import { EnhancedAnalysisGenerator } from "../../utils/enhancedAnalysisGenerator";
import { generatePDF } from "../../utils/pdfGenerator";
import ComparisonView from "../ComparisonView";
import TrolleyScene from "../TrolleyAnimation/TrolleyScene";
import Methodology from "../Methodology";

interface EnhancedReviewStepProps {
  data: SessionData;
  onPrev: () => void;
}

const EnhancedReviewStep: React.FC<EnhancedReviewStepProps> = ({
  data,
  onPrev,
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showScoreDetails, setShowScoreDetails] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const generator = new EnhancedAnalysisGenerator(data);
    const enhancedAnalysis = generator.generateEnhancedAnalysis();
    setAnalysis(enhancedAnalysis);
    setScores(generator.getPersonalizationScores());
  }, [data]);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (analysis) {
        generatePDF(data, {
          pullLever: analysis.pullLever,
          dontPull: analysis.dontPull,
          withSafeguards: analysis.withSafeguards,
        });
      }
      setIsGenerating(false);
    }, 1500);
  };

  const handlePathSelect = (path: "pull" | "dont-pull" | "safeguards") => {
    setSelectedPath(path);
  };

  const getPathIcon = (path: string) => {
    if (analysis?.recommendedPath?.includes(path)) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    return null;
  };

  const getScoreIcon = (value: number) => {
    if (value > 0.7) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (value > 0.4) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getPathDetails = () => {
    if (!analysis) return null;

    switch (selectedPath) {
      case "pull":
        return {
          title: analysis.pullLever.title,
          description:
            "Moving forward with full AI implementation, accepting calculated risks for maximum benefits.",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          analysis: analysis.pullLever,
        };
      case "dont-pull":
        return {
          title: analysis.dontPull.title,
          description:
            "Maintaining current operations without AI, preserving stability while accepting limitations.",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          analysis: analysis.dontPull,
        };
      case "safeguards":
        return {
          title: analysis.withSafeguards.title,
          description:
            "Phased AI implementation with comprehensive safeguards, balancing innovation with risk management.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          analysis: analysis.withSafeguards,
        };
      default:
        return null;
    }
  };

  const pathDetails = getPathDetails();

  if (showMethodology) {
    return (
      <div className="space-y-6">
        <Methodology />
        <div className="flex justify-center">
          <button
            onClick={() => setShowMethodology(false)}
            className="btn-outline"
          >
            ← Back to Analysis
          </button>
        </div>
      </div>
    );
  }

  if (showComparison && analysis) {
    return (
      <div className="space-y-6">
        <ComparisonView
          data={data}
          pullLever={analysis.pullLever}
          dontPull={analysis.dontPull}
          withSafeguards={analysis.withSafeguards}
          recommendedPath={analysis.recommendedPath}
          rationale={analysis.rationale}
        />
        <div className="flex justify-between">
          <button
            onClick={() => setShowComparison(false)}
            className="btn-outline"
          >
            ← Back to Analysis
          </button>
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {isGenerating ? "Generating..." : "Download Full Report"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="mb-6">Step 5: Your Personalized AI Decision Analysis</h2>

        {/* Personalization Score Display */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">
              How Your Inputs Shape Our Analysis
            </h3>
            <button
              onClick={() => setShowScoreDetails(!showScoreDetails)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showScoreDetails ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {showScoreDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-2"
            >
              {scores.map((score, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-white rounded"
                >
                  <div className="flex items-center gap-2">
                    {getScoreIcon(score.value)}
                    <span className="text-sm font-medium capitalize">
                      {score.category.replace("-", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {Math.round(score.value * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {score.influence}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Recommended Path Banner */}
        {analysis && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  Recommended Path: {analysis.recommendedPath}
                </h3>
                <p className="text-sm text-green-700">{analysis.rationale}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Trolley Visualization */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Explore Your Three Paths</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click on each path to see detailed analysis tailored to your
            organization's specific situation.
          </p>
          <TrolleyScene onPathSelect={handlePathSelect} />
        </div>

        {/* Path Details Display */}
        {pathDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg border-2 ${pathDetails.borderColor} ${pathDetails.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-bold ${pathDetails.color} flex items-center gap-2`}
              >
                {pathDetails.title}
                {getPathIcon(pathDetails.title)}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Impact Score:</span>
                <span
                  className={`text-lg font-bold ${
                    pathDetails.analysis.impactScore >= 70
                      ? "text-green-600"
                      : pathDetails.analysis.impactScore >= 40
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {pathDetails.analysis.impactScore}/100
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{pathDetails.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Trade-offs Summary */}
              {pathDetails.analysis.tradeOffSummary && (
                <>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">
                      What You Gain:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {pathDetails.analysis.tradeOffSummary.gains.map(
                        (gain: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{gain}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-700">
                      What You Risk/Lose:
                    </h4>
                    <ul className="text-sm space-y-1">
                      {pathDetails.analysis.tradeOffSummary.losses.map(
                        (loss: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{loss}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Action Plans */}
            {(pathDetails.analysis.actionPlan30Days ||
              pathDetails.analysis.actionPlan60Days) && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <h4 className="font-semibold mb-3">Quick Start Action Plan:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {pathDetails.analysis.actionPlan30Days && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-1">
                        30 Days:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {pathDetails.analysis.actionPlan30Days
                          .slice(0, 3)
                          .map((action: string, i: number) => (
                            <li key={i}>• {action}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {pathDetails.analysis.actionPlan60Days && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-1">
                        60 Days:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {pathDetails.analysis.actionPlan60Days
                          .slice(0, 3)
                          .map((action: string, i: number) => (
                            <li key={i}>• {action}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {pathDetails.analysis.actionPlan90Days && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-1">
                        90 Days:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {pathDetails.analysis.actionPlan90Days
                          .slice(0, 3)
                          .map((action: string, i: number) => (
                            <li key={i}>• {action}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Budget Estimates */}
            {pathDetails.analysis.budgetEstimates && (
              <div className="mt-4 p-3 bg-white bg-opacity-70 rounded">
                <h5 className="text-sm font-semibold mb-2">
                  Budget Estimates:
                </h5>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Initial:</span>
                    <p className="font-medium">
                      {pathDetails.analysis.budgetEstimates.initial}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Ongoing:</span>
                    <p className="font-medium">
                      {pathDetails.analysis.budgetEstimates.ongoing}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">3-Year Total:</span>
                    <p className="font-medium">
                      {pathDetails.analysis.budgetEstimates.total}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={onPrev}
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>

          <div className="flex gap-3">
            <motion.button
              onClick={() => setShowMethodology(true)}
              className="btn-outline flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-5 h-5" />
              View Methodology
            </motion.button>

            <motion.button
              onClick={() => setShowComparison(true)}
              className="btn-outline flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5" />
              Compare All Paths
            </motion.button>

            <motion.button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              {isGenerating ? "Generating..." : "Download Full Report"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedReviewStep;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Eye, CheckCircle, XCircle, BookOpen, ArrowRight } from "lucide-react";
import { SessionData } from "../../types";
import { EnhancedAnalysisGenerator } from "../../utils/enhancedAnalysisGenerator";
import { generateEnhancedPDF } from "../../utils/pdfReport";
import ComparisonView from "../ComparisonView";
import TrolleyScene from "../TrolleyAnimation/TrolleyScene";

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
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [, setAnalysisSource] = useState<'ai' | 'template'>('template');

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsAnalyzing(true);

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const aiAnalysis = await response.json();
          if (!aiAnalysis.fallback && aiAnalysis.recommendedPath) {
            setAnalysis(aiAnalysis);
            setAnalysisSource('ai');
            setIsAnalyzing(false);
            return;
          }
        }
      } catch (err) {
        console.log('AI analysis unavailable, using template fallback');
      }

      // Fallback to template-based analysis
      const generator = new EnhancedAnalysisGenerator(data);
      const templateAnalysis = generator.generateEnhancedAnalysis();
      setAnalysis(templateAnalysis);
      setAnalysisSource('template');
      setIsAnalyzing(false);
    };

    fetchAnalysis();
  }, [data]);

  const handleGeneratePDF = async () => {
    if (!analysis) return;
    setIsGenerating(true);
    try {
      await generateEnhancedPDF(data, {
        pullLever: analysis.pullLever,
        dontPull: analysis.dontPull,
        withSafeguards: analysis.withSafeguards,
        recommendedPath: analysis.recommendedPath,
        rationale: analysis.rationale,
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setIsGenerating(false);
  };

  const handlePathSelect = (path: "pull" | "dont-pull" | "safeguards") => {
    setSelectedPath(path);
  };

  const getPathDetails = () => {
    if (!analysis) return null;

    switch (selectedPath) {
      case "pull":
        return {
          title: analysis.pullLever.title,
          description: "Moving forward with full AI implementation, accepting calculated risks for maximum benefits.",
          color: "text-signal-green",
          bgColor: "bg-signal-green/5",
          borderColor: "border-signal-green/20",
          accentColor: "#16A34A",
          analysis: analysis.pullLever,
        };
      case "dont-pull":
        return {
          title: analysis.dontPull.title,
          description: "Maintaining current operations without AI, preserving stability while addressing limitations.",
          color: "text-signal-blue",
          bgColor: "bg-signal-blue/5",
          borderColor: "border-signal-blue/20",
          accentColor: "#2563EB",
          analysis: analysis.dontPull,
        };
      case "safeguards":
        return {
          title: analysis.withSafeguards.title,
          description: "Phased AI implementation with comprehensive safeguards, balancing innovation with risk management.",
          color: "text-signal-amber",
          bgColor: "bg-signal-amber/5",
          borderColor: "border-signal-amber/20",
          accentColor: "#D97706",
          analysis: analysis.withSafeguards,
        };
      default:
        return null;
    }
  };

  const pathDetails = getPathDetails();

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
          <button onClick={() => setShowComparison(false)} className="btn-outline">
            ← Back to Analysis
          </button>
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Download Report"}
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isAnalyzing) {
    return (
      <div className="card text-center py-16">
        <motion.div
          animate={{ x: [0, 200, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6"
        >
          <svg className="w-16 h-10" viewBox="0 0 80 50" fill="none">
            <rect x="10" y="15" width="40" height="22" rx="5" fill="#1B4D3E" />
            <rect x="16" y="8" width="28" height="14" rx="3" fill="#2A7A5E" />
            <circle cx="20" cy="40" r="5" fill="#57534E" />
            <circle cx="40" cy="40" r="5" fill="#57534E" />
          </svg>
        </motion.div>
        <h2 className="font-display text-title mb-2">Analyzing Your Responses</h2>
        <p className="text-text-muted text-sm">
          Generating your personalized three-path analysis...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="font-display text-title mb-2">Your AI Decision Analysis</h2>
        <p className="text-sm text-text-muted mb-6">
          Based on your responses, here's our personalized recommendation.
        </p>

        {/* Recommended Path Banner */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-5 bg-primary/5 border border-primary/15 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary text-base mb-1">
                  Recommended: {analysis.recommendedPath}
                </h3>
                <p className="text-sm text-textDark/70">{analysis.rationale}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trolley Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <p className="text-xs text-text-muted mb-3 uppercase tracking-wider font-semibold">
            Explore your three paths
          </p>
          <TrolleyScene
            onPathSelect={handlePathSelect}
            recommendedPath={analysis?.recommendedPath}
          />
        </motion.div>

        {/* Path Details Display */}
        {pathDetails && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl border-2 ${pathDetails.borderColor} ${pathDetails.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${pathDetails.color}`}>
                {pathDetails.title}
              </h3>
              {pathDetails.analysis.impactScore && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80">
                  <span className="text-xs font-medium text-text-muted">Impact</span>
                  <span className={`text-sm font-bold ${
                    pathDetails.analysis.impactScore >= 60 ? 'text-signal-green'
                    : pathDetails.analysis.impactScore >= 35 ? 'text-signal-amber'
                    : 'text-secondary'
                  }`}>
                    {pathDetails.analysis.impactScore}/100
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm text-textDark/70 mb-5">{pathDetails.description}</p>

            {/* Trade-offs */}
            {pathDetails.analysis.tradeOffSummary && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-signal-green flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> What You Gain
                  </h4>
                  <ul className="space-y-1.5">
                    {pathDetails.analysis.tradeOffSummary.gains.map((gain: string, i: number) => (
                      <li key={i} className="text-sm text-textDark/80 flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-signal-green mt-1 flex-shrink-0" />
                        {gain}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-secondary flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> What You Risk
                  </h4>
                  <ul className="space-y-1.5">
                    {pathDetails.analysis.tradeOffSummary.losses.map((loss: string, i: number) => (
                      <li key={i} className="text-sm text-textDark/80 flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-secondary mt-1 flex-shrink-0" />
                        {loss}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Action Plan */}
            {(pathDetails.analysis.actionPlan30Days || pathDetails.analysis.actionPlan60Days) && (
              <div className="border-t border-rail-light pt-4">
                <h4 className="font-semibold text-sm mb-3 text-textDark">Your Roadmap</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: '30 Days', items: pathDetails.analysis.actionPlan30Days },
                    { label: '60 Days', items: pathDetails.analysis.actionPlan60Days },
                    { label: '90 Days', items: pathDetails.analysis.actionPlan90Days },
                  ].filter(p => p.items?.length).map((period) => (
                    <div key={period.label} className="bg-white/60 rounded-lg p-3">
                      <h5 className="text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">
                        {period.label}
                      </h5>
                      <ul className="text-xs text-textDark/70 space-y-1">
                        {period.items?.slice(0, 3).map((action: string, i: number) => (
                          <li key={i}>• {action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Budget Estimates */}
            {pathDetails.analysis.budgetEstimates && (
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <h5 className="text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">
                  Budget Estimates
                </h5>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-text-muted">Initial</span>
                    <p className="font-semibold text-textDark text-xs">{pathDetails.analysis.budgetEstimates.initial}</p>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted">Ongoing</span>
                    <p className="font-semibold text-textDark text-xs">{pathDetails.analysis.budgetEstimates.ongoing}</p>
                  </div>
                  <div>
                    <span className="text-xs text-text-muted">3-Year Total</span>
                    <p className="font-semibold text-textDark text-xs">{pathDetails.analysis.budgetEstimates.total}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 pt-6 border-t border-rail-light">
          <motion.button
            onClick={onPrev}
            className="btn-outline text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Previous
          </motion.button>

          <div className="flex gap-3">
            <motion.button
              onClick={() => window.open('/methodology', '_blank')}
              className="btn-outline text-sm flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Methodology</span>
            </motion.button>

            <motion.button
              onClick={() => setShowComparison(true)}
              className="btn-outline text-sm flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Compare Paths</span>
            </motion.button>

            <motion.button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="btn-primary text-sm flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              {isGenerating ? "Generating..." : "Download Report"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedReviewStep;

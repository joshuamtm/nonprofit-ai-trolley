import React, { useState, useEffect } from "react";
import { SessionData } from "../../types";
import { EnhancedAnalysisGenerator } from "../../utils/enhancedAnalysisGenerator";
import { generateEnhancedPDF } from "../../utils/pdfReport";
import ComparisonView from "../ComparisonView";
import TrolleyScene from "../TrolleyAnimation/TrolleyScene";
import { topConcerns } from "../CarbonStrip";
import { roadName, unprefixPlanItem } from "../../utils/roadNames";

interface EnhancedReviewStepProps {
  data: SessionData;
  onPrev: () => void;
}

// Titles arrive as "Path 2: Don't Pull (Maintain Status Quo)" or "Pull with Safeguards";
// the reader sees the panel name only, the same one the diagram and the cards use.
const plainTitle = roadName;

const EnhancedReviewStep: React.FC<EnhancedReviewStepProps> = ({ data, onPrev }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisSource, setAnalysisSource] = useState<'ai' | 'template'>('template');

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
          // The function streams the advisor's text; read it all, then parse.
          const raw = (await response.text()).trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
          const aiAnalysis = JSON.parse(raw);
          if (!aiAnalysis.fallback && aiAnalysis.recommendedPath) {
            setAnalysis(aiAnalysis);
            setAnalysisSource('ai');
            setIsAnalyzing(false);
            return;
          }
        }
      } catch (err) {
        // fall through to the template
      }
      const generator = new EnhancedAnalysisGenerator(data);
      setAnalysis(generator.generateEnhancedAnalysis());
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

  const pathDetails = (() => {
    if (!analysis) return null;
    switch (selectedPath) {
      case "pull": return { title: analysis.pullLever.title, plain: "Adopt AI across the initiative now, accepting the risks for the fastest gain.", analysis: analysis.pullLever, occupied: false };
      case "dont-pull": return { title: analysis.dontPull.title, plain: "Hold the status quo. A choice with its own costs, listed below.", analysis: analysis.dontPull, occupied: true };
      case "safeguards": return { title: analysis.withSafeguards.title, plain: "Adopt in stages, with a person checking, a baseline, and a stop rule.", analysis: analysis.withSafeguards, occupied: false };
      default: return null;
    }
  })();

  if (showComparison && analysis) {
    return (
      <div className="mt-6">
        <ComparisonView
          data={data}
          pullLever={analysis.pullLever}
          dontPull={analysis.dontPull}
          withSafeguards={analysis.withSafeguards}
          recommendedPath={analysis.recommendedPath}
          rationale={analysis.rationale}
        />
        <div className="rule-top mt-8 pt-5">
          <button onClick={handleGeneratePDF} disabled={isGenerating} className="btn-panel w-full sm:w-auto sm:min-w-[24rem] py-4 text-[16px]">
            {isGenerating ? "Preparing the PDF" : "Download the board report, PDF"}
          </button>
          <div className="mt-5 font-display text-[13px] uppercase tracking-[0.08em]">
            <button onClick={() => setShowComparison(false)} className="underline underline-offset-4 decoration-1 text-ink hover:text-signal">Back to the diagram</button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="mt-6" aria-live="polite">
        <p className="rubric hidden sm:block">Section 5 of 5 · the analysis</p>
        <h2 className="font-display font-semibold text-heading uppercase mt-1">Setting the road</h2>
        <p className="font-serif text-[17px] mt-2 max-w-[58ch]">Reading your answers and writing the register entry. Usually twenty to forty seconds. If the advisor is unavailable, the template engine takes over.</p>
        <div className="mt-6 border-2 border-ink bg-paper-light h-3 overflow-hidden" aria-hidden="true">
          <div className="h-full w-1/3 bg-ink animate-pulse" />
        </div>
      </div>
    );
  }

  const gains: string[] = pathDetails?.analysis.tradeOffSummary?.gains || [];
  const losses: string[] = pathDetails?.analysis.tradeOffSummary?.losses || [];

  return (
    <div className="mt-6">
      <p className="rubric hidden sm:block">Section 5 of 5 · the analysis</p>
      <h2 className="font-display font-semibold text-heading uppercase mt-1">Your line has reached the facing point. Three roads leave it.</h2>
      <p className="font-serif text-[17px] mt-2 max-w-[60ch]">A facing point is a switch a trolley meets head-on, where it must take one road. Green lamps mean line clear. Red lamps mean a section is already occupied, which is what the "don't pull" road looks like from where you are standing.</p>

      {/* Register entry: the recommendation */}
      {analysis && (
        <div className="rule-top mt-6 pt-4" aria-live="polite">
          <p className="rubric">Register entry · {analysisSource === 'ai' ? 'written for your answers by the AI advisor' : 'standard reasoning; the live advisor was not reached this time'}</p>
          <dl className="mt-2 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-x-4 gap-y-1.5 text-[16px]">
            <dt className="rubric pt-1">Line taken</dt>
            <dd className="font-display font-semibold uppercase text-[18px]">{plainTitle(analysis.recommendedPath)}</dd>
            <dt className="rubric pt-1 sm:mt-0 mt-2">Reason</dt>
            <dd className="font-serif">{analysis.rationale}</dd>
          </dl>
        </div>
      )}

      {/* The diagram */}
      <div className="mt-6">
        <TrolleyScene
          onPathSelect={(p) => setSelectedPath(p)}
          recommendedPath={analysis?.recommendedPath}
          concerns={topConcerns(data)}
        />
      </div>

      {/* Road details */}
      {pathDetails && (
        <div className="rule-top mt-8 pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display font-semibold text-heading uppercase">{plainTitle(pathDetails.title)}</h3>
            {pathDetails.analysis.impactScore != null && (
              <span className="font-mono text-[13px] text-ink-soft">impact score {pathDetails.analysis.impactScore} of 100 · a quantity, not a verdict</span>
            )}
          </div>
          <p className="font-serif text-[16.5px] mt-1 max-w-[60ch]">{pathDetails.plain}</p>

          <div className="mt-5 grid md:grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <h4 className="font-serif font-semibold text-[17px] mb-2">What you gain</h4>
              <ul className="space-y-1.5 text-[15.5px]">
                {gains.map((g, i) => <li key={i} className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-sage flex-shrink-0" aria-hidden="true" />{g}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-[17px] mb-2">{pathDetails.occupied ? 'What the road is already carrying' : 'What you give up'}</h4>
              <ul className="space-y-1.5 text-[15.5px]">
                {losses.map((l, i) => <li key={i} className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-signal flex-shrink-0" aria-hidden="true" />{l}</li>)}
              </ul>
            </div>
          </div>

          {(pathDetails.analysis.risks?.length > 0) && (
            <div className="hairline mt-5 pt-4">
              <h4 className="font-serif font-semibold text-[17px] mb-2">What could go wrong on this road, given your answers</h4>
              <ul className="space-y-1.5 text-[15px]">
                {pathDetails.analysis.risks.slice(0, 5).map((r: string, i: number) => <li key={i} className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 border border-ink flex-shrink-0" aria-hidden="true" />{r}</li>)}
              </ul>
            </div>
          )}

          {(pathDetails.analysis.actionPlan30Days || pathDetails.analysis.actionPlan60Days) && (
            <div className="hairline mt-5 pt-4">
              <h4 className="font-serif font-semibold text-[17px] mb-2">The next ninety days on this road</h4>
              <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
                {[
                  { label: 'Days 1 to 30', items: pathDetails.analysis.actionPlan30Days },
                  { label: 'Days 31 to 60', items: pathDetails.analysis.actionPlan60Days },
                  { label: 'Days 61 to 90', items: pathDetails.analysis.actionPlan90Days },
                ].filter(p => p.items?.length).map((period) => (
                  <div key={period.label}>
                    <p className="font-display font-semibold uppercase text-[13px] tracking-[0.06em] border-b border-ink pb-1 mb-2">{period.label}</p>
                    <ul className="text-[14.5px] space-y-1">
                      {period.items?.slice(0, 4).map((a: string, i: number) => <li key={i} className="flex gap-2"><span className="font-mono text-[12px] text-ink-soft pt-0.5">{String(i + 1).padStart(2, '0')}</span><span>{unprefixPlanItem(a)}</span></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pathDetails.analysis.budgetEstimates && (
            <div className="hairline mt-5 pt-4">
              <h4 className="font-serif font-semibold text-[17px] mb-2">Budget, as a planning band</h4>
              <table className="ledger max-w-xl">
                <tbody>
                  <tr><td className="w-40 text-ink-soft">Initial</td><td className="font-mono">{pathDetails.analysis.budgetEstimates.initial}</td></tr>
                  <tr><td className="text-ink-soft">Ongoing</td><td className="font-mono">{pathDetails.analysis.budgetEstimates.ongoing}</td></tr>
                  <tr><td className="text-ink-soft">Three years</td><td className="font-mono">{pathDetails.analysis.budgetEstimates.total}</td></tr>
                </tbody>
              </table>
              <p className="mt-2 text-[13px] text-ink-soft max-w-[60ch]">No independent nonprofit cost benchmark exists as of September 2026. Most of the spend is staff time, data clean-up, training, and review, not licences.</p>
            </div>
          )}
        </div>
      )}

      {!pathDetails && (
        <p className="mt-4 text-[15px] text-ink-soft">Choose a road above to read its full analysis. The recommended one is marked.</p>
      )}

      {/* Actions: the primary on its own row, the rest as quiet links */}
      <div className="rule-top mt-8 pt-5">
        <button onClick={handleGeneratePDF} disabled={isGenerating} className="btn-panel w-full sm:w-auto sm:min-w-[24rem] py-4 text-[16px]">
          {isGenerating ? "Preparing the PDF" : "Download the board report, PDF"}
        </button>
        <p className="mt-2 font-mono text-[12px] text-ink-soft">Generated in your browser. Nothing is uploaded.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-display text-[13px] uppercase tracking-[0.08em]">
          <button onClick={() => setShowComparison(true)} className="underline underline-offset-4 decoration-1 text-ink hover:text-signal">Compare the three roads</button>
          <a href="/methodology" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-1 text-ink hover:text-signal">Method and sources</a>
          <button onClick={onPrev} className="underline underline-offset-4 decoration-1 text-ink-soft hover:text-signal">Back to section 4</button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedReviewStep;

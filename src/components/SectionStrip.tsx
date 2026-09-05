import React from "react";

// The five track sections of the line, drawn as a panel strip. A section lights when the
// visitor has passed through it; the current one carries the lamp.
export const SECTIONS = [
  { n: 1, label: "Your organisation", short: "Org" },
  { n: 2, label: "The AI initiative", short: "Initiative" },
  { n: 3, label: "Your concerns", short: "Concerns" },
  { n: 4, label: "Readiness", short: "Readiness" },
  { n: 5, label: "The analysis", short: "Analysis" },
];

interface SectionStripProps {
  currentStep: number; // 0 = welcome (nothing lit)
  onStepClick?: (step: number) => void;
  compact?: boolean;
}

const SectionStrip: React.FC<SectionStripProps> = ({ currentStep, onStepClick, compact }) => {
  const current = SECTIONS.find(s => s.n === currentStep);
  return (
    <div className="w-full" role="list" aria-label="Sections of the assessment">
      {current && !compact && (
        <p className="sm:hidden font-display text-[11px] uppercase tracking-[0.08em] text-ink-soft mb-1.5">
          Section {current.n} of 5 · <span className="text-ink font-semibold">{current.label}</span>
        </p>
      )}
      <div className="grid grid-cols-5 gap-1">
        {SECTIONS.map((s) => {
          const done = s.n < currentStep;
          const current = s.n === currentStep;
          const clickable = onStepClick && done;
          return (
            <div key={s.n} role="listitem" className="min-w-0">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(s.n)}
                aria-current={current ? "step" : undefined}
                title={clickable ? `Go back to section ${s.n}` : undefined}
                className={`block w-full h-3 border border-ink transition-colors ${
                  current ? "bg-signal" : done ? "bg-ink" : "bg-paper-deep"
                } ${clickable ? "cursor-pointer hover:bg-ink-soft" : "cursor-default"}`}
              >
                <span className="sr-only">
                  Section {s.n}, {s.label}: {current ? "current" : done ? "done" : "not yet"}
                </span>
              </button>
              {!compact && (
                <div className="mt-1.5 font-display text-[10px] sm:text-[11px] leading-tight uppercase tracking-[0.04em] sm:tracking-[0.06em] text-ink-soft">
                  <span className="text-ink font-semibold">{s.n}</span>
                  <span className="sm:hidden"> {s.short}</span>
                  <span className="hidden sm:inline"> {s.label}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionStrip;

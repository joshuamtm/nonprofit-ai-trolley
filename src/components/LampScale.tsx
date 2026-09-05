import React from "react";
import { UseFormRegister } from "react-hook-form";

// The 1-5 rating scale as a row of five track-circuit lamps. Unlit until tapped; the chosen
// lamp lights signal red with its numeral. One focusable radio group, 56px targets on phones.
interface LampScaleProps {
  name: string;
  value: number | string | undefined;
  register: UseFormRegister<any>;
  low: string;
  high: string;
  ariaLabel?: string;
}

const LampScale: React.FC<LampScaleProps> = ({ name, value, register, low, high, ariaLabel }) => {
  const current = parseInt(String(value), 10);
  return (
    <div role="radiogroup" aria-label={ariaLabel || name} className="mt-2">
      <div className="grid grid-cols-5 gap-2 max-w-md">
        {[1, 2, 3, 4, 5].map((n) => {
          const lit = current === n;
          return (
            <label key={n} className="cursor-pointer">
              <input type="radio" value={n} {...register(name)} className="sr-only peer" aria-label={`${n} of 5`} />
              <span
                className={`flex items-center justify-center h-14 sm:h-12 border-2 border-ink font-mono text-[18px] font-medium transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                  lit ? "bg-signal text-paper" : "bg-paper-deep text-ink hover:bg-paper-light"
                }`}
              >
                {n}
              </span>
            </label>
          );
        })}
      </div>
      <div className="flex justify-between max-w-md mt-1.5 font-display text-[11px] uppercase tracking-[0.06em] text-ink-soft">
        <span>1 {low}</span>
        <span>5 {high}</span>
      </div>
    </div>
  );
};

export default LampScale;

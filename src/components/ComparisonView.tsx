import React from 'react';
import { SessionData, PathAnalysis } from '../types';
import { roadName } from '../utils/roadNames';

interface ComparisonViewProps {
  data: SessionData;
  pullLever: PathAnalysis;
  dontPull: PathAnalysis;
  withSafeguards: PathAnalysis;
  recommendedPath: string;
  rationale: string;
}

// The three roads side by side, as a ruled register table.
const ComparisonView: React.FC<ComparisonViewProps> = ({ data, pullLever, dontPull, withSafeguards, recommendedPath, rationale }) => {
  const rec = (recommendedPath || '').toLowerCase();
  const care = rec.includes('care') || rec.includes('safeguard') || rec.includes('phased');
  const dont = rec.includes("don't") || rec.includes('status quo') || rec.includes('maintain');
  const isRec = { pull: !care && !dont && (rec.includes('full') || rec.includes('pull') || rec.includes('implement')), dont, care };

  const rows: { label: string; pull: string; dont: string; care: string }[] = [
    { label: 'Impact score (a quantity, not a verdict)', pull: `${pullLever.impactScore ?? '–'} / 100`, dont: `${dontPull.impactScore ?? '–'} / 100`, care: `${withSafeguards.impactScore ?? '–'} / 100` },
    { label: 'Time to first result', pull: 'Fast, one to three months', dont: 'None; the wait itself', care: 'Moderate, three to six months' },
    { label: 'Risk on the road', pull: 'High', dont: 'The risks already on the line', care: 'Moderate, with a person checking' },
    { label: 'Cost, planning band', pull: pullLever.budgetEstimates?.total || 'High', dont: dontPull.budgetEstimates?.total || 'No AI spend, but not no cost', care: withSafeguards.budgetEstimates?.total || 'Moderate' },
    { label: 'Stakeholders', pull: data.stakeholderReadiness === 'eager' ? 'Ready' : 'Needs winning over', dont: 'Comfortable, for now', care: 'Brought along in stages' },
    { label: 'Ethics', pull: 'Needs vigilance from day one', dont: 'Unchanged, including the informal use', care: 'Safeguards built in' },
    { label: 'What you learn', pull: 'Fast, sometimes the hard way', dont: 'Little', care: 'Steadily, at low stakes' },
  ];

  const cols = [
    { key: 'pull', title: 'Pull the lever', sub: 'adopt now', rec: isRec.pull, a: pullLever },
    { key: 'dont', title: "Don't pull", sub: 'hold the status quo', rec: isRec.dont, a: dontPull },
    { key: 'care', title: 'Pull with care', sub: 'adopt in stages', rec: isRec.care, a: withSafeguards },
  ] as const;

  return (
    <div>
      <p className="rubric">Section 5 of 5 · the roads compared</p>
      <h2 className="font-display font-semibold text-heading uppercase mt-1">Three roads, side by side</h2>
      <p className="font-serif text-[16.5px] mt-2 max-w-[60ch]"><span className="font-semibold">Line taken: {roadName(recommendedPath)}.</span> {rationale}</p>

      <div className="mt-5 overflow-x-auto">
        <table className="ledger min-w-[640px]">
          <thead>
            <tr>
              <th className="w-[28%]">Measure</th>
              {cols.map(c => (
                <th key={c.key} className="w-[24%]">
                  {c.title}{c.rec && <span className="block font-display text-[10px] tracking-[0.1em] text-signal">Recommended</span>}
                  <span className="block font-sans font-normal normal-case tracking-normal text-[12px] text-ink-soft">{c.sub}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.label}>
                <td className="text-ink-soft">{r.label}</td>
                <td className={isRec.pull ? 'font-medium' : ''}>{r.pull}</td>
                <td className={isRec.dont ? 'font-medium' : ''}>{r.dont}</td>
                <td className={isRec.care ? 'font-medium' : ''}>{r.care}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rule-top mt-8 pt-5 grid md:grid-cols-3 gap-x-8 gap-y-6">
        {cols.map(c => (
          <div key={c.key}>
            <p className="font-display font-semibold uppercase text-[14px] tracking-[0.06em] border-b border-ink pb-1">{c.title}{c.rec ? ' · recommended' : ''}</p>
            <p className="rubric mt-3 mb-1">Gain</p>
            <ul className="text-[14.5px] space-y-1">
              {c.a.tradeOffSummary?.gains.slice(0, 3).map((g, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-2 w-2 bg-sage flex-shrink-0" aria-hidden="true" />{g}</li>)}
            </ul>
            <p className="rubric mt-3 mb-1">{c.key === 'dont' ? 'Already on the line' : 'Risk'}</p>
            <ul className="text-[14.5px] space-y-1">
              {c.a.tradeOffSummary?.losses.slice(0, 3).map((l, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-2 w-2 bg-signal flex-shrink-0" aria-hidden="true" />{l}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonView;

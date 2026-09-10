import React from 'react';
import SectionStrip from './SectionStrip';

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onGetStarted }) => {
  return (
    <div>
      {/* Hero: the job, then the one action, in the first viewport. */}
      <section className="mt-6 md:mt-10">
        <p className="rubric">Working diagram · not to scale · 5 sections · about 5 minutes</p>
        <h1 className="font-display font-bold text-display uppercase mt-2 max-w-[24ch]">
          <span className="sm:hidden">Act on AI, hold, or act with safeguards. Take the answer to your board.</span>
          <span className="hidden sm:inline">Work out whether to act on AI, hold, or act with safeguards, and take the answer to your board.</span>
        </h1>
        <p className="font-serif text-[18px] sm:text-[19px] leading-relaxed mt-4 max-w-[58ch]">
          <span className="sm:hidden">Five short sections. At the end, three paths with real trade-offs, a recommendation, and a report your board can read.</span>
          <span className="hidden sm:inline">Five short sections about your organisation, the AI initiative you are weighing, what worries you, and how ready you are. At the end, three paths with real trade-offs, a recommendation, and a report your board can read.</span>
          <span className="italic"> Holding still is one of the three paths, and it has costs too.</span>
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={onGetStarted} className="btn-panel px-7 py-3.5 text-[16px]">
            Begin, section 1
          </button>
          <span className="font-mono text-[12.5px] text-ink-soft">Built by Meet the Moment for nonprofit teams. No sign-up, your answers stay in your browser, free.</span>
        </div>
      </section>

      {/* The line ahead */}
      <section className="rule-top mt-8 pt-4">
        <p className="rubric mb-3">The line ahead · five sections</p>
        <SectionStrip currentStep={0} />
      </section>

      {/* Why inaction has risks: the evidence, briefly */}
      <section className="rule-top mt-8 pt-5 grid md:grid-cols-[1fr_1fr] gap-x-10 gap-y-6">
        <div>
          <h2 className="font-display font-semibold text-heading uppercase">Why "the trolley problem"</h2>
          <div className="font-serif text-[17px] leading-relaxed mt-3 prose-panel">
            <p>A runaway trolley is heading for five people. You can pull a lever and send it down another track, where it will hit one. Do you pull?</p>
            <p>AI adoption has the same shape. Implementing it might help you serve many more people, and it might introduce bias, privacy exposure, or wrong answers reaching someone who trusted you. Not pulling the lever is also a choice, and the trolley keeps moving.</p>
          </div>
        </div>
        <div>
          <h2 className="font-display font-semibold text-heading uppercase">What standing still costs</h2>
          <ul className="mt-3 space-y-2.5 text-[15.5px] leading-relaxed">
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-signal flex-shrink-0" aria-hidden="true" /><span>Staff are probably already using AI. Among people who use AI at work, about three in four use tools their employer has not approved.<sup className="font-mono text-[11px] text-signal ml-0.5">1</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-signal flex-shrink-0" aria-hidden="true" /><span>Demand is rising faster than capacity: in 2025 about half of nonprofits saw demand grow, and roughly a third kept pace.<sup className="font-mono text-[11px] text-signal ml-0.5">2</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-signal flex-shrink-0" aria-hidden="true" /><span>Most nonprofits use AI, few have decided how: 92 percent report some use, 47 percent have no policy, 7 percent see major gains.<sup className="font-mono text-[11px] text-signal ml-0.5">3</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-sage flex-shrink-0" aria-hidden="true" /><span>Funders are not yet pushing: only 17 percent of leaders had been asked about AI by a funder.<sup className="font-mono text-[11px] text-signal ml-0.5">4</sup> That pressure arrives later, and faster.</span></li>
          </ul>
          <p className="mt-3 font-mono text-[12px] text-ink-soft">Sources on the <a href="/methodology" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-ink hover:text-signal">method page</a>.</p>
        </div>
      </section>

      {/* The briefing film */}
      <section className="rule-top mt-8 pt-5">
        <p className="rubric">Briefing film · 2 minutes · not required</p>
        <h2 className="font-display font-semibold text-heading uppercase mt-1">The trolley problem, explained with cats</h2>
        <p className="font-serif text-[16px] mt-2 max-w-[60ch]">Two minutes on the thought experiment and the AI alignment question underneath it. Watch it, or go straight to section 1.</p>
        <div className="mt-4 border-2 border-ink bg-paper-deep aspect-video max-w-2xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/x9SyL_B_xbY"
            title="Cat Trolley Problem, by Answer in Progress"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="mt-2 font-mono text-[12px] text-ink-soft">
          Video by <a href="https://www.youtube.com/@answerinprogress" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-ink hover:text-signal">Answer in Progress</a>. <a href="https://www.youtube.com/watch?v=181Nj060xMQ&t" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-ink hover:text-signal">Full video</a>.
        </p>
      </section>

      {/* What you leave with, and the repeat action */}
      <section className="rule-top mt-8 pt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="font-display font-semibold text-heading uppercase">What you leave with</h2>
          <ul className="mt-2 font-serif text-[16.5px] leading-relaxed space-y-1">
            <li>A recommendation for your situation, with the reasoning written out.</li>
            <li>Three paths, each with what you gain and what you risk.</li>
            <li>A 30, 60, 90 day plan for the recommended path.</li>
            <li>A PDF for your board, generated in your browser, never uploaded.</li>
          </ul>
        </div>
        <button type="button" onClick={onGetStarted} className="btn-panel px-7 py-3.5 text-[16px] self-start md:self-end">
          Begin, section 1
        </button>
      </section>
    </div>
  );
};

export default WelcomeSection;

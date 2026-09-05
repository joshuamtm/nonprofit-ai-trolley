import React from "react";

const SOURCES = [
  { n: 1, name: "WalkMe / SAP survey of 1,000 US employees who use AI at work", detail: "78% use tools their employer has not approved; 51% received conflicting guidance. July 2025. Vendor-sponsored and conditional on already using AI; treat as directional.", url: "https://news.sap.com/2025/08/new-walkme-survey-shadow-ai-rampant-training-gaps-undermine-roi/" },
  { n: 2, name: "Salesforce Nonprofit Trends Report, 7th edition", detail: "1,229 nonprofits; 47% saw demand rise while about a third kept pace; 64% report recruiting, retention, or wellbeing strain. May 2025. Vendor-sponsored.", url: "https://www.salesforce.com/nonprofit/resources/ngo-trends-report-7th-edition/" },
  { n: 3, name: "Virtuous and Fundraising.AI, 2026 Nonprofit AI Adoption Report", detail: "346 nonprofits, surveyed December 2025: 92% use AI, 81% individually rather than in shared workflows, 47% have no policy, 7% report major gains. Vendor-produced, fundraising-weighted.", url: "https://virtuous.org/resource/the-2026-nonprofit-ai-adoption-report-download/" },
  { n: 4, name: "Center for Effective Philanthropy, AI With Purpose", detail: "451 nonprofit leaders, 51% response rate, spring 2025: about two-thirds use AI; 62% say few or no staff understand it; 83% had not been engaged by any funder about AI; 90% of foundations fund no grantee AI work. September 2025.", url: "https://cep.org/report-backpacks/ai-with-purpose-how-foundations-and-nonprofits-are-thinking-about-and-using-artificial-intelligence/" },
  { n: 5, name: "Google.org, Google for Nonprofits survey", detail: "More than 9,000 organisations: 68% had some staff using generative AI, 22% had use across at least half the organisation; 60% cite lack of understanding as the main barrier. April 2025.", url: "https://services.google.com/fh/files/misc/google_for_nonprofits_survey_results_report_2025.pdf" },
  { n: 6, name: "TechSoup and Tapp Network, State of AI in Nonprofits 2025", detail: "1,321 respondents: 76% have no AI strategy, 80% no acceptable-use policy, 7% report successful operational adoption. Fielded 2024, published January 2025.", url: "https://page.techsoup.org/ai-benchmark-report-2025" },
  { n: 7, name: "Center for Effective Philanthropy, State of Nonprofits 2026", detail: "887 leaders: CEO burnout at the highest level in three years; about 40% ran a deficit in 2025. May 2026.", url: "https://cep.org/wp-content/uploads/2026/05/CEP_State_of_Nonprofits_2026_FNL.pdf" },
  { n: 8, name: "Section, AI Proficiency Report, via eMarketer", detail: "5,000 knowledge workers: 68% of AI users save four hours a week or less. March 2026. The largest independent sample on time saved.", url: "https://www.emarketer.com/content/most-employees-using-ai-saving-less-than-half-workday-per-week" },
  { n: 9, name: "NIST AI Risk Management Framework 1.0 and Generative AI Profile (AI 600-1)", detail: "The core framework (January 2023) and its generative AI profile (July 2024). Voluntary; still current.", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
  { n: 10, name: "ISO/IEC 42001:2023", detail: "The certifiable AI management system standard. Current first edition.", url: "https://www.iso.org/standard/42001" },
  { n: 11, name: "Fundraising.AI Framework for Responsible and Beneficial AI", detail: "The most cited nonprofit-specific framework; updated late 2025 with governance-first and agentic-system safeguards.", url: "https://fundraising.ai/framework/" },
  { n: 12, name: "NTEN, Artificial Intelligence Framework for an Equitable World", detail: "An equity-centred set of questions for nonprofits, dated April 2024, published January 2025.", url: "https://www.nten.org/posts/publication/artificial-intelligence-framework-for-an-equitable-world" },
  { n: 13, name: "European Commission, EU AI Act implementation timeline", detail: "Transparency duties in force from 2 August 2026; stand-alone high-risk duties deferred to 2 December 2027 by the 2026 Digital Omnibus.", url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" },
];

const MethodologyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="max-w-panel mx-auto px-4 pt-4">
        <div className="rule-bottom pb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <a href="https://mtm.now" target="_blank" rel="noopener noreferrer"><img src="/mtm-logo-horizontal.png" alt="Meet the Moment" className="h-5 w-auto" /></a>
          <div className="flex items-center gap-x-4 font-display text-[12px] uppercase tracking-[0.1em] text-ink-soft">
            <span className="hidden sm:inline">The Nonprofit AI Trolley Problem</span>
            <a href="/" className="text-ink hover:text-signal">Back to the diagram</a>
          </div>
        </div>
      </header>

      <main className="max-w-panel mx-auto px-4 pb-16">
        <section className="mt-8">
          <p className="rubric">Method · notes to the diagram · revised 5 September 2026</p>
          <h1 className="font-display font-bold text-display uppercase mt-2 max-w-[22ch]">How this assessment works, and what it rests on</h1>
          <div className="font-serif text-[17.5px] leading-relaxed mt-4 max-w-[62ch] prose-panel">
            <p>The trolley problem is the classic thought experiment: a runaway trolley, five people on the line, a lever that sends it toward one. This tool borrows the shape because AI decisions rarely have a clean answer. They have trade-offs, competing values, and real consequences, and one of the options is always to leave the lever alone.</p>
            <p>Every assessment produces all three paths, whatever the recommendation. Holding the status quo is treated as a decision with its own costs, not as the safe default, because the evidence says it is not one.</p>
          </div>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">The five sections</h2>
          <ol className="mt-3 space-y-3 max-w-[62ch]">
            {[
              ["Your organisation", "Type, budget size, and mission, so the analysis and the planning-band budget are about you."],
              ["The AI initiative", "What you are weighing, what success would look like, and how far along you are. Or that you are still exploring."],
              ["Your concerns", "Seven worries rated 1 to 5. The highest become the labels on the \"don't pull\" road, because they are what the status quo is already carrying."],
              ["Readiness", "Capacity, urgency, stakeholder mood, and four readiness scales: technical, change, ethics practice, data governance."],
              ["The analysis", "Three roads with benefits, risks, a 90-day plan, and a budget band each; a recommendation with its reasoning; a PDF for the board."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.2rem_1fr]">
                <span className="font-mono text-[13px] text-signal pt-0.5">{i + 1}</span>
                <span className="text-[15.5px]"><strong className="font-semibold">{t}.</strong> {d}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">The three roads</h2>
          <dl className="mt-3 space-y-3 max-w-[62ch] text-[15.5px]">
            <div><dt className="font-display font-semibold uppercase tracking-[0.06em] text-[14px]">Pull the lever · adopt now</dt><dd className="text-ink-soft">Full implementation, accepting the risks for the fastest gain. Fits high urgency, strong readiness, and stakeholders who are already on board.</dd></div>
            <div><dt className="font-display font-semibold uppercase tracking-[0.06em] text-[14px]">Don't pull · hold the status quo</dt><dd className="text-ink-soft">Continue without a formal AI system. A legitimate choice, and never a free one: staff are probably already using AI informally, demand keeps rising, and the organisation learns nothing while it waits. This road always comes with a recommendation to adopt an acceptable-use policy and take an inventory of existing use.</dd></div>
            <div><dt className="font-display font-semibold uppercase tracking-[0.06em] text-[14px]">Pull with care · adopt in stages</dt><dd className="text-ink-soft">A bounded, reversible pilot with a person checking, a baseline measured before launch, and a stop rule. The most commonly recommended road.</dd></div>
          </dl>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">What the evidence says, September 2026</h2>
          <p className="font-serif text-[16.5px] mt-2 max-w-[62ch]">The tool's claims were refreshed on 5 September 2026 with a three-model research pass (Claude, Gemini, and Perplexity, cross-checked) and the primary sources read by hand. The short version:</p>
          <ul className="mt-3 space-y-2.5 text-[15.5px] max-w-[62ch]">
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-ink flex-shrink-0" aria-hidden="true" /><span><strong className="font-semibold">Adoption is broad and shallow.</strong> Two-thirds to nine in ten nonprofits use AI depending on the definition; single digits report it changed what they can do; roughly half to three-quarters have no policy.<sup className="font-mono text-[11px] text-signal ml-0.5">3, 4, 5, 6</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-signal flex-shrink-0" aria-hidden="true" /><span><strong className="font-semibold">The best-evidenced cost of inaction is ungoverned use, not funder pressure.</strong> About three in four AI users at work use unapproved tools; only 17 percent of nonprofit leaders had been asked about AI by a funder.<sup className="font-mono text-[11px] text-signal ml-0.5">1, 4</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-signal flex-shrink-0" aria-hidden="true" /><span><strong className="font-semibold">Demand is outrunning capacity, and people are tired.</strong> About half of nonprofits saw demand rise in 2025 and a third kept pace; leader burnout is at a three-year high.<sup className="font-mono text-[11px] text-signal ml-0.5">2, 7</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-ink flex-shrink-0" aria-hidden="true" /><span><strong className="font-semibold">Productivity claims run ahead of the evidence.</strong> The widely repeated "60 to 80 percent faster" figure has no nonprofit study behind it. The largest independent sample puts most users' savings under four hours a week. This tool no longer prints a percentage; it asks you to measure against your own baseline.<sup className="font-mono text-[11px] text-signal ml-0.5">8</sup></span></li>
            <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 bg-ink flex-shrink-0" aria-hidden="true" /><span><strong className="font-semibold">Costs are planning bands.</strong> No independent nonprofit cost benchmark exists. Published tiers are vendor estimates; the bands here sit at their lower half and assume most of the spend is staff time, data clean-up, training, and review.</span></li>
          </ul>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">Five gates before a pilot</h2>
          <p className="font-serif text-[16.5px] mt-2 max-w-[62ch]">A useful rule from the evidence: pilot now only if you can say yes to all five. If any gate fails, hold that use case, not the learning.</p>
          <ol className="mt-3 space-y-2 max-w-[62ch]">
            {[
              ["A material problem", "a documented backlog, cost, error rate, response time, or access problem exists."],
              ["Low or controlled rights impact", "AI does not decide employment, benefits, eligibility, health, safeguarding, or access to essential services on its own."],
              ["Governance ready", "approved tools, prohibited data, human review, disclosure, incident handling, an appeal path, and a named owner are written down."],
              ["Affordable over its whole life", "the first-year cost includes staff time, data work, integration, evaluation, security, and accessibility, not just licences."],
              ["Measurable and reversible", "baseline metrics, a comparison method, stop thresholds, vendor exit, and data deletion are agreed before launch."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.2rem_1fr] text-[15.5px]">
                <span className="font-mono text-[13px] text-signal pt-0.5">{i + 1}</span>
                <span><strong className="font-semibold">{t}:</strong> {d}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">Frameworks and law that apply in 2026</h2>
          <table className="ledger mt-3">
            <thead><tr><th className="w-[38%]">Instrument</th><th>Status on 5 September 2026</th></tr></thead>
            <tbody>
              <tr><td>NIST AI RMF 1.0 + Generative AI Profile</td><td className="text-ink-soft">Current. Voluntary. Framework January 2023; profile July 2024.<sup className="font-mono text-[11px] text-signal ml-0.5">9</sup></td></tr>
              <tr><td>ISO/IEC 42001:2023</td><td className="text-ink-soft">Current, certifiable; certification optional unless a contract requires it.<sup className="font-mono text-[11px] text-signal ml-0.5">10</sup></td></tr>
              <tr><td>Fundraising.AI framework</td><td className="text-ink-soft">Current, updated late 2025.<sup className="font-mono text-[11px] text-signal ml-0.5">11</sup></td></tr>
              <tr><td>NTEN equity framework</td><td className="text-ink-soft">Current; a set of questions, not a compliance standard.<sup className="font-mono text-[11px] text-signal ml-0.5">12</sup></td></tr>
              <tr><td>EU AI Act</td><td className="text-ink-soft">Transparency duties from 2 August 2026; stand-alone high-risk duties deferred to 2 December 2027. Nonprofit status is not an exemption.<sup className="font-mono text-[11px] text-signal ml-0.5">13</sup></td></tr>
              <tr><td>US states</td><td className="text-ink-soft">Texas TRAIGA and Illinois HB 3773 (AI in employment) in force from 1 January 2026; California AB 2013 from 1 January 2026 and SB 942 from 2 August 2026, both aimed mainly at developers; Colorado's revised law takes effect 1 January 2027.</td></tr>
              <tr><td>Independent Sector</td><td className="text-ink-soft">A Principles Panel on AI was convened 27 July 2026. No published framework yet; do not cite one.</td></tr>
            </tbody>
          </table>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">How the recommendation is written</h2>
          <div className="font-serif text-[16.5px] leading-relaxed mt-2 max-w-[62ch] prose-panel">
            <p>Your answers are sent to an AI advisor (Claude, by Anthropic) running behind this site with a fixed set of instructions: be specific to your organisation, respect all three roads, invent no percentages, label budgets as planning bands, and list the specific risks of holding still. If the advisor is unavailable, a template engine using the same rules writes the analysis instead, and the page says which one you got.</p>
            <p>The impact score is a quantity, not a verdict. Serving two thousand more people is not better if it means abandoning two hundred who need intensive support. Read it alongside your values, your community's trust, and your capacity to sustain the work.</p>
          </div>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">Privacy</h2>
          <ul className="mt-2 space-y-1.5 text-[15.5px] max-w-[62ch] list-disc pl-5 text-ink-soft">
            <li>Your answers are saved in your own browser so you can come back, and cleared when you press Start over or clear site data.</li>
            <li>They are sent once to the AI advisor to write your analysis, and are not stored on our servers afterwards.</li>
            <li>The PDF is generated in your browser and never uploaded.</li>
            <li>Nothing is used for marketing and nothing is shared beyond the AI provider.</li>
          </ul>
        </section>

        <section className="rule-top mt-8 pt-5">
          <h2 className="font-display font-semibold text-heading uppercase">Sources</h2>
          <table className="ledger mt-3">
            <tbody>
              {SOURCES.map((s) => (
                <tr key={s.n}>
                  <td className="font-mono text-[13px] text-ink-soft w-8 pr-2">{s.n}</td>
                  <td>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-1 underline-offset-4 hover:text-signal">{s.name}</a>
                    <span className="block text-[14px] text-ink-soft mt-0.5">{s.detail}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="max-w-panel mx-auto px-4 pb-8">
        <div className="hairline pt-4 text-[13px] text-ink-soft">
          A free tool from <a href="https://mtm.now" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 text-ink hover:text-signal">Meet the Moment</a>. Built with AI assistance and reviewed before publishing.
        </div>
      </footer>
    </div>
  );
};

export default MethodologyPage;

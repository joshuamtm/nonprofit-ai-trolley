import React from "react";

const MethodologyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-textDark">
      <header className="bg-primary py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-display text-3xl text-white mb-2">
            Methodology
          </h1>
          <p className="text-lg text-white/80">
            How this assessment works and why it matters
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
        <section className="card">
          <h2 className="font-display text-2xl text-primary mb-4">
            What is This Assessment?
          </h2>
          <p className="text-base leading-relaxed mb-4">
            The Nonprofit AI Trolley Problem is an interactive assessment tool designed to help
            nonprofit organizations navigate the complex ethical landscape of AI implementation.
            Named after the classic "trolley problem" in ethics, this tool acknowledges that
            AI decisions rarely have perfect solutions — they involve trade-offs, competing values,
            and real consequences.
          </p>
          <p className="text-base leading-relaxed">
            Rather than providing simple yes/no answers, we help you understand the full spectrum
            of considerations, risks, and opportunities specific to your context.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-2xl text-primary mb-4">The Five Phases</h2>

          <div className="space-y-6">
            {[
              {
                num: 1,
                title: "Context",
                desc: "We gather essential information about your organization: mission focus, type, annual budget size, and current situation. This contextualizes all recommendations and ensures budget estimates are grounded in your reality.",
              },
              {
                num: 2,
                title: "AI Initiative",
                desc: "You describe the specific AI application you're considering (or tell us you're still exploring), what success would look like, your expected timeline, and intended scale of deployment. This helps us understand your goals and constraints.",
              },
              {
                num: 3,
                title: "Concerns",
                desc: "We explore your specific worries about AI — from algorithmic bias and data privacy to job displacement and technology dependency. You rate each concern on a 1-5 scale, giving us a nuanced picture of where your organization's ethical priorities lie.",
              },
              {
                num: 4,
                title: "Readiness Assessment",
                desc: "You assess your organization's readiness across four dimensions: technical infrastructure, change management capacity, ethical framework maturity, and data governance. Combined with urgency and stakeholder readiness, this shapes whether we recommend cautious pilots or bolder approaches.",
              },
              {
                num: 5,
                title: "Personalized Analysis",
                desc: "We synthesize everything into a personalized three-path recommendation. An AI advisor analyzes your specific situation — including your mission statement and use case description — to generate tailored benefits, risks, action plans, and budget estimates for each path.",
              },
            ].map((phase) => (
              <div key={phase.num} className="flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {phase.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{phase.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="font-display text-2xl text-primary mb-4">
            The Three Paths
          </h2>
          <p className="text-base leading-relaxed mb-6">
            Every assessment produces analysis for all three paths, regardless of the recommendation.
            Each path is presented as a legitimate strategic choice with genuine trade-offs:
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border-2 border-signal-green/20 bg-signal-green/5">
              <h3 className="font-semibold text-signal-green mb-1">Path 1: Implement AI (Pull the Lever)</h3>
              <p className="text-sm text-text-muted">
                Move forward with full implementation, accepting calculated risks for maximum potential benefit.
                Best for organizations with high urgency, strong readiness, and aligned stakeholders.
              </p>
            </div>
            <div className="p-4 rounded-xl border-2 border-signal-blue/20 bg-signal-blue/5">
              <h3 className="font-semibold text-signal-blue mb-1">Path 2: Maintain Current Approach (Don't Pull)</h3>
              <p className="text-sm text-text-muted">
                Continue without AI, focusing on optimizing current processes and building readiness for the future.
                This is a valid strategic choice, not a failure — especially when concerns are high and urgency is low.
              </p>
            </div>
            <div className="p-4 rounded-xl border-2 border-signal-amber/20 bg-signal-amber/5">
              <h3 className="font-semibold text-signal-amber mb-1">Path 3: Implement with Safeguards (Pull with Care)</h3>
              <p className="text-sm text-text-muted">
                Phased implementation with comprehensive safeguards, ethics oversight, and built-in evaluation points.
                Balances innovation with risk management — the most commonly recommended path.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="font-display text-2xl text-primary mb-4">
            Understanding Impact Scores
          </h2>
          <p className="text-base leading-relaxed mb-4">
            Each path receives an impact score (0-100) based on your inputs. However, the
            highest score doesn't always mean the best choice. This is intentional:
          </p>

          <ul className="space-y-3 mb-6">
            {[
              { title: "Impact scores measure quantity, not quality", desc: "Serving 2,000 more families sounds impressive — but not if it means abandoning 200 of your most vulnerable clients who need intensive support." },
              { title: "Ethical considerations transcend metrics", desc: "Privacy violations, algorithmic bias, and mission drift can't always be reduced to numbers on a spreadsheet." },
              { title: "Organizational values are paramount", desc: "An environmental justice nonprofit might reject efficiency gains if obtaining them conflicts with their commitments to the communities they serve." },
              { title: "Trust and relationships are invaluable", desc: "Short-term efficiency gains mean nothing if they erode community trust that took years to build." },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <div>
                  <strong className="text-sm">{item.title}</strong>
                  <p className="text-sm text-text-muted mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-primary/5 border-l-3 border-primary/30 p-4 rounded-r-xl" style={{ borderLeftWidth: '3px' }}>
            <h4 className="font-semibold text-sm text-primary mb-1">Key Insight</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              The "best" choice isn't always the one with the biggest numbers. Nonprofit
              leadership requires weighing quantifiable impact against ethical principles,
              community relationships, organizational mission, and long-term sustainability.
            </p>
          </div>
        </section>

        <section className="card">
          <h2 className="font-display text-2xl text-primary mb-4">How Recommendations Are Generated</h2>
          <p className="text-base leading-relaxed mb-4">
            Your personalized analysis is generated using AI (Claude by Anthropic) that evaluates
            your specific inputs against nonprofit AI adoption best practices. The analysis considers:
          </p>
          <ul className="space-y-2 text-sm ml-4">
            {[
              "Your organization's specific context, mission, and constraints",
              "The AI initiative type, scale, and timeline you described",
              "Your concern ratings and their relative priorities",
              "Organizational readiness across four dimensions",
              "Current best practices in responsible AI deployment for nonprofits",
              "Ethical frameworks from AI ethics research",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-text-muted mt-4">
            If the AI analysis is temporarily unavailable, a template-based analysis engine
            provides recommendations using the same scoring methodology.
          </p>
        </section>

        <section className="card">
          <h2 className="font-display text-2xl text-primary mb-4">Privacy & Data Use</h2>
          <p className="text-base leading-relaxed mb-4">
            Your assessment data is:
          </p>
          <ul className="space-y-2 text-sm ml-4">
            {[
              "Sent securely to generate your personalized analysis via AI (Claude by Anthropic)",
              "Not stored on our servers after your report is generated",
              "Not shared with third parties beyond the AI analysis provider",
              "Not used for marketing purposes",
              "Saved locally in your browser so you don't lose progress (cleared when you clear browser data)",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-text-muted mt-4">
            Your downloadable PDF report is generated entirely in your browser and is never
            uploaded to any server. Only you have access to it.
          </p>
        </section>
      </main>

      <footer className="bg-primary/5 py-6 px-4 mt-8 border-t border-rail-light">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm text-text-muted">
            Developed by{" "}
            <a href="https://mtm.now" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              Meet the Moment
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MethodologyPage;

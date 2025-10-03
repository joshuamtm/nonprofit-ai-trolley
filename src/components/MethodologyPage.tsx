import React from "react";

const MethodologyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <header className="bg-black bg-opacity-20 py-6 px-4 border-b border-white border-opacity-10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">
            The Nonprofit AI Trolley Problem - Methodology
          </h1>
          <p className="text-lg opacity-90">
            Understanding how this assessment works and why it matters
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <section className="bg-white text-gray-900 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">
            What is This Assessment?
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            The Nonprofit AI Trolley Problem is an interactive assessment tool designed to help
            nonprofit organizations navigate the complex ethical landscape of AI implementation.
            Named after the classic "trolley problem" in ethics, this tool acknowledges that
            AI decisions rarely have perfect solutions—they involve tradeoffs, competing values,
            and real consequences.
          </p>
          <p className="text-lg leading-relaxed">
            Rather than providing simple yes/no answers, we help you understand the full spectrum
            of considerations, risks, and opportunities specific to your context.
          </p>
        </section>

        <section className="bg-white text-gray-900 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">The Five Phases</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold">
                  1
                </span>
                <h3 className="text-2xl font-semibold">Context</h3>
              </div>
              <p className="text-gray-700 ml-13">
                We gather essential information about your organization: mission focus, size,
                budget, and current AI experience. This contextualizes all recommendations.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 text-white font-bold">
                  2
                </span>
                <h3 className="text-2xl font-semibold">AI Initiative</h3>
              </div>
              <p className="text-gray-700 ml-13">
                You describe the specific AI application you're considering and what success
                would look like. This helps us understand your goals and constraints.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                  3
                </span>
                <h3 className="text-2xl font-semibold">Concerns</h3>
              </div>
              <p className="text-gray-700 ml-13">
                We explore your specific worries about AI—from bias and privacy to cost and
                complexity. Acknowledging concerns is crucial for responsible implementation.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 text-white font-bold">
                  4
                </span>
                <h3 className="text-2xl font-semibold">Risk Tolerance</h3>
              </div>
              <p className="text-gray-700 ml-13">
                You indicate your organization's capacity for experimentation, failure, and
                change. This shapes whether we recommend cautious pilots or bolder approaches.
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold">
                  5
                </span>
                <h3 className="text-2xl font-semibold">Review & Generate Report</h3>
              </div>
              <p className="text-gray-700 ml-13">
                We synthesize everything into personalized recommendations, including specific
                next steps, risk mitigation strategies, and resources tailored to your situation.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white text-gray-900 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">
            Understanding Impact Scores
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Throughout the assessment, you'll see references to "impact scores" or success metrics
            like "serve 2,000 more families" or "$750,000 in additional revenue." These quantifiable
            measures help us understand potential benefits—but they're not the whole story.
          </p>

          <h3 className="text-2xl font-semibold text-purple-600 mt-6 mb-3">
            Why Highest Impact Doesn't Always Mean Best Choice
          </h3>
          <p className="text-lg leading-relaxed mb-4">
            You may notice that recommendations don't always align with the option showing the
            highest measurable impact. This is intentional and reflects the reality of nonprofit
            decision-making:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🎯</span>
              <div>
                <strong className="text-lg">Impact scores measure quantity, not quality</strong>
                <p className="text-gray-700 mt-1">
                  Serving 2,000 more families sounds impressive—but not if it means abandoning
                  200 of your most vulnerable clients who need intensive support.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="text-2xl flex-shrink-0">⚖️</span>
              <div>
                <strong className="text-lg">Ethical considerations transcend metrics</strong>
                <p className="text-gray-700 mt-1">
                  Privacy violations, algorithmic bias, and mission drift can't always be
                  reduced to numbers on a spreadsheet.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <strong className="text-lg">Risk and harm matter</strong>
                <p className="text-gray-700 mt-1">
                  A 2% error rate sounds acceptable until you realize it means falsely flagging
                  hundreds of youth as "crisis cases," potentially traumatizing them.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🌱</span>
              <div>
                <strong className="text-lg">Organizational values are paramount</strong>
                <p className="text-gray-700 mt-1">
                  An environmental justice nonprofit might reject $750,000 in AI-generated grant
                  funding if obtaining it conflicts with their carbon-neutral commitment to the
                  communities they serve.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🤝</span>
              <div>
                <strong className="text-lg">Trust and relationships are invaluable</strong>
                <p className="text-gray-700 mt-1">
                  Short-term efficiency gains mean nothing if they erode community trust that
                  took years or decades to build.
                </p>
              </div>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Key Insight</h4>
                <p className="text-gray-800 leading-relaxed">
                  The "best" choice isn't always the one with the biggest numbers. Nonprofit
                  leadership requires weighing quantifiable impact against ethical principles,
                  community relationships, organizational mission, and long-term sustainability.
                  This assessment helps you navigate those tradeoffs thoughtfully.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-gray-900 rounded-lg p-8 mb-8 shadow-xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">How Recommendations Are Generated</h2>
          <p className="text-lg leading-relaxed mb-4">
            Our recommendations are based on:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg ml-4">
            <li>Your organization's specific context and constraints</li>
            <li>Current best practices in responsible AI deployment</li>
            <li>Risk-benefit analysis tailored to nonprofit settings</li>
            <li>Ethical frameworks from AI ethics research</li>
            <li>Real-world implementation patterns from similar organizations</li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            Each recommendation includes specific next steps, potential pitfalls to avoid,
            and resources to support implementation.
          </p>
        </section>

        <section className="bg-white text-gray-900 rounded-lg p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Privacy & Data Use</h2>
          <p className="text-lg leading-relaxed mb-4">
            Your responses are used only to generate your personalized report. We do not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg ml-4">
            <li>Share your data with third parties</li>
            <li>Use your responses for marketing purposes</li>
            <li>Store personally identifiable information beyond what you choose to save</li>
          </ul>
          <p className="text-lg leading-relaxed mt-4">
            Anonymous, aggregated data may be used to improve the assessment tool and inform
            research on AI ethics in nonprofits.
          </p>
        </section>
      </main>

      <footer className="bg-black bg-opacity-30 py-8 px-4 mt-12 border-t border-white border-opacity-10">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg opacity-90">
            Developed by <strong>Meet the Moment</strong>
          </p>
          <p className="opacity-75 mt-2">
            <a href="https://mtm.now" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">
              mtm.now
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MethodologyPage;

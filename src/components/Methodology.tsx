import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MethodologySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const Methodology: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const sections: MethodologySection[] = [
    {
      id: "overview",
      title: "How This Tool Works",
      content: (
        <div className="space-y-4">
          <p>
            The Nonprofit AI Trolley Problem is an assessment tool designed to help nonprofit
            organizations make informed decisions about AI implementation. It analyzes your
            responses across multiple dimensions to provide personalized recommendations.
          </p>
          <p className="font-medium">The tool evaluates four key areas:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Risk Aversion Score (30% weight):</strong> Based on your concerns about ethical
              bias, data privacy, human dignity, and accuracy errors
            </li>
            <li>
              <strong>Urgency Score (25% weight):</strong> Determined by how critical your need is
              (critical, high, moderate, or low)
            </li>
            <li>
              <strong>Readiness Score (25% weight):</strong> Calculated from your technical readiness,
              change management capacity, ethical framework maturity, and data governance status
            </li>
            <li>
              <strong>Stakeholder Alignment Score (20% weight):</strong> Based on whether stakeholders
              are enthusiastic, supportive, skeptical, or resistant
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "impact-score",
      title: "How Impact Scores Are Calculated",
      content: (
        <div className="space-y-4">
          <p>
            Each path (Pull Lever, Don't Pull, Pull with Safeguards) receives an impact score
            from 0-100 that reflects its potential effectiveness for your organization.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <p className="font-medium mb-2">Base Scores:</p>
            <ul className="space-y-1">
              <li>• Full Implementation: 85 points (maximum potential impact)</li>
              <li>• Phased Implementation: 65 points (balanced approach)</li>
              <li>• Status Quo: 20 points (no AI benefits, but maintains stability)</li>
            </ul>
          </div>
          <p className="font-medium">Adjustments applied:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Readiness Multiplier:</strong> Your readiness score (0-1) multiplies the base
              score. Low readiness significantly reduces impact potential.
            </li>
            <li>
              <strong>Urgency Boost:</strong> Critical urgency adds up to 10 points, recognizing
              that urgent needs may require accepting calculated risks.
            </li>
          </ul>
          <p className="text-sm text-gray-600 italic mt-4">
            Example: A phased approach with 60% readiness and critical urgency would score:
            (65 × 0.6) + 10 = 49 points
          </p>
        </div>
      ),
    },
    {
      id: "financial-estimates",
      title: "How Financial Estimates Are Generated",
      content: (
        <div className="space-y-4">
          <p>
            Budget estimates are calculated based on your organization size and implementation approach.
            These are research-based estimates from nonprofit technology implementations.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Organization Size</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Multiplier</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Example Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Grassroots/Small</td>
                  <td className="border border-gray-300 px-4 py-2">1x</td>
                  <td className="border border-gray-300 px-4 py-2">$20K-$40K initial</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Medium</td>
                  <td className="border border-gray-300 px-4 py-2">2x</td>
                  <td className="border border-gray-300 px-4 py-2">$40K-$80K initial</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Large</td>
                  <td className="border border-gray-300 px-4 py-2">3x</td>
                  <td className="border border-gray-300 px-4 py-2">$60K-$120K initial</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <p className="font-medium mb-2">Full Implementation vs. Phased:</p>
            <ul className="space-y-1">
              <li>• <strong>Full:</strong> $50K-$100K initial per org size multiplier</li>
              <li>• <strong>Phased:</strong> $20K-$40K initial per org size multiplier (40% lower)</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            These estimates include technology costs, training, consulting, and change management.
            Actual costs vary based on specific vendors, use cases, and existing infrastructure.
          </p>
        </div>
      ),
    },
    {
      id: "recommendations",
      title: "How Path Recommendations Are Determined",
      content: (
        <div className="space-y-4">
          <p>
            The tool uses a decision logic system that combines your scores to recommend the most
            appropriate path. Here's how it works:
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <p className="font-bold text-green-800 mb-2">
                Recommendation: Pull the Lever (Full Implementation)
              </p>
              <p className="text-sm">
                <strong>When:</strong> Urgency Score &gt; 80% AND Readiness Score &gt; 60%
              </p>
              <p className="text-sm mt-2">
                <strong>Rationale:</strong> Your critical urgency combined with good organizational
                readiness suggests you can move forward quickly while managing risks actively.
              </p>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <p className="font-bold text-red-800 mb-2">
                Recommendation: Don't Pull (Status Quo)
              </p>
              <p className="text-sm">
                <strong>When:</strong> (Risk Score &gt; 70% OR Alignment Score &lt; 40%) AND
                Urgency Score &lt; 50%
              </p>
              <p className="text-sm mt-2">
                <strong>Rationale:</strong> High risk concerns and/or low stakeholder alignment,
                combined with non-urgent timeline, suggest focusing on preparation before
                considering AI implementation.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="font-bold text-blue-800 mb-2">
                Recommendation: Pull with Safeguards (Phased Implementation)
              </p>
              <p className="text-sm">
                <strong>When:</strong> Most other scenarios (default recommendation)
              </p>
              <p className="text-sm mt-2">
                <strong>Rationale:</strong> A phased approach balances your need for AI benefits
                with appropriate risk management and stakeholder engagement. This is the most
                common recommendation as it suits the majority of organizations.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded mt-4">
            <p className="font-medium mb-2">Why might we recommend NOT pulling even with a lower impact score?</p>
            <p className="text-sm">
              Impact scores measure <em>potential</em> benefits, but the recommendation also
              considers your organization's readiness, stakeholder alignment, and risk tolerance.
              A lower-impact "Don't Pull" recommendation protects you from implementing AI when
              your organization isn't ready, which could result in failed implementation, wasted
              resources, or harm to beneficiaries. Sometimes the best decision is to wait and prepare.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "benefits-risks",
      title: "How Benefits and Risks Are Identified",
      content: (
        <div className="space-y-4">
          <p className="font-medium">Benefits are personalized based on:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Expected Outcomes:</strong> Your selected goals (serve more, reduce time,
              improve quality, etc.) directly map to specific benefits
            </li>
            <li>
              <strong>Current Capacity:</strong> If you're "overwhelmed," we emphasize relief for
              staff and addressing backlogs
            </li>
            <li>
              <strong>Impact Scale:</strong> Organization-wide implementations receive benefits like
              "competitive advantage" and "transform capabilities"
            </li>
            <li>
              <strong>Quantified Estimates:</strong> Where possible, benefits include percentage
              improvements (e.g., "Serve 50-75% more beneficiaries")
            </li>
          </ul>

          <p className="font-medium">Risks are identified through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Primary Concerns:</strong> Any concern you rate 4 or 5 (out of 5) becomes a
              highlighted risk with specific language
            </li>
            <li>
              <strong>Stakeholder Readiness:</strong> "Resistant" stakeholders trigger risk warnings
              about implementation challenges
            </li>
            <li>
              <strong>Technical Gaps:</strong> Low technical readiness (≤2) flags infrastructure
              risks
            </li>
            <li>
              <strong>Contextual Factors:</strong> Fears about beneficiary harm, specific use cases,
              and other contextual data inform risk generation
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "mitigation",
      title: "Mitigation Strategies and Action Plans",
      content: (
        <div className="space-y-4">
          <p>
            Mitigation strategies are matched to your top three concerns using a template-based system
            with 14 specialized templates covering change management, budget constraints, privacy,
            bias, workforce concerns, and more.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
            <p className="font-medium mb-2">Template Matching Process:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>System identifies which of your concerns rate 4 or higher</li>
              <li>Matches these to specialized recommendation templates</li>
              <li>Generates specific strategies, action items, and resource needs</li>
              <li>Organizes into 30/60/90-day action plans</li>
            </ol>
          </div>

          <p className="font-medium">Example Template: High Bias Concern</p>
          <div className="bg-white border border-gray-300 p-4 rounded">
            <p className="text-sm mb-2">
              <strong>Triggers when:</strong> Ethical bias concern ≥ 4/5
            </p>
            <p className="text-sm mb-2">
              <strong>Recommendations:</strong>
            </p>
            <ul className="text-sm list-disc pl-6 space-y-1 mb-2">
              <li>Implement bias testing protocols at each stage</li>
              <li>Ensure diverse representation in AI development team</li>
              <li>Use explainable AI models for transparency</li>
              <li>Establish ethics review committee with community representation</li>
            </ul>
            <p className="text-sm">
              <strong>Resources Identified:</strong> AI ethics expert, bias testing tools
              (e.g., AI Fairness 360), community engagement budget, training on algorithmic bias
            </p>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            The system has templates for: resistant stakeholders, skeptical stakeholders, limited
            budget, data privacy, ethical bias, job displacement, human dignity, low technical
            readiness, critical urgency, organization-wide scale, pilot scale, and environmental impact.
          </p>
        </div>
      ),
    },
    {
      id: "transparency",
      title: "Transparency & Limitations",
      content: (
        <div className="space-y-4">
          <p className="font-medium">This tool is designed to be transparent about its logic:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>All scoring weights and calculation formulas are documented above</li>
            <li>Recommendations are rule-based, not based on machine learning</li>
            <li>Financial estimates are generalized ranges, not precise quotes</li>
            <li>The tool provides guidance, not definitive answers</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p className="font-bold mb-2">Important Limitations:</p>
            <ul className="space-y-2">
              <li>
                • <strong>Not a substitute for expert advice:</strong> This tool complements, but
                doesn't replace, consultation with AI ethics experts, technical advisors, and
                community stakeholders
              </li>
              <li>
                • <strong>Context matters:</strong> Your specific use case, sector, beneficiary
                population, and regulatory environment may require different considerations
              </li>
              <li>
                • <strong>Estimates are approximate:</strong> Budget and impact estimates are based
                on general research and should be validated with vendors and consultants
              </li>
              <li>
                • <strong>Dynamic landscape:</strong> AI technology and best practices evolve
                rapidly; recommendations should be reviewed regularly
              </li>
            </ul>
          </div>

          <p className="font-medium">Recommended Next Steps:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Share results with key stakeholders for discussion</li>
            <li>Consult with AI ethics experts and technical advisors</li>
            <li>Engage beneficiaries and community members in decision-making</li>
            <li>Pilot test recommendations before full implementation</li>
            <li>Revisit this assessment as your context changes</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Methodology</h2>
      <p className="text-gray-600 mb-6">
        Understand how this tool generates recommendations, calculates estimates, and makes
        determinations about AI implementation paths.
      </p>

      <div className="space-y-4">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          return (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h3>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 py-4 bg-white text-gray-700">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Questions about the methodology?</strong> This tool is open source. You can
          review the complete calculation logic in the{" "}
          <a
            href="https://github.com/joshuamtm/nonprofit-ai-trolley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-800 font-medium"
          >
            source code
          </a>{" "}
          or reach out to the development team for clarification.
        </p>
      </div>
    </div>
  );
};

export default Methodology;

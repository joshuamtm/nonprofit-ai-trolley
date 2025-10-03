import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Target, CheckCircle, ChevronDown, ChevronUp, AlertTriangle, Gift, BarChart } from 'lucide-react';

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onGetStarted }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Should Your Nonprofit Adopt AI?
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Navigate the ethical complexities of AI implementation with our guided decision-making tool
              inspired by the classic trolley problem in ethics.
            </p>
          </div>
        </div>
      </div>

      {/* What This Tool Does */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          What This Tool Does
        </h2>
        <p className="text-gray-600 mb-4">
          This interactive assessment helps nonprofit leaders make informed decisions about AI adoption by:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">
              Mapping your specific concerns to personalized recommendations
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">
              Providing clear trade-off analysis for three distinct paths
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">
              Generating actionable 30/60/90 day implementation plans
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">
              Offering budget estimates and resource requirements
            </span>
          </div>
        </div>
      </div>

      {/* The Journey */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-primary" />
          Your 5-Minute Journey
        </h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
              1
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">Context (1 min)</p>
              <p className="text-sm text-gray-500">Share your organization type and mission</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
              2
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">AI Initiative (1 min)</p>
              <p className="text-sm text-gray-500">Describe what AI solution you're considering</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
              3
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">Concerns (1 min)</p>
              <p className="text-sm text-gray-500">Rate your worries about bias, privacy, job displacement, etc.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
              4
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">Readiness (1 min)</p>
              <p className="text-sm text-gray-500">Assess your organizational capacity and urgency</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
              5
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-700">Your Personalized Analysis (1 min)</p>
              <p className="text-sm text-gray-500">Review three paths with specific recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Gift className="w-5 h-5 mr-2 text-green-600" />
          What You'll Receive
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">
              <strong>Personalized recommendation</strong> based on your specific situation
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">
              <strong>Three detailed paths</strong> with clear trade-offs (implement, wait, or proceed with safeguards)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">
              <strong>Actionable roadmap</strong> with specific 30/60/90 day action items
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-700">
              <strong>Downloadable PDF report</strong> to share with your board and team
            </span>
          </li>
        </ul>
      </div>

      {/* The Trolley Problem Context - Collapsible */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-between text-left"
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            Why "The Trolley Problem"?
          </h2>
          {showMore ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {showMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 text-gray-600 space-y-3"
          >
            <p>
              The trolley problem is a famous thought experiment in ethics: A runaway trolley is heading toward
              five people on the tracks. You can pull a lever to divert it to another track, where it will hit
              only one person. What do you do?
            </p>
            <p>
              <strong>AI adoption presents a similar dilemma:</strong> Implementing AI might help you serve many more
              beneficiaries (saving the five), but it could risk job displacement, bias, or loss of human
              connection (harming the one). There's no perfect answer—only trade-offs to consider carefully.
            </p>
            <p className="text-sm italic">
              This tool helps you explore these ethical trade-offs in the context of your specific organization
              and make an informed decision aligned with your values.
            </p>
          </motion.div>
        )}
      </div>

      {/* Time Estimate & CTA */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Takes less than 5 minutes to complete</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button
            onClick={onGetStarted}
            className="btn-primary text-lg px-8 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Assessment →
          </motion.button>

          <a
            href="/methodology"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors"
          >
            📚 How This Works
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          No sign-up required • Your data stays private • Free to use
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onGetStarted }) => {
  const [showMore, setShowMore] = useState(false);

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto"
    >
      {/* Hero */}
      <motion.div variants={fadeUp} className="text-center mb-12">
        {/* Trolley icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="6" y="10" width="20" height="12" rx="3" />
            <rect x="10" y="6" width="12" height="8" rx="2" />
            <circle cx="11" cy="26" r="2.5" />
            <circle cx="21" cy="26" r="2.5" />
            <line x1="2" y1="28" x2="30" y2="28" strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>

        <h1 className="font-display text-hero text-textDark mb-4">
          The Nonprofit<br />AI Trolley Problem
        </h1>
        <p className="text-subtitle text-text-muted max-w-xl mx-auto leading-relaxed">
          A guided ethical framework to help your organization make informed
          decisions about AI adoption — aligned with your mission, values, and capacity.
        </p>
      </motion.div>

      {/* Journey overview */}
      <motion.div variants={fadeUp} className="card mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/8 rounded-lg">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">5 minutes</span>
          </div>
          <span className="text-sm text-text-muted">to complete</span>
        </div>

        <div className="space-y-0">
          {[
            { step: 1, title: 'Your Organization', desc: 'Type, size, and mission', time: '1 min' },
            { step: 2, title: 'The AI Initiative', desc: 'What you\'re considering and why', time: '1 min' },
            { step: 3, title: 'Your Concerns', desc: 'Rate ethical and practical worries', time: '1 min' },
            { step: 4, title: 'Readiness Assessment', desc: 'Organizational capacity and urgency', time: '1 min' },
            { step: 5, title: 'Your Analysis', desc: 'Personalized three-path recommendation', time: '1 min' },
          ].map((item, i) => (
            <div key={item.step} className="flex items-start gap-4 py-3">
              {/* Track connector */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
                  {item.step}
                </div>
                {i < 4 && <div className="w-px h-6 bg-rail-light mt-1" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-textDark text-sm">{item.title}</p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* What you'll receive */}
      <motion.div variants={fadeUp} className="card mb-6">
        <h3 className="font-display text-lg text-textDark mb-4">What You'll Receive</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Personalized recommendation based on your specific situation',
            'Three detailed paths with clear trade-offs',
            'Actionable 30/60/90 day roadmap',
            'Downloadable PDF report for your board',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-signal-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-signal-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-textDark">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why the Trolley Problem — collapsible */}
      <motion.div variants={fadeUp} className="card mb-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-between text-left group"
        >
          <h3 className="font-display text-lg text-textDark">
            Why "The Trolley Problem"?
          </h3>
          <div className="w-8 h-8 rounded-lg bg-background-alt flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            {showMore ? (
              <ChevronUp className="w-4 h-4 text-text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted" />
            )}
          </div>
        </button>

        {showMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-4 text-sm text-text-muted space-y-3 border-t border-rail-light pt-4"
          >
            <p>
              The trolley problem is a famous thought experiment in ethics: A runaway trolley is heading toward
              five people on the tracks. You can pull a lever to divert it to another track, where it will hit
              only one person. What do you do?
            </p>
            <p>
              <strong className="text-textDark">AI adoption presents a similar dilemma.</strong> Implementing AI might help you serve many more
              beneficiaries, but it could introduce risks around bias, privacy, or loss of human
              connection. There's no perfect answer — only trade-offs to consider carefully.
            </p>
            <p className="italic text-xs">
              This tool helps you explore these ethical trade-offs in the context of your specific organization
              and arrive at an informed decision aligned with your values.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div variants={fadeUp} className="text-center">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <motion.button
            onClick={onGetStarted}
            className="btn-primary text-base px-10 py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Your Assessment
          </motion.button>

          <a
            href="/methodology"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm px-6 py-3"
          >
            View Methodology
          </a>
        </div>

        <p className="mt-4 text-xs text-text-muted">
          No sign-up required &middot; Your data stays private &middot; Free to use
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeSection;

import React from 'react';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhyThisMattersProps {
  content: string;
  influences?: string[];
}

const WhyThisMatters: React.FC<WhyThisMattersProps> = ({ content, influences }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="mt-4 p-4 bg-primary/5 border-l-3 border-primary/30 rounded-r-xl"
      style={{ borderLeftWidth: '3px' }}
    >
      <div className="flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-xs text-primary mb-1 uppercase tracking-wide">Why This Matters</h4>
          <p className="text-sm text-textDark/80">{content}</p>
          {influences && influences.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {influences.map((influence, index) => (
                <span key={index} className="text-xs px-2 py-0.5 bg-primary/8 text-primary/80 rounded-md">
                  {influence}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WhyThisMatters;

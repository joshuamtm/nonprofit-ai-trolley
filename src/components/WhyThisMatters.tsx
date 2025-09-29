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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
    >
      <div className="flex items-start">
        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-sm text-yellow-800 mb-1">Why This Matters</h4>
          <p className="text-sm text-yellow-700">{content}</p>
          {influences && influences.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-yellow-800 mb-1">This influences:</p>
              <ul className="text-xs text-yellow-700 space-y-0.5">
                {influences.map((influence, index) => (
                  <li key={index}>• {influence}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WhyThisMatters;
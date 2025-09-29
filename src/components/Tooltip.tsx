import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  type?: 'info' | 'why' | 'example';
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, type = 'info', children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'why':
        return <HelpCircle className="w-4 h-4 text-blue-500" />;
      case 'example':
        return <Info className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'why':
        return 'bg-blue-50 border-blue-200';
      case 'example':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
        className="ml-1 focus:outline-none"
      >
        {children || getIcon()}
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute z-50 w-64 p-3 text-sm rounded-lg shadow-lg border ${getBackgroundColor()}
                       bottom-full left-1/2 transform -translate-x-1/2 mb-2`}
          >
            <div className="relative">
              {content}
              <div className={`absolute w-3 h-3 ${getBackgroundColor()} transform rotate-45
                            -bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
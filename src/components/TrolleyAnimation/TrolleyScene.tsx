import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrolleySceneProps {
  onPathSelect: (path: 'pull' | 'dont-pull' | 'safeguards') => void;
}

const TrolleyScene: React.FC<TrolleySceneProps> = ({ onPathSelect }) => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handlePathClick = (path: 'pull' | 'dont-pull' | 'safeguards') => {
    setSelectedPath(path);
    onPathSelect(path);
  };

  const pathColors = {
    'pull': '#10B981',
    'dont-pull': '#3B82F6',
    'safeguards': '#F59E0B'
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Clear Instructions */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4 text-center">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          🚂 The Decision Point
        </h3>
        <p className="text-blue-700">
          Click on one of the three colored tracks below to explore that path.
          Watch as the trolley travels down your chosen track!
        </p>
      </div>

      <div className="p-8 bg-gradient-to-b from-sky-100 to-green-50 rounded-xl shadow-lg">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      >
        {/* Track Rails */}
        <g>
          {/* Main track */}
          <rect x="50" y="280" width="200" height="4" fill="#6B7280" />
          <rect x="50" y="296" width="200" height="4" fill="#6B7280" />

          {/* Fork point */}
          <circle cx="250" cy="290" r="8" fill="#DC2626" />

          {/* Three paths */}
          {/* Path 1: Pull (left) */}
          <motion.g
            initial={{ opacity: 0.6 }}
            animate={{ opacity: hoveredPath === 'pull' || selectedPath === 'pull' ? 1 : 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handlePathClick('pull')}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredPath('pull')}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <path
              d="M 250 280 Q 350 240 450 220"
              stroke={pathColors['pull']}
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M 250 296 Q 350 256 450 236"
              stroke={pathColors['pull']}
              strokeWidth="4"
              fill="none"
            />
            <rect x="450" y="210" width="150" height="30" fill={pathColors['pull']} rx="15" opacity="0.3" />
            <text x="525" y="230" textAnchor="middle" fill={pathColors['pull']} fontSize="14" fontWeight="bold">
              Implement AI
            </text>
          </motion.g>

          {/* Path 2: Don't Pull (straight) */}
          <motion.g
            initial={{ opacity: 0.6 }}
            animate={{ opacity: hoveredPath === 'dont-pull' || selectedPath === 'dont-pull' ? 1 : 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handlePathClick('dont-pull')}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredPath('dont-pull')}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <rect x="250" y="280" width="200" height="4" fill={pathColors['dont-pull']} />
            <rect x="250" y="296" width="200" height="4" fill={pathColors['dont-pull']} />
            <rect x="450" y="275" width="150" height="30" fill={pathColors['dont-pull']} rx="15" opacity="0.3" />
            <text x="525" y="295" textAnchor="middle" fill={pathColors['dont-pull']} fontSize="14" fontWeight="bold">
              Status Quo
            </text>
          </motion.g>

          {/* Path 3: With Safeguards (right) */}
          <motion.g
            initial={{ opacity: 0.6 }}
            animate={{ opacity: hoveredPath === 'safeguards' || selectedPath === 'safeguards' ? 1 : 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handlePathClick('safeguards')}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredPath('safeguards')}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <path
              d="M 250 280 Q 350 320 450 340"
              stroke={pathColors['safeguards']}
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M 250 296 Q 350 336 450 356"
              stroke={pathColors['safeguards']}
              strokeWidth="4"
              fill="none"
            />
            <rect x="450" y="335" width="150" height="30" fill={pathColors['safeguards']} rx="15" opacity="0.3" />
            <text x="525" y="355" textAnchor="middle" fill={pathColors['safeguards']} fontSize="14" fontWeight="bold">
              With Safeguards
            </text>
          </motion.g>
        </g>

        {/* Trolley */}
        <motion.g
          initial={{ x: 0 }}
          animate={{
            x: selectedPath === 'pull' ? 400 :
               selectedPath === 'dont-pull' ? 400 :
               selectedPath === 'safeguards' ? 400 : 0,
            y: selectedPath === 'pull' ? -60 :
               selectedPath === 'safeguards' ? 60 : 0
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <rect x="80" y="260" width="60" height="40" fill="#7C3AED" rx="5" />
          <rect x="90" y="250" width="40" height="25" fill="#A78BFA" rx="3" />
          <circle cx="95" cy="305" r="8" fill="#374151" />
          <circle cx="125" cy="305" r="8" fill="#374151" />
        </motion.g>

        {/* Lever */}
        <motion.g
          animate={{
            rotate: selectedPath ? 45 : 0
          }}
          style={{ transformOrigin: '250px 350px' }}
          transition={{ duration: 0.5 }}
        >
          <rect x="245" y="320" width="10" height="30" fill="#DC2626" rx="2" />
          <circle cx="250" cy="320" r="12" fill="#EF4444" />
        </motion.g>

        {/* Labels */}
        <text x="110" y="240" textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">
          Your Decision
        </text>
        {!selectedPath && (
          <text x="400" y="380" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="bold">
            ⬆ Click any colored track above to make your choice!
          </text>
        )}
        {selectedPath && (
          <text x="400" y="380" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">
            ✓ Path selected! See analysis below
          </text>
        )}
      </svg>
      </div>

      {hoveredPath && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-white rounded-lg shadow"
          >
            <p className="text-sm text-gray-600">
              {hoveredPath === 'pull' && "Take action and implement the AI solution with calculated risks"}
              {hoveredPath === 'dont-pull' && "Maintain current operations without AI implementation"}
              {hoveredPath === 'safeguards' && "Implement AI with comprehensive risk mitigation strategies"}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TrolleyScene;
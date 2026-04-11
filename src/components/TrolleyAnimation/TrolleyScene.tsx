import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TrolleySceneProps {
  onPathSelect: (path: 'pull' | 'dont-pull' | 'safeguards') => void;
  recommendedPath?: string;
}

const TrolleyScene: React.FC<TrolleySceneProps> = ({ onPathSelect, recommendedPath }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [, setAnimationComplete] = useState(false);

  // Auto-animate to recommended path on mount
  useEffect(() => {
    if (recommendedPath) {
      const timer = setTimeout(() => {
        const pathMap: Record<string, 'pull' | 'dont-pull' | 'safeguards'> = {
          'Pull the Lever (Full Implementation)': 'pull',
          'Pull with Safeguards': 'safeguards',
          "Don't Pull (Status Quo)": 'dont-pull',
        };
        // Match partial strings
        const key = Object.keys(pathMap).find(k =>
          recommendedPath.toLowerCase().includes(k.toLowerCase().slice(0, 10))
        );
        if (key) {
          setSelectedPath(pathMap[key]);
        } else if (recommendedPath.toLowerCase().includes('safeguard') || recommendedPath.toLowerCase().includes('care')) {
          setSelectedPath('safeguards');
        } else if (recommendedPath.toLowerCase().includes('pull') && !recommendedPath.toLowerCase().includes("don't")) {
          setSelectedPath('pull');
        } else {
          setSelectedPath('dont-pull');
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [recommendedPath]);

  const handlePathClick = (path: 'pull' | 'dont-pull' | 'safeguards') => {
    setSelectedPath(path);
    setAnimationComplete(false);
    onPathSelect(path);
  };

  // Trolley position along the selected path
  const getTrolleyPosition = () => {
    if (!selectedPath) return { x: 0, y: 0 };
    switch (selectedPath) {
      case 'pull': return { x: 340, y: -80 };
      case 'dont-pull': return { x: 380, y: 0 };
      case 'safeguards': return { x: 340, y: 80 };
      default: return { x: 0, y: 0 };
    }
  };

  const pathConfigs = [
    {
      id: 'pull' as const,
      label: 'Implement AI',
      sublabel: 'Pull the Lever',
      color: '#16A34A',
      trackD1: 'M 220 185 C 300 175 380 140 520 110',
      trackD2: 'M 220 195 C 300 185 380 150 520 120',
      endX: 530, endY: 100,
    },
    {
      id: 'dont-pull' as const,
      label: 'Status Quo',
      sublabel: "Don't Pull",
      color: '#2563EB',
      trackD1: 'M 220 185 L 560 185',
      trackD2: 'M 220 195 L 560 195',
      endX: 570, endY: 177,
    },
    {
      id: 'safeguards' as const,
      label: 'With Safeguards',
      sublabel: 'Pull with Care',
      color: '#D97706',
      trackD1: 'M 220 185 C 300 195 380 230 520 260',
      trackD2: 'M 220 195 C 300 205 380 240 520 270',
      endX: 530, endY: 252,
    },
  ];

  const trolleyPos = getTrolleyPosition();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Scene */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-background-alt to-background border border-rail-light">
        <svg
          viewBox="0 0 700 350"
          className="w-full h-auto"
          role="img"
          aria-label="Trolley decision visualization showing three paths"
        >
          {/* Subtle grid/crosshatch pattern */}
          <defs>
            <pattern id="sleepers" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="9" y="0" width="2" height="20" fill="rgba(168,162,158,0.08)" />
            </pattern>
          </defs>
          <rect width="700" height="350" fill="url(#sleepers)" />

          {/* Main track (approach) */}
          <line x1="30" y1="185" x2="220" y2="185" stroke="#A8A29E" strokeWidth="3" />
          <line x1="30" y1="195" x2="220" y2="195" stroke="#A8A29E" strokeWidth="3" />
          {/* Sleeper ties on main track */}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={40 + i * 18} y="180" width="3" height="20" rx="1" fill="rgba(168,162,158,0.3)" />
          ))}

          {/* Fork/switch point */}
          <circle cx="220" cy="190" r="6" fill="#1B4D3E" />
          <circle cx="220" cy="190" r="3" fill="#2A7A5E" />

          {/* Three diverging tracks */}
          {pathConfigs.map((path) => {
            const isSelected = selectedPath === path.id;
            const opacity = selectedPath ? (isSelected ? 1 : 0.3) : 0.7;

            return (
              <g key={path.id}>
                <motion.path
                  d={path.trackD1}
                  stroke={path.color}
                  strokeWidth={isSelected ? 3.5 : 2.5}
                  fill="none"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  d={path.trackD2}
                  stroke={path.color}
                  strokeWidth={isSelected ? 3.5 : 2.5}
                  fill="none"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity }}
                  transition={{ duration: 0.5 }}
                />

                {/* Path label at end */}
                <motion.g
                  animate={{ opacity: selectedPath ? (isSelected ? 1 : 0.3) : 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <rect
                    x={path.endX}
                    y={path.endY}
                    width="130"
                    height="32"
                    rx="8"
                    fill={path.color}
                    fillOpacity={isSelected ? 0.15 : 0.08}
                    stroke={path.color}
                    strokeWidth={isSelected ? 1.5 : 0.5}
                    strokeOpacity={isSelected ? 0.5 : 0.2}
                  />
                  <text
                    x={path.endX + 65}
                    y={path.endY + 20}
                    textAnchor="middle"
                    fill={path.color}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="Source Sans 3, system-ui, sans-serif"
                  >
                    {path.label}
                  </text>
                </motion.g>
              </g>
            );
          })}

          {/* The Trolley */}
          <motion.g
            initial={{ x: 0, y: 0 }}
            animate={{
              x: trolleyPos.x,
              y: trolleyPos.y,
            }}
            transition={{
              duration: selectedPath ? 2.2 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onAnimationComplete={() => {
              if (selectedPath) setAnimationComplete(true);
            }}
          >
            {/* Trolley body */}
            <rect x="55" y="170" width="50" height="28" rx="6" fill="#1B4D3E" />
            {/* Trolley cabin */}
            <rect x="62" y="160" width="36" height="18" rx="4" fill="#2A7A5E" />
            {/* Window */}
            <rect x="68" y="163" width="10" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
            <rect x="82" y="163" width="10" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
            {/* Wheels */}
            <circle cx="70" cy="202" r="6" fill="#57534E" />
            <circle cx="70" cy="202" r="3" fill="#78716C" />
            <circle cx="90" cy="202" r="6" fill="#57534E" />
            <circle cx="90" cy="202" r="3" fill="#78716C" />
          </motion.g>

          {/* Decision label */}
          {!selectedPath && (
            <motion.text
              x="80"
              y="150"
              textAnchor="middle"
              fill="#1B4D3E"
              fontSize="13"
              fontWeight="600"
              fontFamily="Source Sans 3, system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Your Decision
            </motion.text>
          )}
        </svg>
      </div>

      {/* Path selection cards (accessible, mobile-friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {pathConfigs.map((path) => {
          const isSelected = selectedPath === path.id;
          return (
            <motion.button
              key={path.id}
              onClick={() => handlePathClick(path.id)}
              className={`
                relative p-4 rounded-xl border-2 text-left transition-all duration-300
                ${isSelected
                  ? 'border-current shadow-lg'
                  : 'border-rail-light hover:border-current hover:shadow-md'
                }
              `}
              style={{
                color: path.color,
                backgroundColor: isSelected ? `${path.color}10` : 'white',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: path.color }}
                />
                <span className="font-bold text-sm" style={{ color: path.color }}>
                  {path.label}
                </span>
              </div>
              <p className="text-xs text-text-muted">{path.sublabel}</p>
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <svg className="w-5 h-5" fill={path.color} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TrolleyScene;

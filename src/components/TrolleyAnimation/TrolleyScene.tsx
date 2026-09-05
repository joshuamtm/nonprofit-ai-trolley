import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { roadFromLabel } from '../../utils/roadNames';

// The facing point on the panel. One line enters from the left and splits into three roads:
// the diverging road (pull the lever), the crossover (pull with care), and the straight-through
// (don't pull). Each road is drawn as track sections with a lamp. The recommended road lights
// sage, section by section, and stays lit. The straight-through road is never drawn empty: its
// lamps are lit red and labelled with the visitor's own top concerns. Choosing another road to
// read it thickens that road without unlighting the recommendation.
type PathId = 'pull' | 'dont-pull' | 'safeguards';

interface TrolleySceneProps {
  onPathSelect: (path: PathId) => void;
  recommendedPath?: string;
  concerns?: string[];       // labels for the occupied status-quo road
}

const pathFromLabel = roadFromLabel;

const ROADS: { id: PathId; label: string; plain: string; y: number; d: string; lampXs: number[] }[] = [
  { id: 'pull', label: 'Pull the lever', plain: 'the diverging road: adopt AI now', y: 70, d: 'M 260 160 C 320 160 340 70 400 70 L 640 70', lampXs: [430, 490, 550, 610] },
  { id: 'safeguards', label: 'Pull with care', plain: 'the crossover: adopt in stages, with a person checking', y: 115, d: 'M 260 160 C 330 160 350 115 410 115 L 640 115', lampXs: [430, 490, 550, 610] },
  { id: 'dont-pull', label: "Don't pull", plain: 'the straight-through: hold the status quo', y: 160, d: 'M 260 160 L 640 160', lampXs: [330, 400, 470, 540, 610] },
];

const LAMP_COLOR: Record<PathId, string> = { pull: '#14202B', safeguards: '#5E7A5A', 'dont-pull': '#B3261E' };

const TrolleyScene: React.FC<TrolleySceneProps> = ({ onPathSelect, recommendedPath, concerns = [] }) => {
  const reduceMotion = useReducedMotion();
  const recommended = pathFromLabel(recommendedPath);
  const [reading, setReading] = useState<PathId | null>(null);
  const [litCount, setLitCount] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  // On a phone the diagram is wider than the screen. Start it scrolled to the lamps, the
  // road names and the trolley, which is the part that carries the answer; the entering
  // line is a swipe to the left.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth + 8) el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, []);

  // Reveal: the trolley takes the recommended road and its lamps light one by one.
  useEffect(() => {
    if (!recommended) return;
    const road = ROADS.find(r => r.id === recommended)!;
    const t = setTimeout(() => { setReading(recommended); onPathSelect(recommended); }, reduceMotion ? 0 : 500);
    if (reduceMotion) { setLitCount(road.lampXs.length); return () => clearTimeout(t); }
    setLitCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLitCount(i);
      if (i >= road.lampXs.length) clearInterval(id);
    }, 350);
    return () => { clearTimeout(t); clearInterval(id); };
    // onPathSelect is stable for the life of the parent; re-running on it would re-fire the reveal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommended, reduceMotion]);

  const choose = (p: PathId) => { setReading(p); onPathSelect(p); };

  const recRoad = recommended ? ROADS.find(r => r.id === recommended)! : null;
  const trolleyTarget = recRoad ? { x: 560 - 90, y: recRoad.y - 160 } : { x: 0, y: 0 };
  const occupiedLabels = concerns.length ? concerns : ['demand rising, capacity not', 'staff using unapproved tools', 'no policy in place'];

  return (
    <div className="w-full">
      <div ref={scroller} className="diagram-scroll border-2 border-ink bg-paper-light overflow-x-auto">
        <svg viewBox="0 0 800 250" className="w-full h-auto block min-w-[620px]" role="img"
          aria-label={`Track diagram. One line reaches a facing point and splits into three roads: pull the lever, pull with care, and don't pull. ${recRoad ? `The recommended road, ${recRoad.label}, is lit green and the trolley has taken it.` : ''} The don't-pull road is already occupied by: ${occupiedLabels.join(', ')}.`}>
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={40 + i * 24} y={154} width="2" height="12" fill="#6F6B60" opacity="0.5" />
          ))}
          <line x1="30" y1="160" x2="260" y2="160" stroke="#14202B" strokeWidth="2.5" />
          <text x="34" y="184" fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="11" fill="#3E4A55" letterSpacing="1">YOUR ORGANISATION · APPROACH</text>

          <rect x="255" y="155" width="10" height="10" fill="#14202B" />
          <text x="248" y="218" fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="11" fill="#3E4A55" letterSpacing="1">FACING POINT · THE DECISION</text>

          {ROADS.map((r) => {
            const isRec = recommended === r.id;
            const isReading = reading === r.id;
            const isOccupied = r.id === 'dont-pull';
            return (
              <g key={r.id}>
                <path d={r.d} stroke="#14202B" strokeWidth={isReading ? 3.5 : 2} fill="none" />
                {r.lampXs.map((x, i) => {
                  const lit = isRec ? i < litCount : false;
                  const fill = isOccupied ? '#B3261E' : lit ? '#5E7A5A' : '#DCD9CF';
                  return <rect key={x} x={x - 6} y={r.y - 6} width="12" height="12" fill={fill} stroke="#14202B" strokeWidth="1.25" />;
                })}
                <text x="648" y={r.y + 4} fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="12" fontWeight="600" fill="#14202B" letterSpacing="0.5">
                  {r.label.toUpperCase()}
                </text>
                {isRec && (
                  <text x="648" y={r.y - 11} fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="10" fill="#5E7A5A" letterSpacing="1">LINE CLEAR · RECOMMENDED</text>
                )}
                {isReading && !isRec && (
                  <text x="648" y={r.y - 11} fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="10" fill="#14202B" letterSpacing="1">READING THIS ROAD</text>
                )}
              </g>
            );
          })}

          <text x="330" y="182" fontFamily="IBM Plex Mono, ui-monospace, monospace" fontSize="10" fill="#B3261E">
            <tspan x="330" dy="0">occupied · {occupiedLabels.slice(0, 2).join(' · ')}</tspan>
            {occupiedLabels[2] && <tspan x="330" dy="12">· {occupiedLabels[2]}</tspan>}
          </text>

          {/* The trolley: a plain rectangle marked YOU. It takes the recommended road. */}
          <motion.g
            initial={false}
            animate={{ x: trolleyTarget.x, y: trolleyTarget.y }}
            transition={reduceMotion ? { duration: 0 } : { duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <rect x="96" y="147" width="46" height="18" fill="#14202B" />
            <text x="119" y="160" textAnchor="middle" fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="10" fontWeight="600" fill="#E6E4DC" letterSpacing="1">YOU</text>
          </motion.g>

          <text x="30" y="236" fontFamily="IBM Plex Sans Condensed, Arial Narrow, sans-serif" fontSize="10" fill="#3E4A55" letterSpacing="1">
            RED LAMP: SECTION OCCUPIED · GREEN LAMP: LINE CLEAR · GREY: UNLIT · THICK LINE: THE ROAD YOU ARE READING
          </text>
        </svg>
      </div>
      <p className="mt-1 font-mono text-[11px] text-ink-soft sm:hidden">← Swipe left for where the line comes in. The diagram is wider than the screen.</p>

      {/* The three roads as choices: a lamp-coloured rule per road, the one being read in ink. */}
      <div className="mt-3 grid sm:grid-cols-3 gap-2" role="group" aria-label="Choose a road to read its analysis">
        {ROADS.map((r) => {
          const isReading = reading === r.id;
          const isRec = recommended === r.id;
          return (
            <button key={r.id} type="button" onClick={() => choose(r.id)} aria-pressed={isReading}
              style={{ borderLeftColor: LAMP_COLOR[r.id] }}
              className={`text-left border-l-8 border-y border-r border-y-rule border-r-rule px-3 py-2.5 transition-colors ${isReading ? 'bg-ink text-paper' : 'bg-transparent text-ink hover:bg-paper-deep'}`}>
              <span className="block font-display font-semibold uppercase tracking-[0.06em] text-[13px]">
                {r.label}{isRec ? ' · recommended' : ''}
              </span>
              <span className={`block text-[13px] mt-0.5 ${isReading ? 'text-paper' : 'text-ink-soft'}`}>{r.plain}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TrolleyScene;

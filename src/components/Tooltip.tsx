import React from 'react';

interface TooltipProps {
  content: string;
  type?: 'info' | 'why' | 'example';
  children?: React.ReactNode;
}

// Retired as a hover popup: the note is printed under the question instead, which reads on
// a phone and needs no icon. Kept as a component so call sites stay simple.
const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  return <span className="block font-normal normal-case text-[14px] text-ink-soft mt-0.5">{content}</span>;
};

export default Tooltip;

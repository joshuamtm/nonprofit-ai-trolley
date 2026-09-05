import React from 'react';

interface WhyThisMattersProps {
  content: string;
  influences?: string[];
}

// A signaller's note in the margin: what this section changes downstream.
const WhyThisMatters: React.FC<WhyThisMattersProps> = ({ content, influences }) => {
  return (
    <aside className="mt-4 border-l-2 border-ink pl-4">
      <p className="rubric">Why this section matters</p>
      <p className="text-[15px] text-ink-soft mt-1 max-w-[60ch]">{content}</p>
      {influences && influences.length > 0 && (
        <p className="mt-1.5 font-mono text-[12px] text-ink-soft">Shapes: {influences.join(' · ')}</p>
      )}
    </aside>
  );
};

export default WhyThisMatters;

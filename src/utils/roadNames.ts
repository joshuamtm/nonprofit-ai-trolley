// One name per road, everywhere the reader sees it. The analysis engine and the AI advisor
// return titles like "Path 3: Pull with Care (Phased Implementation with Safeguards)" or
// "Pull with Safeguards"; the page, the comparison table and the PDF all print the panel name.
export type RoadId = 'pull' | 'dont-pull' | 'safeguards';

export const ROAD_NAME: Record<RoadId, { label: string; sub: string }> = {
  pull: { label: 'Pull the lever', sub: 'adopt AI now, across the initiative' },
  'dont-pull': { label: "Don't pull", sub: 'hold the status quo' },
  safeguards: { label: 'Pull with care', sub: 'adopt in stages, with safeguards' },
};

export function roadFromLabel(label?: string): RoadId | null {
  if (!label) return null;
  const l = label.toLowerCase();
  if (l.includes('safeguard') || l.includes('care') || l.includes('phased')) return 'safeguards';
  if (l.includes("don't") || l.includes('dont') || l.includes('status quo') || l.includes('maintain')) return 'dont-pull';
  if (l.includes('pull') || l.includes('implement')) return 'pull';
  return null;
}

// The panel name for any engine title; falls back to the title with its "Path N:" prefix removed.
export function roadName(label?: string): string {
  const id = roadFromLabel(label);
  if (id) return ROAD_NAME[id].label;
  return (label || '').replace(/^Path\s*\d+\s*:\s*/i, '');
}

// Plan items arrive from several templates; some carry their own "Week 1:" or "Month 2:"
// prefix. The column heading already says when, so the prefix is stripped.
export function unprefixPlanItem(item: string): string {
  return item.replace(/^(weeks?|months?|days?)\s*[\d\s\-–to]+\s*:\s*/i, '').replace(/^\s*[a-z]/, (c) => c.toUpperCase());
}

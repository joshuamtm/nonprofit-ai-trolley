/** @type {import('tailwindcss').Config} */
// Visual system: "Section Occupied" (a signal box track-circuit diagram, redrawn as a printed
// working document). Chosen 2026-09-05 via MTM Wild Mode; see
// ~/.claude/skills/CORE/references/reference_design_modes.md
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#E6E4DC',        // grey panel paper
        'paper-deep': '#DCD9CF', // a shade down: carbon strip, unlit lamps
        'paper-light': '#EFEDE6',
        ink: '#14202B',          // blue-black ink (also the carbon)
        'ink-soft': '#3E4A55',   // secondary text, AA on paper
        signal: '#B3261E',       // occupied / chosen lamp, warnings; fills and large text only
        sage: '#5E7A5A',         // line clear; fills only, never small text
        rule: '#6F6B60',         // hairlines
        // Legacy aliases still referenced in a few places; mapped onto the system.
        primary: '#14202B',
        secondary: '#B3261E',
        background: '#E6E4DC',
        textDark: '#14202B',
        'text-muted': '#3E4A55',
      },
      fontFamily: {
        display: ['"IBM Plex Sans Condensed"', 'Arial Narrow', 'sans-serif'],
        serif: ['Spectral', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(28px, 4.2vw, 46px)', { lineHeight: '1.05', letterSpacing: '0.005em' }],
        'heading': ['clamp(22px, 2.4vw, 30px)', { lineHeight: '1.15' }],
        'rubric': ['12px', { lineHeight: '1.2', letterSpacing: '0.12em' }],
      },
      maxWidth: { panel: '820px' },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

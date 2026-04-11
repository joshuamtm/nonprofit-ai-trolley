/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — warm charcoal + cream foundation
        primary: '#1B4D3E',        // Deep forest/signal green
        'primary-light': '#2A7A5E', // Lighter green for hover
        'primary-dark': '#143A2F',  // Darker green for active
        secondary: '#C4572A',       // Warm terracotta/signal
        background: '#FAF7F2',      // Warm cream
        'background-alt': '#F0EBE3', // Slightly deeper cream
        textDark: '#1C1917',        // Warm near-black
        'text-muted': '#78716C',    // Stone muted text

        // Signal colors for the three paths
        'signal-green': '#16A34A',  // Path 1: Implement
        'signal-blue': '#2563EB',   // Path 2: Status Quo
        'signal-amber': '#D97706',  // Path 3: With Safeguards

        // Track/rail accent
        'rail': '#A8A29E',          // Stone/steel gray
        'rail-dark': '#57534E',     // Dark rail
        'rail-light': '#D6D3D1',    // Light rail/sleeper

        // Surface colors
        'surface': '#FFFFFF',
        'surface-warm': '#FEFDFB',
        'surface-elevated': '#FFFFFF',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subtitle': ['1.25rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(28, 25, 23, 0.06), 0 4px 12px rgba(28, 25, 23, 0.04)',
        'card-hover': '0 2px 8px rgba(28, 25, 23, 0.08), 0 8px 24px rgba(28, 25, 23, 0.06)',
        'elevated': '0 4px 16px rgba(28, 25, 23, 0.08), 0 12px 32px rgba(28, 25, 23, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      animation: {
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.6s ease-out',
        'track-pulse': 'trackPulse 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        trackPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

# The Nonprofit AI Trolley Problem

**Live:** https://nonprofit-ai-trolley.mtmapps.now/

A free tool from [Meet the Moment](https://mtm.now) for nonprofit leaders, consultants and academics. Five short sections about your organisation, the AI initiative you are weighing, what worries you, and how ready you are. At the end: three roads with real trade-offs, a recommendation with the reasoning written out, and a PDF for your board.

The point of the tool is the one the trolley problem makes: **not pulling the lever is also a choice, and the trolley keeps moving.** Holding the status quo has costs, and the tool names them for your situation.

## The three roads

| Road | What it means |
|---|---|
| **Pull the lever** | Adopt AI now, across the initiative, accepting the risks for the fastest gain |
| **Don't pull** | Hold the status quo. Drawn as an occupied section, labelled with the visitor's own top concerns |
| **Pull with care** | Adopt in stages: a bounded pilot, a person checking, a baseline, and a stop rule |

## Design: "Section Occupied"

The site is drawn as a signal-box track-circuit diagram redrawn as a printed working document. Grey panel paper, condensed capitals for rubrics, Spectral for the questions, mono for the register entries. The five sections light on the track strip as you pass through them. Concerns are rated on lamp rows. The analysis is a facing point: the recommended road lights sage and the trolley takes it; the "don't pull" road is lit red and labelled with what is already on it. A carbon-duplicate strip at the foot carries the answers into the PDF.

The look came out of the Wild Mode design process (September 2026): a four-question brief, five externally seeded design concepts, one chosen, and two rounds with a screenshot-only design critic. Details of that process live in the MTM design-modes module, not in this repo.

## How the recommendation is written

1. The completed assessment is posted to a Netlify function (`netlify/functions/analyze.ts`), which asks Claude (Haiku 4.5) to write the three-road analysis under evidence rules: no invented percentages, budgets as planning bands, specific inaction risks, frameworks by their current names.
2. If the advisor cannot be reached, a template engine (`src/utils/enhancedAnalysisGenerator.ts`) writes the same structure from the answers. The page says which one you got.
3. The PDF is generated in the browser with `@react-pdf/renderer`. Nothing is uploaded; nothing is stored.

Evidence behind the "what standing still costs" claims and the framework table is on the method page (`/methodology`), with sources dated September 2026.

## Tech stack

- Create React App (react-scripts 5) with TypeScript
- Tailwind CSS 3 with `@tailwindcss/forms`
- Framer Motion for the reveal on the facing point
- React Hook Form
- `@react-pdf/renderer` for the board PDF
- Netlify: static build plus one function

## Running it locally

```bash
npm ci
BROWSER=none npm start          # http://localhost:3000
CI=true npm run build           # production build; warnings are errors
```

The AI advisor needs `ANTHROPIC_API_KEY` in the Netlify site environment. Locally, without `netlify dev`, the page falls back to the template engine and says so.

## Project structure

```
src/
  components/
    AssessmentFlow.tsx        Nameplate, track strip, section routing, carbon strip
    WelcomeSection.tsx        Hero, evidence, briefing film, what you leave with
    SectionStrip.tsx          The five track sections
    LampScale.tsx             1 to 5 lamp rating row
    CarbonStrip.tsx           Answers carried at the foot; top concerns for the diagram
    ComparisonView.tsx        Three roads side by side, as a ledger
    MethodologyPage.tsx       Method, evidence, frameworks and law, sources
    QuestionFlow/             Sections 1 to 4 and the analysis (EnhancedReviewStep)
    TrolleyAnimation/         The facing-point diagram (TrolleyScene)
  utils/
    enhancedAnalysisGenerator.ts   Template engine (fallback)
    recommendationTemplates.ts     Concern-specific plan items
    roadNames.ts                   One name per road, everywhere
    pdfReport.tsx                  The board PDF
netlify/functions/analyze.ts       The AI advisor
```

## Licence and attribution

Proprietary. Built by Meet the Moment for the Human-Centered AI course for nonprofit professionals and released free for public use. The briefing film is "Cat Trolley Problem" by Answer in Progress, embedded from YouTube.

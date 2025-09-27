# The Nonprofit AI Trolley Problem

An interactive ethical framework tool to help nonprofits evaluate AI implementation decisions through a risk-benefit analysis.

## Overview

This application provides a structured, neutral framework for nonprofits to evaluate AI initiatives through guided questions, resulting in a clear three-path analysis with actionable insights. It's designed for use in human-centered AI courses and organizational decision-making processes.

## Features

- **5-Minute Assessment**: Quick, guided questionnaire covering organizational context, AI initiatives, concerns, and readiness
- **Interactive Trolley Animation**: Visual representation of three decision paths
- **Comprehensive PDF Reports**: Downloadable analysis with benefits, risks, and mitigation strategies for each path
- **Three-Path Framework**:
  - Path 1: Implement AI (Pull the Lever)
  - Path 2: Maintain Status Quo (Don't Pull)
  - Path 3: Implement with Safeguards (Pull with Care)

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **PDF Generation**: jsPDF
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nonprofit-ai-trolley.git

# Navigate to project directory
cd nonprofit-ai-trolley

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
# Create production build
npm run build

# Deploy to Netlify (if configured)
netlify deploy --prod --dir=build
```

## Usage

1. **Start the Assessment**: Users begin with organizational context questions
2. **Describe AI Initiative**: Specify the type and goals of the AI implementation
3. **Rate Concerns**: Evaluate concerns on a 1-5 scale
4. **Provide Context**: Share current capacity and stakeholder readiness
5. **Review & Generate**: Explore the trolley animation and generate a PDF report

## Report Structure

The generated PDF includes:
- Executive summary with organizational context
- Detailed analysis of all three paths
- Risk mitigation strategies
- Implementation recommendations
- Next steps and discussion questions
- Additional resources

## Development

### Project Structure

```
src/
  components/
    QuestionFlow/     # Multi-step form components
    TrolleyAnimation/ # Interactive decision visualization
    ProgressBar.tsx   # Progress indicator
  utils/
    analysisGenerator.ts  # Logic for generating recommendations
    pdfGenerator.ts      # PDF report creation
  types/              # TypeScript type definitions
```

### Key Components

- **StepOne-StepFour**: Question flow components
- **ReviewStep**: Final review with trolley animation
- **TrolleyScene**: Interactive SVG animation
- **ProgressBar**: Visual progress indicator

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is proprietary and intended for educational use within nonprofit AI training programs.

## Acknowledgments

Built for the Human-Centered AI Course for Nonprofit Professionals
Developed by Meet the Moment (MTM)

## Support

For questions or support, please contact the course instructors or open an issue in the repository.

---

*Empowering nonprofits to make ethical AI decisions with confidence*
import { SessionData, PathAnalysis } from '../types';

export const generateAnalysis = (data: SessionData): {
  pullLever: PathAnalysis;
  dontPull: PathAnalysis;
  withSafeguards: PathAnalysis;
} => {
  const highConcerns = Object.entries(data.primaryConcerns)
    .filter(([_, value]) => value >= 4)
    .map(([key, _]) => key);

  const pullLever: PathAnalysis = {
    title: 'Path 1: Pull the Lever (Implement AI)',
    benefits: generateBenefits(data),
    risks: generateRisks(data, highConcerns),
    recommendations: [
      'Start with a limited pilot program',
      'Establish clear metrics for success',
      'Maintain human oversight at all stages'
    ],
    criticalFactors: [
      'Adequate training for all staff involved',
      'Clear communication with stakeholders',
      'Sufficient budget for implementation and maintenance'
    ]
  };

  const dontPull: PathAnalysis = {
    title: 'Path 2: Don\'t Pull the Lever (Status Quo)',
    benefits: [
      'Avoids potential AI-related risks',
      'Maintains current trust and relationships',
      'No additional resource investment required',
      'Preserves existing workflows and processes'
    ],
    risks: [
      'Continued operational inefficiencies',
      'Inability to scale services to meet demand',
      'Risk of falling behind sector standards',
      'Potential staff burnout from manual processes'
    ],
    opportunityCosts: generateOpportunityCosts(data),
    recommendations: [
      'Explore alternative non-AI solutions',
      'Increase staff capacity through hiring',
      'Optimize existing processes'
    ]
  };

  const withSafeguards: PathAnalysis = {
    title: 'Path 3: Pull Lever with Safeguards (Responsible Implementation)',
    benefits: generateBenefits(data),
    risks: generateRisks(data, highConcerns),
    mitigationStrategies: generateMitigationStrategies(highConcerns, data),
    recommendations: [
      'Implement a phased rollout with clear checkpoints',
      'Establish an ethics review committee',
      'Create transparent communication channels',
      'Develop fallback plans for each phase'
    ]
  };

  return { pullLever, dontPull, withSafeguards };
};

const generateBenefits = (data: SessionData): string[] => {
  const benefits: string[] = [];

  const outcomeMap: { [key: string]: string } = {
    'serve_more': 'Significantly increase the number of beneficiaries served',
    'reduce_time': 'Dramatically reduce response times for critical services',
    'improve_quality': 'Enhance decision-making quality through data-driven insights',
    'free_staff': 'Free up staff time for high-value human interactions',
    'reduce_costs': 'Reduce operational costs allowing more resources for programs',
    'increase_access': 'Improve accessibility for underserved populations',
    'generate_insights': 'Uncover new insights from existing data'
  };

  data.expectedOutcomes.forEach(outcome => {
    if (outcomeMap[outcome]) {
      benefits.push(outcomeMap[outcome]);
    }
  });

  if (data.currentCapacity === 'overwhelmed') {
    benefits.push('Alleviate critical capacity constraints');
  }

  if (data.problemUrgency === 'critical') {
    benefits.push('Address urgent operational needs');
  }

  return benefits;
};

const generateRisks = (data: SessionData, highConcerns: string[]): string[] => {
  const risks: string[] = [];

  const concernMap: { [key: string]: string } = {
    'environmentalImpact': 'Increased carbon footprint from AI computing resources',
    'jobDisplacement': 'Potential displacement of staff roles',
    'ethicalBias': 'Risk of algorithmic bias affecting vulnerable populations',
    'dataPrivacy': 'Data privacy and security vulnerabilities',
    'humanDignity': 'Reduction in human-centered service delivery',
    'accuracyErrors': 'Potential for harmful errors in critical decisions',
    'techDependency': 'Over-reliance on technology systems'
  };

  highConcerns.forEach(concern => {
    if (concernMap[concern]) {
      risks.push(concernMap[concern]);
    }
  });

  if (data.stakeholderReadiness === 'resistant') {
    risks.push('Significant resistance from staff and stakeholders');
  }

  if (data.biggestFears && data.biggestFears.includes('harm_beneficiaries')) {
    risks.push('Potential harm to vulnerable beneficiaries if system fails');
  }

  return risks;
};

const generateOpportunityCosts = (data: SessionData): string[] => {
  const costs: string[] = [];

  if (data.currentCapacity === 'overwhelmed') {
    costs.push('Continued inability to meet critical demand');
  }

  data.expectedOutcomes.forEach(outcome => {
    if (outcome === 'serve_more') {
      costs.push('Missed opportunity to expand service reach');
    }
    if (outcome === 'generate_insights') {
      costs.push('Lost insights that could improve programs');
    }
  });

  costs.push('Risk of becoming less competitive for funding');
  costs.push('Potential staff burnout from unsustainable workload');

  return costs;
};

const generateMitigationStrategies = (highConcerns: string[], data: SessionData): string[] => {
  const strategies: string[] = [];

  highConcerns.forEach(concern => {
    switch(concern) {
      case 'environmentalImpact':
        strategies.push('Partner with green hosting providers and offset carbon emissions');
        break;
      case 'jobDisplacement':
        strategies.push('Retrain staff for new AI-augmented roles');
        break;
      case 'ethicalBias':
        strategies.push('Implement bias testing and regular audits');
        break;
      case 'dataPrivacy':
        strategies.push('Establish robust data governance and security protocols');
        break;
      case 'humanDignity':
        strategies.push('Maintain human decision-makers for sensitive cases');
        break;
      case 'accuracyErrors':
        strategies.push('Implement human review for all critical decisions');
        break;
      case 'techDependency':
        strategies.push('Maintain manual fallback processes');
        break;
    }
  });

  if (data.stakeholderReadiness === 'resistant' || data.stakeholderReadiness === 'skeptical') {
    strategies.push('Develop comprehensive change management program');
  }

  strategies.push('Create transparent reporting on AI impact and outcomes');
  strategies.push('Establish clear escalation paths for edge cases');

  return strategies;
};
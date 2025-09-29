import { SessionData, RecommendationTemplate } from '../types';

export const recommendationTemplates: RecommendationTemplate[] = [
  // Change Management Templates
  {
    id: 'resistant-stakeholders',
    category: 'change-management',
    condition: (data: SessionData) => data.stakeholderReadiness === 'resistant',
    recommendations: [
      'Implement a comprehensive change management program with focus on early wins',
      'Create stakeholder engagement workshops to address concerns directly',
      'Develop a champion network within each department',
      'Establish transparent feedback loops and regular town halls'
    ],
    actionItems: [
      'Week 1-2: Conduct stakeholder mapping and influence analysis',
      'Week 3-4: Host initial listening sessions with key resistors',
      'Month 2: Launch pilot with volunteer early adopters',
      'Month 3: Share success stories and measurable wins'
    ],
    resources: [
      'Change management consultant or facilitator',
      'Internal communications specialist',
      'Training budget for workshops',
      'Time allocation for staff participation'
    ]
  },

  {
    id: 'skeptical-stakeholders',
    category: 'change-management',
    condition: (data: SessionData) => data.stakeholderReadiness === 'skeptical',
    recommendations: [
      'Build trust through transparency and small wins',
      'Provide evidence-based case studies from similar organizations',
      'Create opt-in pilot programs for interested teams',
      'Establish clear success metrics and regular reporting'
    ],
    actionItems: [
      'Week 1: Share relevant case studies and ROI data',
      'Week 2-3: Identify and engage potential champions',
      'Month 2: Launch voluntary pilot program',
      'Monthly: Publish progress reports with metrics'
    ],
    resources: [
      'Case study documentation',
      'Metrics tracking system',
      'Communications budget',
      'Pilot program resources'
    ]
  },

  // Budget-Conscious Templates
  {
    id: 'limited-budget',
    category: 'budget',
    condition: (data: SessionData) =>
      data.currentCapacity === 'limited' ||
      data.organizationType === 'grassroots',
    recommendations: [
      'Start with free or low-cost AI tools (e.g., Google AI, open-source models)',
      'Apply for technology grants from major tech companies',
      'Partner with local universities for pro-bono support',
      'Implement in phases to spread costs over time'
    ],
    actionItems: [
      'Week 1: Research and test free AI tools',
      'Week 2: Apply for Google.org, Microsoft, or AWS nonprofit grants',
      'Week 3: Reach out to local university computer science departments',
      'Month 2: Create phased budget proposal for board'
    ],
    resources: [
      'Grant writing support',
      'Technical volunteer coordinator',
      'Open-source tool documentation',
      'Phased implementation plan template'
    ]
  },

  // Data Privacy Focus
  {
    id: 'high-privacy-concern',
    category: 'privacy',
    condition: (data: SessionData) =>
      data.primaryConcerns.dataPrivacy >= 4 ||
      !!(data.topThreeConcerns && data.topThreeConcerns.includes('dataPrivacy')),
    recommendations: [
      'Implement privacy-preserving AI techniques (federated learning, differential privacy)',
      'Establish comprehensive data governance framework',
      'Conduct privacy impact assessments for each AI use case',
      'Use on-premise or private cloud solutions when possible'
    ],
    actionItems: [
      'Week 1: Conduct data audit and classification',
      'Week 2-3: Develop data governance policy',
      'Month 2: Implement encryption and access controls',
      'Month 3: Complete privacy impact assessment'
    ],
    resources: [
      'Data privacy consultant',
      'Legal review budget',
      'Privacy-preserving tech tools',
      'Staff training on data handling'
    ]
  },

  // Bias Mitigation Templates
  {
    id: 'high-bias-concern',
    category: 'ethics',
    condition: (data: SessionData) =>
      data.primaryConcerns.ethicalBias >= 4 ||
      !!(data.topThreeConcerns && data.topThreeConcerns.includes('ethicalBias')),
    recommendations: [
      'Implement bias testing protocols at each stage',
      'Ensure diverse representation in AI development team',
      'Use explainable AI models for transparency',
      'Establish ethics review committee with community representation'
    ],
    actionItems: [
      'Week 1: Form diverse AI ethics committee',
      'Week 2: Define bias testing protocols',
      'Month 2: Conduct initial bias audit',
      'Quarterly: Regular bias testing and reporting'
    ],
    resources: [
      'AI ethics expert or consultant',
      'Bias testing tools (e.g., AI Fairness 360)',
      'Community engagement budget',
      'Training on algorithmic bias'
    ]
  },

  // Job Displacement Concerns
  {
    id: 'job-displacement-concern',
    category: 'workforce',
    condition: (data: SessionData) =>
      data.primaryConcerns.jobDisplacement >= 4 ||
      !!(data.topThreeConcerns && data.topThreeConcerns.includes('jobDisplacement')),
    recommendations: [
      'Commit to no involuntary layoffs due to AI implementation',
      'Develop comprehensive reskilling and upskilling programs',
      'Redefine roles to focus on human-centered tasks',
      'Create new positions for AI oversight and management'
    ],
    actionItems: [
      'Week 1: Issue public commitment to workforce',
      'Week 2-3: Assess current skills and future needs',
      'Month 2: Launch training program enrollment',
      'Month 3: Begin role transition planning'
    ],
    resources: [
      'Professional development budget',
      'Training platform or partner',
      'HR consultant for role redesign',
      'Staff time for training'
    ]
  },

  // Human Dignity Preservation
  {
    id: 'human-dignity-concern',
    category: 'ethics',
    condition: (data: SessionData) =>
      data.primaryConcerns.humanDignity >= 4 ||
      !!(data.topThreeConcerns && data.topThreeConcerns.includes('humanDignity')),
    recommendations: [
      'Maintain human decision-makers for all sensitive cases',
      'Implement "human in the loop" for all beneficiary-facing decisions',
      'Create clear appeal and review processes',
      'Preserve personal interaction options at every touchpoint'
    ],
    actionItems: [
      'Week 1: Map all beneficiary touchpoints',
      'Week 2: Define "sensitive case" criteria',
      'Week 3: Design appeal process workflow',
      'Month 2: Train staff on new hybrid processes'
    ],
    resources: [
      'Service design consultant',
      'Beneficiary feedback systems',
      'Process documentation tools',
      'Staff training resources'
    ]
  },

  // Technical Readiness
  {
    id: 'low-technical-readiness',
    category: 'technical',
    condition: (data: SessionData) =>
      (data.technicalReadiness && data.technicalReadiness <= 2) ||
      data.currentCapacity === 'overwhelmed',
    recommendations: [
      'Partner with technical assistance providers',
      'Start with pre-built, user-friendly solutions',
      'Invest in basic digital literacy training first',
      'Consider managed services to reduce technical burden'
    ],
    actionItems: [
      'Week 1: Assess current technical capabilities',
      'Week 2: Research managed AI service providers',
      'Week 3: Schedule demos of user-friendly tools',
      'Month 2: Begin basic digital skills training'
    ],
    resources: [
      'Technical assistance provider',
      'Managed service budget',
      'Training resources',
      'IT support augmentation'
    ]
  },

  // Urgent Implementation Needs
  {
    id: 'critical-urgency',
    category: 'timeline',
    condition: (data: SessionData) =>
      data.problemUrgency === 'critical' ||
      data.implementationTimeline === 'immediate',
    recommendations: [
      'Deploy quick-win solutions while planning comprehensive approach',
      'Use proven off-the-shelf solutions initially',
      'Establish rapid decision-making committee',
      'Set up parallel workstreams for immediate and long-term needs'
    ],
    actionItems: [
      'Day 1-3: Form rapid response team',
      'Week 1: Identify and deploy quick wins',
      'Week 2: Begin parallel long-term planning',
      'Week 3-4: Implement initial solutions'
    ],
    resources: [
      'Dedicated project team',
      'Emergency implementation budget',
      'Vendor fast-track agreements',
      'Executive sponsorship'
    ]
  },

  // Scale Considerations
  {
    id: 'organization-wide-impact',
    category: 'scale',
    condition: (data: SessionData) =>
      data.impactScale === 'organization-wide',
    recommendations: [
      'Develop comprehensive governance structure',
      'Create center of excellence for AI',
      'Implement robust change management across all departments',
      'Establish organization-wide training program'
    ],
    actionItems: [
      'Month 1: Establish AI governance committee',
      'Month 2: Design center of excellence structure',
      'Month 3: Launch department-by-department rollout',
      'Ongoing: Monthly all-hands updates'
    ],
    resources: [
      'Executive leadership time',
      'Governance framework consultant',
      'Enterprise training platform',
      'Internal communications team'
    ]
  },

  {
    id: 'pilot-scale',
    category: 'scale',
    condition: (data: SessionData) =>
      data.impactScale === 'pilot',
    recommendations: [
      'Define clear success criteria for pilot',
      'Select representative but low-risk use case',
      'Document lessons learned thoroughly',
      'Plan for scale from the beginning'
    ],
    actionItems: [
      'Week 1: Define pilot scope and success metrics',
      'Week 2: Select pilot team and use case',
      'Month 2-3: Run pilot with close monitoring',
      'Month 4: Evaluate and plan expansion'
    ],
    resources: [
      'Pilot team time allocation',
      'Evaluation framework',
      'Documentation system',
      'Scaling roadmap'
    ]
  },

  // Environmental Impact
  {
    id: 'environmental-concern',
    category: 'sustainability',
    condition: (data: SessionData) =>
      data.primaryConcerns.environmentalImpact >= 4,
    recommendations: [
      'Choose green cloud providers with renewable energy',
      'Implement efficient model selection and optimization',
      'Purchase carbon offsets for AI compute usage',
      'Monitor and report on environmental impact'
    ],
    actionItems: [
      'Week 1: Audit current and projected compute needs',
      'Week 2: Research green hosting options',
      'Month 2: Implement carbon tracking',
      'Quarterly: Purchase carbon offsets'
    ],
    resources: [
      'Green IT consultant',
      'Carbon offset budget',
      'Environmental impact tracking tools',
      'Sustainable tech partnerships'
    ]
  }
];

export function getRelevantRecommendations(
  data: SessionData,
  category?: string
): RecommendationTemplate[] {
  return recommendationTemplates.filter(template => {
    const matchesCondition = template.condition(data);
    const matchesCategory = !category || template.category === category;
    return matchesCondition && matchesCategory;
  });
}

export function generatePersonalizedRecommendations(data: SessionData): {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
} {
  const relevant = getRelevantRecommendations(data);

  const immediate: string[] = [];
  const shortTerm: string[] = [];
  const longTerm: string[] = [];

  relevant.forEach(template => {
    // Extract immediate actions (Week 1-2)
    template.actionItems.forEach(item => {
      if (item.includes('Week 1') || item.includes('Day')) {
        immediate.push(item);
      } else if (item.includes('Week') || item.includes('Month 2')) {
        shortTerm.push(item);
      } else {
        longTerm.push(item);
      }
    });
  });

  return {
    immediate: immediate.slice(0, 5), // Limit to top 5
    shortTerm: shortTerm.slice(0, 5),
    longTerm: longTerm.slice(0, 5)
  };
}
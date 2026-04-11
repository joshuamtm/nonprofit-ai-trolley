export interface SessionData {
  // Step 1: Context
  organizationType: string;
  organizationSize: string; // small (<$2M), medium ($2M-$15M), large ($15M+)
  organizationMission: string;
  otherChallenges?: string;

  // Step 2: AI Initiative
  aiInitiativeTypes: string[];
  initiativeDescription: string;
  expectedOutcomes: string[];
  implementationTimeline?: string;
  impactScale?: string;
  explorationStage?: string; // 'exploring' | 'evaluating' | 'ready'

  // Step 3: Concerns
  primaryConcerns: {
    environmentalImpact: number;
    jobDisplacement: number;
    ethicalBias: number;
    dataPrivacy: number;
    humanDignity: number;
    accuracyErrors: number;
    techDependency: number;
  };
  topThreeConcerns?: string[];
  otherConcerns?: string;
  biggestFears: string[];
  worstCaseScenario?: string;

  // Step 4: Context & Readiness
  currentCapacity: string;
  problemUrgency: string; // 'critical' | 'important' | 'exploratory'
  stakeholderReadiness: string; // 'eager' | 'cautious' | 'skeptical' | 'resistant'
  technicalReadiness: number; // 1-5 scale
  changeManagementCapacity: number; // 1-5 scale
  ethicalFrameworkMaturity: number; // 1-5 scale
  dataGovernanceStatus: number; // 1-5 scale
}

export interface PathAnalysis {
  title: string;
  benefits: string[];
  risks: string[];
  recommendations: string[];
  criticalFactors?: string[];
  opportunityCosts?: string[];
  mitigationStrategies?: string[];
  // New fields for comprehensive recommendations
  actionPlan30Days?: string[];
  actionPlan60Days?: string[];
  actionPlan90Days?: string[];
  budgetEstimates?: {
    initial: string;
    ongoing: string;
    total: string;
  };
  requiredResources?: {
    skills: string[];
    tools: string[];
    partnerships: string[];
  };
  successMetrics?: string[];
  redFlags?: string[];
  mitigationPlaybook?: MitigationStrategy[];
  impactScore?: number; // Comparative impact score
  tradeOffSummary?: {
    gains: string[];
    losses: string[];
  };
}

export interface MitigationStrategy {
  concern: string;
  strategy: string;
  timeframe: string;
  resources: string[];
}

export interface ComparisonData {
  criteria: string;
  pullLever: string | number;
  dontPull: string | number;
  withSafeguards: string | number;
}

export interface RecommendationTemplate {
  id: string;
  category: string;
  condition: (data: SessionData) => boolean;
  recommendations: string[];
  actionItems: string[];
  resources: string[];
}

export interface PersonalizationScore {
  category: string;
  weight: number;
  value: number;
  influence: string;
}
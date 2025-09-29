export interface SessionData {
  // Step 1: Context
  organizationType: string;
  organizationMission: string;
  otherChallenges?: string; // New: optional free text for other challenges

  // Step 2: AI Initiative
  aiInitiativeTypes: string[];
  initiativeDescription: string;
  expectedOutcomes: string[];
  implementationTimeline?: string; // New: immediate/6 months/1 year+
  impactScale?: string; // New: pilot/department/organization-wide

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
  topThreeConcerns?: string[]; // New: ranked top 3 concerns
  otherConcerns?: string; // New: free text for other concerns
  biggestFears: string[];
  worstCaseScenario?: string; // New: specific scenario question

  // Step 4: Context & Readiness
  currentCapacity: string;
  problemUrgency: string;
  stakeholderReadiness: string;
  // New readiness assessment fields
  technicalReadiness?: number; // 1-5 scale
  changeManagementCapacity?: number; // 1-5 scale
  ethicalFrameworkMaturity?: number; // 1-5 scale
  dataGovernanceStatus?: number; // 1-5 scale
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
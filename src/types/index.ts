export interface SessionData {
  // Step 1: Context
  organizationType: string;
  organizationMission: string;

  // Step 2: AI Initiative
  aiInitiativeTypes: string[];
  initiativeDescription: string;
  expectedOutcomes: string[];

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
  biggestFears: string[];

  // Step 4: Context
  currentCapacity: string;
  problemUrgency: string;
  stakeholderReadiness: string;
}

export interface PathAnalysis {
  title: string;
  benefits: string[];
  risks: string[];
  recommendations: string[];
  criticalFactors?: string[];
  opportunityCosts?: string[];
  mitigationStrategies?: string[];
}
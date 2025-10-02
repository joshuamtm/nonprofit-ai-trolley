import {
  SessionData,
  PathAnalysis,
  PersonalizationScore,
  MitigationStrategy,
} from "../types";
import {
  getRelevantRecommendations,
  generatePersonalizedRecommendations,
} from "./recommendationTemplates";

export class EnhancedAnalysisGenerator {
  private data: SessionData;
  private scores: PersonalizationScore[];

  constructor(data: SessionData) {
    this.data = data;
    this.scores = this.calculateScores();
  }

  private calculateScores(): PersonalizationScore[] {
    const scores: PersonalizationScore[] = [];

    // Risk Aversion Score
    const riskConcerns = [
      "ethicalBias",
      "dataPrivacy",
      "humanDignity",
      "accuracyErrors",
    ];
    const riskScore =
      riskConcerns.reduce((sum, concern) => {
        return (
          sum +
          (this.data.primaryConcerns[
            concern as keyof typeof this.data.primaryConcerns
          ] || 0)
        );
      }, 0) /
      (riskConcerns.length * 5);

    scores.push({
      category: "risk-aversion",
      weight: 0.3,
      value: riskScore,
      influence:
        riskScore > 0.6 ? "High caution needed" : "Moderate risk tolerance",
    });

    // Urgency Score
    const urgencyValue =
      this.data.problemUrgency === "critical"
        ? 1.0
        : this.data.problemUrgency === "high"
          ? 0.75
          : this.data.problemUrgency === "moderate"
            ? 0.5
            : 0.25;

    scores.push({
      category: "urgency",
      weight: 0.25,
      value: urgencyValue,
      influence:
        urgencyValue > 0.7
          ? "Fast implementation needed"
          : "Time for careful planning",
    });

    // Readiness Score
    const readinessFactors = [
      this.data.technicalReadiness || 3,
      this.data.changeManagementCapacity || 3,
      this.data.ethicalFrameworkMaturity || 3,
      this.data.dataGovernanceStatus || 3,
    ];
    const readinessScore =
      readinessFactors.reduce((a, b) => a + b) / (readinessFactors.length * 5);

    scores.push({
      category: "readiness",
      weight: 0.25,
      value: readinessScore,
      influence:
        readinessScore > 0.6
          ? "Well-prepared for implementation"
          : "Significant preparation needed",
    });

    // Stakeholder Alignment Score
    const alignmentValue =
      this.data.stakeholderReadiness === "enthusiastic"
        ? 1.0
        : this.data.stakeholderReadiness === "supportive"
          ? 0.75
          : this.data.stakeholderReadiness === "skeptical"
            ? 0.4
            : 0.2;

    scores.push({
      category: "alignment",
      weight: 0.2,
      value: alignmentValue,
      influence:
        alignmentValue > 0.6
          ? "Strong buy-in expected"
          : "Change management critical",
    });

    return scores;
  }

  public generateEnhancedAnalysis(): {
    pullLever: PathAnalysis;
    dontPull: PathAnalysis;
    withSafeguards: PathAnalysis;
    recommendedPath: string;
    rationale: string;
  } {
    const pullLever = this.generatePullLeverAnalysis();
    const dontPull = this.generateDontPullAnalysis();
    const withSafeguards = this.generateSafeguardsAnalysis();

    const { recommendedPath, rationale } = this.determineRecommendedPath();

    return {
      pullLever,
      dontPull,
      withSafeguards,
      recommendedPath,
      rationale,
    };
  }

  private generatePullLeverAnalysis(): PathAnalysis {
    const personalized = generatePersonalizedRecommendations(this.data);

    const analysis: PathAnalysis = {
      title: "Path 1: Pull the Lever (Full AI Implementation)",
      benefits: this.generateDetailedBenefits(),
      risks: this.generateDetailedRisks(),
      recommendations: this.generateContextualRecommendations("aggressive"),
      actionPlan30Days: personalized.immediate,
      actionPlan60Days: personalized.shortTerm,
      actionPlan90Days: personalized.longTerm,
      budgetEstimates: this.estimateBudget("full"),
      requiredResources: this.identifyResources("full"),
      successMetrics: this.defineSuccessMetrics(),
      redFlags: this.identifyRedFlags(),
      impactScore: this.calculateImpactScore("full"),
      tradeOffSummary: {
        gains: [
          "Maximum efficiency gains",
          "Competitive advantage",
          "Scale potential",
          "Data-driven insights",
        ],
        losses: [
          "Higher upfront costs",
          "Greater risk exposure",
          "Potential stakeholder resistance",
          "Complex change management",
        ],
      },
    };

    return analysis;
  }

  private generateDontPullAnalysis(): PathAnalysis {
    return {
      title: "Path 2: Don't Pull (Maintain Status Quo)",
      benefits: [
        "No disruption to current operations",
        "Avoids AI-related risks entirely",
        "No additional investment required",
        "Maintains current stakeholder comfort",
        "Preserves organizational culture",
      ],
      risks: [
        "Continued operational inefficiencies",
        "Growing competitive disadvantage",
        "Staff burnout from manual processes",
        "Inability to scale services",
        "Missed funding opportunities",
      ],
      recommendations: [
        "Optimize current manual processes",
        "Invest in staff training and development",
        "Explore non-AI technology improvements",
        "Focus on incremental improvements",
      ],
      opportunityCosts: this.calculateOpportunityCosts(),
      actionPlan30Days: [
        "Document current process inefficiencies",
        "Survey staff on pain points",
        "Research non-AI alternatives",
      ],
      actionPlan60Days: [
        "Implement process improvements",
        "Increase staffing in critical areas",
        "Develop manual scaling strategies",
      ],
      actionPlan90Days: [
        "Evaluate effectiveness of improvements",
        "Consider revisiting AI decision",
        "Plan for sustainable growth",
      ],
      budgetEstimates: {
        initial: "$0 for AI, potential staff costs",
        ongoing: "Current operational costs + inflation",
        total: "Status quo maintenance costs",
      },
      impactScore: this.calculateImpactScore("none"),
      tradeOffSummary: {
        gains: [
          "Stability and predictability",
          "No transition risks",
          "Cost avoidance",
          "Cultural preservation",
        ],
        losses: [
          "Efficiency gains",
          "Competitive position",
          "Innovation opportunities",
          "Scale potential",
        ],
      },
    };
  }

  private generateSafeguardsAnalysis(): PathAnalysis {
    const mitigationPlaybook = this.generateMitigationPlaybook();
    const personalized = generatePersonalizedRecommendations(this.data);

    return {
      title: "Path 3: Pull with Care (Phased Implementation with Safeguards)",
      benefits: [
        "Balanced risk and reward approach",
        "Time to build stakeholder confidence",
        "Opportunity to learn and adjust",
        "Maintains human oversight",
        "Gradual culture shift",
      ],
      risks: [
        "Slower realization of benefits",
        "Higher long-term costs",
        "Potential for implementation fatigue",
        "Complexity of hybrid systems",
      ],
      recommendations: this.generateContextualRecommendations("cautious"),
      mitigationStrategies: mitigationPlaybook.map((m) => m.strategy),
      mitigationPlaybook,
      actionPlan30Days: [
        "Form AI ethics committee",
        "Develop implementation framework",
        "Identify pilot use case",
        ...personalized.immediate.slice(0, 2),
      ],
      actionPlan60Days: [
        "Launch limited pilot",
        "Establish monitoring systems",
        "Begin staff training",
        ...personalized.shortTerm.slice(0, 2),
      ],
      actionPlan90Days: [
        "Evaluate pilot results",
        "Refine approach based on learnings",
        "Plan next phase expansion",
        ...personalized.longTerm.slice(0, 2),
      ],
      budgetEstimates: this.estimateBudget("phased"),
      requiredResources: this.identifyResources("phased"),
      successMetrics: [
        ...this.defineSuccessMetrics(),
        "Stakeholder satisfaction scores",
        "Ethics compliance rate",
      ],
      redFlags: [
        ...this.identifyRedFlags(),
        "Safeguard complexity overwhelming team",
        "Progress too slow to address urgent needs",
      ],
      impactScore: this.calculateImpactScore("phased"),
      tradeOffSummary: {
        gains: [
          "Risk mitigation",
          "Stakeholder buy-in",
          "Learning opportunity",
          "Ethical alignment",
        ],
        losses: [
          "Speed of implementation",
          "Some efficiency gains",
          "First-mover advantage",
          "Simplicity",
        ],
      },
    };
  }

  private generateDetailedBenefits(): string[] {
    const benefits: string[] = [];

    // Capacity-based benefits
    if (this.data.currentCapacity === "overwhelmed") {
      benefits.push("Immediate relief for overwhelmed staff");
      benefits.push("Ability to handle current backlog efficiently");
    }

    // Outcome-specific benefits
    if (this.data.expectedOutcomes.includes("serve_more")) {
      benefits.push(
        `Serve ${this.data.impactScale === "organization-wide" ? "50-75%" : "25-40%"} more beneficiaries`,
      );
    }

    if (this.data.expectedOutcomes.includes("reduce_time")) {
      benefits.push("Reduce processing time by 60-80%");
    }

    if (this.data.expectedOutcomes.includes("increase_revenue")) {
      benefits.push("Increase fundraising efficiency and donor retention");
      benefits.push("Identify new revenue opportunities through data insights");
    }

    // Scale-based benefits
    if (this.data.impactScale === "organization-wide") {
      benefits.push("Transform organizational capabilities");
      benefits.push("Create competitive advantage in sector");
    }

    return benefits;
  }

  private generateDetailedRisks(): string[] {
    const risks: string[] = [];

    // High concern risks (rated 4 or 5)
    Object.entries(this.data.primaryConcerns).forEach(([concern, rating]) => {
      if (rating >= 4) {
        const riskMap: { [key: string]: string } = {
          ethicalBias:
            "High risk of algorithmic bias affecting vulnerable populations",
          dataPrivacy: "Significant data privacy and security challenges",
          jobDisplacement: "Likely displacement of multiple staff roles",
          humanDignity: "Risk of dehumanizing service delivery",
          accuracyErrors: "Potential for harmful errors in critical decisions",
          environmentalImpact:
            "Substantial carbon footprint from AI operations",
          techDependency: "Dangerous over-reliance on technology",
        };
        if (riskMap[concern]) {
          risks.push(riskMap[concern]);
        }
      }
    });

    // Readiness-based risks
    if (this.data.stakeholderReadiness === "resistant") {
      risks.push(
        "Severe implementation challenges due to stakeholder resistance",
      );
    }

    if (this.data.technicalReadiness && this.data.technicalReadiness <= 2) {
      risks.push("Technical infrastructure gaps may cause failures");
    }

    return risks;
  }

  private generateContextualRecommendations(
    approach: "aggressive" | "cautious",
  ): string[] {
    const recommendations: string[] = [];
    const templates = getRelevantRecommendations(this.data);

    if (approach === "aggressive") {
      recommendations.push("Move quickly to capture first-mover advantages");
      recommendations.push("Invest heavily in change management upfront");
      recommendations.push("Accept calculated risks for greater rewards");
    } else {
      recommendations.push("Prioritize stakeholder buy-in over speed");
      recommendations.push("Build robust safeguards before scaling");
      recommendations.push("Maintain parallel manual processes initially");
    }

    // Add template-based recommendations
    templates.slice(0, 3).forEach((template) => {
      recommendations.push(...template.recommendations.slice(0, 2));
    });

    return recommendations;
  }

  private generateMitigationPlaybook(): MitigationStrategy[] {
    const strategies: MitigationStrategy[] = [];

    // Get top 3 concerns
    const topConcerns =
      this.data.topThreeConcerns ||
      Object.entries(this.data.primaryConcerns)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([key]) => key);

    topConcerns.forEach((concern) => {
      const strategyMap: { [key: string]: MitigationStrategy } = {
        ethicalBias: {
          concern: "Algorithmic Bias",
          strategy:
            "Implement bias testing at each milestone, diverse review team",
          timeframe: "Ongoing, quarterly audits",
          resources: [
            "Bias testing tools",
            "Diverse review committee",
            "External auditor",
          ],
        },
        dataPrivacy: {
          concern: "Data Privacy",
          strategy: "Privacy-by-design approach, encryption, access controls",
          timeframe: "Before launch, continuous monitoring",
          resources: [
            "Privacy consultant",
            "Security tools",
            "Compliance budget",
          ],
        },
        jobDisplacement: {
          concern: "Job Displacement",
          strategy: "No-layoff pledge, comprehensive retraining program",
          timeframe: "6 months before implementation",
          resources: [
            "Training budget",
            "Career counseling",
            "Role redesign consultant",
          ],
        },
        humanDignity: {
          concern: "Human Dignity",
          strategy: "Human-in-the-loop for all beneficiary decisions",
          timeframe: "Built into design phase",
          resources: [
            "Service design expert",
            "Beneficiary feedback system",
            "Appeal process",
          ],
        },
      };

      if (strategyMap[concern]) {
        strategies.push(strategyMap[concern]);
      }
    });

    return strategies;
  }

  private estimateBudget(implementation: "full" | "phased" | "none"): {
    initial: string;
    ongoing: string;
    total: string;
  } {
    const orgSize =
      this.data.organizationType === "large"
        ? 3
        : this.data.organizationType === "medium"
          ? 2
          : 1;

    if (implementation === "full") {
      return {
        initial: `$${orgSize * 50000}-${orgSize * 100000}`,
        ongoing: `$${orgSize * 20000}-${orgSize * 40000}/year`,
        total: `$${orgSize * 150000}-${orgSize * 300000} over 3 years`,
      };
    } else if (implementation === "phased") {
      return {
        initial: `$${orgSize * 20000}-${orgSize * 40000}`,
        ongoing: `$${orgSize * 15000}-${orgSize * 30000}/year`,
        total: `$${orgSize * 80000}-${orgSize * 160000} over 3 years`,
      };
    } else {
      return {
        initial: "$0",
        ongoing: "Current operational costs",
        total: "No additional AI investment",
      };
    }
  }

  private identifyResources(implementation: "full" | "phased"): {
    skills: string[];
    tools: string[];
    partnerships: string[];
  } {
    const resources = {
      skills: [] as string[],
      tools: [] as string[],
      partnerships: [] as string[],
    };

    // Skills needed
    if (implementation === "full") {
      resources.skills = [
        "AI/ML expertise",
        "Data science capabilities",
        "Change management",
        "Project management",
        "Ethics and governance",
      ];
    } else {
      resources.skills = [
        "Basic AI literacy",
        "Project management",
        "Change facilitation",
        "Risk assessment",
      ];
    }

    // Tools needed
    resources.tools =
      implementation === "full"
        ? [
            "Enterprise AI platform",
            "Data management system",
            "Monitoring tools",
            "Training platform",
          ]
        : [
            "Pilot AI tools",
            "Basic analytics",
            "Feedback systems",
            "Documentation platform",
          ];

    // Partnerships
    resources.partnerships =
      implementation === "full"
        ? [
            "AI vendor",
            "Technical consultant",
            "Ethics advisor",
            "Training provider",
          ]
        : [
            "Technical advisor",
            "Pilot vendor",
            "Peer organizations",
            "Academic partner",
          ];

    return resources;
  }

  private defineSuccessMetrics(): string[] {
    const metrics: string[] = [];

    // Outcome-based metrics
    if (this.data.expectedOutcomes.includes("serve_more")) {
      metrics.push("Number of beneficiaries served (target: +40%)");
    }
    if (this.data.expectedOutcomes.includes("reduce_time")) {
      metrics.push("Average processing time (target: -60%)");
    }
    if (this.data.expectedOutcomes.includes("improve_quality")) {
      metrics.push("Decision accuracy rate (target: >95%)");
    }
    if (this.data.expectedOutcomes.includes("increase_revenue")) {
      metrics.push("Revenue growth rate (target: +15-25%)");
      metrics.push("Donor retention rate (target: +10%)");
    }

    // Standard metrics
    metrics.push(
      "Staff satisfaction score",
      "Beneficiary satisfaction rate",
      "Cost per service delivered",
      "Error/incident rate",
    );

    return metrics;
  }

  private identifyRedFlags(): string[] {
    const redFlags: string[] = [];

    // Stakeholder red flags
    if (this.data.stakeholderReadiness === "resistant") {
      redFlags.push("Active sabotage or workarounds by staff");
    }

    // Technical red flags
    redFlags.push("Consistent system errors or downtime");
    redFlags.push("Data quality issues affecting outputs");

    // Ethical red flags
    if (this.data.primaryConcerns.ethicalBias >= 4) {
      redFlags.push("Evidence of discriminatory outcomes");
    }

    // General red flags
    redFlags.push("Beneficiary complaints increasing");
    redFlags.push("Costs exceeding budget by >20%");

    return redFlags;
  }

  private calculateImpactScore(
    implementation: "full" | "phased" | "none",
  ): number {
    const baseScore =
      implementation === "full" ? 85 : implementation === "phased" ? 65 : 20;

    // Adjust based on readiness
    const readinessAdjustment =
      this.scores.find((s) => s.category === "readiness")?.value || 0.5;

    // Adjust based on urgency
    const urgencyBoost = this.data.problemUrgency === "critical" ? 10 : 0;

    return Math.min(100, baseScore * readinessAdjustment + urgencyBoost);
  }

  private calculateOpportunityCosts(): string[] {
    const costs: string[] = [];

    if (this.data.currentCapacity === "overwhelmed") {
      costs.push("Continued inability to meet growing demand");
      costs.push("Risk of staff burnout and turnover");
    }

    if (this.data.expectedOutcomes.includes("generate_insights")) {
      costs.push("Missing valuable insights from data");
    }

    costs.push("Falling behind sector innovation curve");
    costs.push("Reduced competitiveness for funding");

    return costs;
  }

  private determineRecommendedPath(): {
    recommendedPath: string;
    rationale: string;
  } {
    const riskScore =
      this.scores.find((s) => s.category === "risk-aversion")?.value || 0.5;
    const urgencyScore =
      this.scores.find((s) => s.category === "urgency")?.value || 0.5;
    const readinessScore =
      this.scores.find((s) => s.category === "readiness")?.value || 0.5;
    const alignmentScore =
      this.scores.find((s) => s.category === "alignment")?.value || 0.5;

    // Decision logic
    if (urgencyScore > 0.8 && readinessScore > 0.6) {
      return {
        recommendedPath: "Pull the Lever (Full Implementation)",
        rationale:
          "Your critical urgency combined with good organizational readiness suggests moving forward quickly with full implementation while managing risks actively.",
      };
    }

    if (riskScore > 0.7 || alignmentScore < 0.4) {
      if (urgencyScore < 0.5) {
        return {
          recommendedPath: "Don't Pull (Status Quo)",
          rationale:
            "High risk concerns and/or low stakeholder alignment, combined with non-urgent timeline, suggest focusing on preparation before considering AI implementation.",
        };
      } else {
        return {
          recommendedPath: "Pull with Safeguards",
          rationale:
            "Your significant concerns require a careful approach, but the urgency of your needs means you should proceed with robust safeguards and phased implementation.",
        };
      }
    }

    // Default to safeguards approach for most organizations
    return {
      recommendedPath: "Pull with Safeguards",
      rationale:
        "A phased approach with safeguards balances your need for AI benefits with appropriate risk management and stakeholder engagement.",
    };
  }

  public getPersonalizationScores(): PersonalizationScore[] {
    return this.scores;
  }
}

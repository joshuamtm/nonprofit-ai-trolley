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
import { unprefixPlanItem } from "./roadNames";

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

    // Urgency Score (aligned with dropdown: critical/important/exploratory)
    const urgencyValue =
      this.data.problemUrgency === "critical"
        ? 1.0
        : this.data.problemUrgency === "important"
          ? 0.65
          : this.data.problemUrgency === "exploratory"
            ? 0.3
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

    // Readiness Score (now collected from Step 4 instead of defaulting to 3)
    const readinessFactors = [
      this.data.technicalReadiness,
      this.data.changeManagementCapacity,
      this.data.ethicalFrameworkMaturity,
      this.data.dataGovernanceStatus,
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

    // Stakeholder Alignment Score (aligned with dropdown: eager/cautious/skeptical/resistant)
    const alignmentValue =
      this.data.stakeholderReadiness === "eager"
        ? 1.0
        : this.data.stakeholderReadiness === "cautious"
          ? 0.7
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
      actionPlan30Days: personalized.immediate.map(unprefixPlanItem),
      actionPlan60Days: personalized.shortTerm.map(unprefixPlanItem),
      actionPlan90Days: personalized.longTerm.map(unprefixPlanItem),
      budgetEstimates: this.estimateBudget("full"),
      requiredResources: this.identifyResources("full"),
      successMetrics: this.defineSuccessMetrics(),
      redFlags: this.identifyRedFlags(),
      impactScore: this.calculateImpactScore("full"),
      tradeOffSummary: {
        gains: [
          "The fastest route to whatever gain is really there",
          "One decision, one change, instead of a year of pilots",
          "Scale from the start, if the workflow is sound",
          "Early data on what the tools do for your work",
        ],
        losses: [
          "Higher upfront cost, mostly staff time and data clean-up",
          "A wrong output can reach a client before anyone sees it",
          "Staff who were not brought along may resist, quietly",
          "Undoing it is harder once it is everywhere",
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
        "Avoids the risks of a formal AI system (though not of the informal use already happening)",
        "No new investment required this year",
        "Keeps stakeholders comfortable while the evidence base matures",
        "Preserves the way the organization works today",
      ],
      risks: [
        "Staff are probably already using unapproved AI tools; surveys of AI users at work put this near three in four, and holding off does not stop it, it only leaves it ungoverned",
        "Demand keeps rising while capacity does not (in 2025 about half of nonprofits reported rising demand and roughly a third kept pace)",
        "Staff burnout from manual work, which CEP's 2026 survey found at its highest level in three years",
        "The learning gap widens: the organization is no better placed to judge AI next year than it is today",
        "Funders are not yet pushing (only 17 percent of leaders had been engaged by a funder on AI in 2025), so the pressure, when it comes, will arrive later and faster",
      ],
      recommendations: [
        "Adopt an acceptable-use policy and take an inventory of the AI use already happening; holding a use case is not the same as holding organizational learning",
        "Fix the process first: document the bottleneck, its baseline, and what a good outcome would look like",
        "Invest in staff training so the next AI decision is made by people who understand the tools",
        "Set a date to revisit this decision, and name who owns it",
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
          "No transition risk this year",
          "Money kept for the mission",
          "The organization's culture, as it is",
        ],
        losses: [
          "Governance of the AI use that is already happening",
          "Learning while the stakes are low",
          "Staff hours on routine work",
          "Position when funders do start asking",
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
        "Name the people who will own the decision, including one sceptic",
        "Write down the one workflow the pilot covers, and what it must not touch",
        "Take a baseline: how long the work takes today, and how often it goes wrong",
        ...personalized.immediate.slice(0, 1).map(unprefixPlanItem),
      ],
      actionPlan60Days: [
        "Run the pilot with a person checking every output before it reaches anyone",
        "Log errors, near misses and the time saved, weekly",
        "Train the staff on the pilot, including how to say no to the tool",
        ...personalized.shortTerm.slice(0, 1).map(unprefixPlanItem),
      ],
      actionPlan90Days: [
        "Compare the log against the baseline and decide: widen, hold, or stop",
        "Adjust the acceptable use policy from what the pilot taught you",
        "Report to the board with the numbers, not the story",
        ...personalized.longTerm.slice(0, 1).map(unprefixPlanItem),
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
          "A stop rule, so a bad result stays small",
          "Staff and board brought along before the stakes rise",
          "A baseline and a log, which is what a funder will ask for",
          "The chance to learn on one workflow before betting on ten",
        ],
        losses: [
          "Speed: the first months are slower than a full launch",
          "Some of the gains, while the checking step is still in place",
          "The attention of the people who own the pilot",
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

    // Outcome-specific benefits. Evidence note (Sept 2026): published nonprofit gains are
    // real but modest, and the widely repeated "60-80% faster" figure has no nonprofit study
    // behind it. The largest independent sample found (Section/eMarketer, 2026, n=5,000)
    // puts most users' savings under four hours a week. So: name the mechanism, ask for a
    // baseline, and do not promise a percentage.
    if (this.data.expectedOutcomes.includes("serve_more")) {
      benefits.push(
        `Reach more people with the same staff once the workflow is proven${this.data.impactScale === "organization-wide" ? " across the organization" : ""}; measure against your current caseload, and expect modest gains at first`,
      );
    }

    if (this.data.expectedOutcomes.includes("reduce_time")) {
      benefits.push("Reclaim staff time on routine drafting, intake, and case notes; measured gains for most users are under four hours a week, so set a baseline before you start");
    }

    if (this.data.expectedOutcomes.includes("increase_revenue")) {
      benefits.push("Faster grant and appeal drafting, with more time for the relationships that actually raise money");
      benefits.push("Better use of the donor data you already hold, provided it is clean enough to trust");
    }

    // Scale-based benefits
    if (this.data.impactScale === "organization-wide") {
      benefits.push("Build the organization's own judgment about AI before funders or peers force the question");
      benefits.push("One policy, one set of approved tools, and one place to learn from mistakes, instead of forty private experiments");
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
    // Use organizationSize (small/medium/large/enterprise) for budget scaling
    const sizeMultiplier =
      this.data.organizationSize === "enterprise"
        ? 4
        : this.data.organizationSize === "large"
          ? 3
          : this.data.organizationSize === "medium"
            ? 2
            : 1;

    const formatRange = (low: number, high: number) => {
      const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;
      return `${fmt(low)}-${fmt(high)}`;
    };

    // Planning bands only. No independent, nonprofit-specific cost benchmark existed as of
    // September 2026; the published tiers are vendor estimates (small orgs $5K-$25K initial,
    // mid-size $25K-$100K, large $100K-$500K). These bands sit at the lower half of those and
    // assume most of the spend is staff time, data clean-up, training, and review, not licences.
    const band = " (planning band, not a quote)";
    if (implementation === "full") {
      const initLow = sizeMultiplier * 15000;
      const initHigh = sizeMultiplier * 45000;
      const ongoingLow = sizeMultiplier * 8000;
      const ongoingHigh = sizeMultiplier * 20000;
      return {
        initial: formatRange(initLow, initHigh),
        ongoing: `${formatRange(ongoingLow, ongoingHigh)}/year`,
        total: `${formatRange(initLow + ongoingLow * 3, initHigh + ongoingHigh * 3)} over 3 years${band}`,
      };
    } else if (implementation === "phased") {
      const initLow = sizeMultiplier * 8000;
      const initHigh = sizeMultiplier * 25000;
      const ongoingLow = sizeMultiplier * 5000;
      const ongoingHigh = sizeMultiplier * 15000;
      return {
        initial: formatRange(initLow, initHigh),
        ongoing: `${formatRange(ongoingLow, ongoingHigh)}/year`,
        total: `${formatRange(initLow + ongoingLow * 3, initHigh + ongoingHigh * 3)} over 3 years${band}`,
      };
    } else {
      return {
        initial: "$0 for a formal AI system; a policy and an inventory of existing use cost staff time",
        ongoing: "Current operating costs, plus the cost of demand that keeps rising while capacity does not",
        total: "No AI investment, but not no cost",
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
    // Targets are set against the organization's own pre-pilot baseline. Published
    // percentages ("+40%", "-60%") are not supported by nonprofit evidence and are not used.
    if (this.data.expectedOutcomes.includes("serve_more")) {
      metrics.push("People served per month, against a documented pre-pilot baseline");
    }
    if (this.data.expectedOutcomes.includes("reduce_time")) {
      metrics.push("Minutes per case or task, measured before and after, with the review time included");
    }
    if (this.data.expectedOutcomes.includes("improve_quality")) {
      metrics.push("Error and rework rate on AI-assisted work (target: no worse than today, then better)");
    }
    if (this.data.expectedOutcomes.includes("increase_revenue")) {
      metrics.push("Grant and appeal throughput, and the win rate, tracked separately");
      metrics.push("Donor retention year over year (do not attribute change to AI without a comparison group)");
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
          "You rated the need as urgent and your organisation as ready, and your concerns are not the kind that a slower start would settle. Adopt now, with a named owner, a baseline, and a weekly look at what the tools are getting wrong.",
      };
    }

    if (riskScore > 0.7 || alignmentScore < 0.4) {
      if (urgencyScore < 0.5) {
        return {
          recommendedPath: "Don't Pull (Status Quo)",
          rationale:
            "Your concerns rate high, your stakeholders are not with you yet, and nothing in your answers says this must happen this quarter. Hold, but not still: write the acceptable use policy and find out what staff are already using, because that road is already occupied.",
        };
      } else {
        return {
          recommendedPath: "Pull with Safeguards",
          rationale:
            "Your concerns rate high enough that a full launch would carry risks you have not priced yet, and your timeline is too tight to hold. Take one workflow, put a person between the tool and the client, set a stop rule, and widen only when the log says so.",
        };
      }
    }

    // Default to safeguards approach for most organizations
    return {
      recommendedPath: "Pull with Safeguards",
      rationale:
        "Nothing in your answers argues for a full launch or for holding. Most organisations in this position do best on the crossover: a bounded pilot with a baseline, a checking step, and a stop rule, which keeps the gain and keeps the mistakes small.",
    };
  }

  public getPersonalizationScores(): PersonalizationScore[] {
    return this.scores;
  }
}

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

// Simple in-memory rate limiting (per cold start instance)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

const SYSTEM_PROMPT = `You are an expert nonprofit technology advisor helping organizations make informed decisions about AI adoption. You provide balanced, nuanced analysis that respects the complexity of these decisions.

You will receive structured assessment data from a nonprofit organization considering AI implementation. Analyze their specific situation and provide a personalized recommendation.

IMPORTANT GUIDELINES:
- Be specific to their organization type, mission, size, and stated use case
- Reference their actual concerns and readiness levels in your analysis
- All three paths (implement, status quo, phased with safeguards) are legitimate choices — present each with genuine respect
- Budget estimates should be grounded in their organization size
- Action items should be concrete and achievable for a nonprofit
- Use professional but accessible language — no jargon
- Be honest about trade-offs and risks
- Frame the status quo as a valid strategic choice, not a failure

EVIDENCE RULES (September 2026):
- Do not invent percentages. Never write claims like "60-80% faster" or "serve 40% more people"; no nonprofit study supports them. The largest independent sample (2026, n=5,000 knowledge workers) puts most users' time savings under four hours a week. Name the mechanism and tell them to measure against their own baseline.
- Budget figures are planning bands, not quotes; say so. No independent nonprofit cost benchmark exists. Most of the spend is staff time, data clean-up, training, and human review, not licences.
- Inaction has risks too, and they are specific: staff are probably already using unapproved AI tools (surveys of AI users at work put this near three in four), demand is rising faster than capacity (about half of nonprofits in 2025 saw demand rise, roughly a third kept pace), staff burnout is at a three-year high (CEP 2026), and the organization learns nothing while it waits. Funders are NOT yet a strong pressure (only 17 percent of leaders had been engaged by a funder on AI in 2025); do not claim otherwise.
- The status quo path must always recommend an acceptable-use policy and an inventory of existing AI use. Holding a use case is not the same as holding organizational learning.
- Prefer a bounded, reversible pilot with a baseline and a stop rule over a broad rollout. Anything touching eligibility, benefits, employment, health, safeguarding, or sensitive personal data needs human review and an appeal path before it goes live.
- Cite frameworks by their current names: NIST AI Risk Management Framework 1.0 with its Generative AI Profile (2024), ISO/IEC 42001:2023, and the Fundraising.AI framework (updated late 2025).

Respond with ONLY valid JSON matching this exact structure:
{
  "recommendedPath": "Pull the Lever (Full Implementation)" | "Don't Pull (Status Quo)" | "Pull with Care (Phased with Safeguards)",
  "rationale": "2-3 sentence explanation of why this path fits their specific situation",
  "pullLever": {
    "title": "Path 1: Implement AI",
    "benefits": ["4-5 specific benefits based on their use case and org"],
    "risks": ["4-5 specific risks based on their concerns"],
    "recommendations": ["4-5 actionable recommendations"],
    "actionPlan30Days": ["3-4 specific first-month actions"],
    "actionPlan60Days": ["3-4 specific second-month actions"],
    "actionPlan90Days": ["3-4 specific third-month actions"],
    "budgetEstimates": {
      "initial": "$X-$Y",
      "ongoing": "$X-$Y/year",
      "total": "$X-$Y over 3 years"
    },
    "impactScore": 0-100,
    "tradeOffSummary": {
      "gains": ["3-4 specific gains"],
      "losses": ["3-4 specific trade-offs"]
    }
  },
  "dontPull": {
    "title": "Path 2: Maintain Current Approach",
    "benefits": ["4-5 genuine benefits of not adopting AI"],
    "risks": ["4-5 risks of inaction specific to their situation"],
    "recommendations": ["4-5 alternative improvements without AI"],
    "actionPlan30Days": ["3-4 non-AI improvement actions"],
    "actionPlan60Days": ["3-4 actions"],
    "actionPlan90Days": ["3-4 actions"],
    "budgetEstimates": {
      "initial": "$0 for AI",
      "ongoing": "description of current costs",
      "total": "description"
    },
    "impactScore": 0-100,
    "tradeOffSummary": {
      "gains": ["3-4 genuine advantages"],
      "losses": ["3-4 opportunity costs"]
    }
  },
  "withSafeguards": {
    "title": "Path 3: Implement with Safeguards",
    "benefits": ["4-5 specific benefits of phased approach"],
    "risks": ["4-5 risks even with safeguards"],
    "recommendations": ["4-5 specific safeguard recommendations"],
    "mitigationStrategies": ["3-4 risk mitigation strategies tied to their top concerns"],
    "actionPlan30Days": ["3-4 phase-1 actions"],
    "actionPlan60Days": ["3-4 phase-2 actions"],
    "actionPlan90Days": ["3-4 phase-3 actions"],
    "budgetEstimates": {
      "initial": "$X-$Y",
      "ongoing": "$X-$Y/year",
      "total": "$X-$Y over 3 years"
    },
    "impactScore": 0-100,
    "tradeOffSummary": {
      "gains": ["3-4 specific gains"],
      "losses": ["3-4 specific trade-offs"]
    }
  }
}`;

export default async (req: Request) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Rate limiting
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIP)) {
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded. Please try again later.",
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await req.text();

    // Validate payload size (max ~5KB)
    if (body.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Payload too large" }),
        {
          status: 413,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const sessionData = JSON.parse(body);

    // Build the user message from session data
    const userMessage = buildUserMessage(sessionData);

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    // Extract text content
    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from API");
    }

    // Parse and validate JSON
    const analysis = JSON.parse(textBlock.text);

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({
        error: "Analysis failed. Using template-based analysis.",
        fallback: true,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

function buildUserMessage(data: any): string {
  const orgTypeLabels: Record<string, string> = {
    environmental: "Environmental/Conservation",
    health: "Health/Human Services",
    education: "Education/Youth Development",
    crisis: "Crisis Support/Emergency Response",
    community: "Community Development",
    arts: "Arts/Culture",
    advocacy: "Advocacy/Policy",
    faith: "Faith-Based",
    foundation: "Foundation/Grantmaker",
    other: "Other",
  };

  const sizeLabels: Record<string, string> = {
    small: "Under $2M annual budget",
    medium: "$2M-$15M annual budget",
    large: "$15M-$50M annual budget",
    enterprise: "Over $50M annual budget",
  };

  const aiTypeLabels: Record<string, string> = {
    data_analysis: "Data Analysis & Insights",
    chatbot: "Chatbot/Automated Response",
    content_generation: "Content Generation",
    automation: "Process Automation",
    decision_support: "Decision Support System",
    other: "Other",
  };

  const concerns = data.primaryConcerns || {};
  const topConcerns = Object.entries(concerns)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(
      ([key, val]) =>
        `${key.replace(/([A-Z])/g, " $1").trim()}: ${val}/5`
    );

  return `ORGANIZATION ASSESSMENT:

Organization Type: ${orgTypeLabels[data.organizationType] || data.organizationType}
Organization Size: ${sizeLabels[data.organizationSize] || data.organizationSize || "Not specified"}
Mission: ${data.organizationMission || "Not provided"}

AI Initiative:
- Types considered: ${(data.aiInitiativeTypes || []).map((t: string) => aiTypeLabels[t] || t).join(", ")}
- Exploration stage: ${data.explorationStage || "evaluating"}
- Description: ${data.initiativeDescription || "Not provided"}
- Expected outcomes: ${(data.expectedOutcomes || []).join(", ")}
- Timeline: ${data.implementationTimeline || "Not specified"}
- Scale: ${data.impactScale || "Not specified"}

Top Concerns (rated 1-5):
${topConcerns.join("\n")}

Biggest Fears: ${(data.biggestFears || []).join(", ")}

Readiness:
- Current capacity: ${data.currentCapacity || "Not specified"}
- Problem urgency: ${data.problemUrgency || "Not specified"}
- Stakeholder readiness: ${data.stakeholderReadiness || "Not specified"}
- Technical readiness: ${data.technicalReadiness || 3}/5
- Change management capacity: ${data.changeManagementCapacity || 3}/5
- Ethical framework maturity: ${data.ethicalFrameworkMaturity || 3}/5
- Data governance: ${data.dataGovernanceStatus || 3}/5

Please provide a comprehensive three-path analysis specific to this organization's situation, mission, and concerns.`;
}

export const config = {
  path: "/api/analyze",
};

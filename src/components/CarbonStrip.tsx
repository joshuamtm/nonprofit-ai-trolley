import React from "react";
import { SessionData } from "../types";

// The carbon duplicate: a blue-black strip at the foot of every screen where each answer
// reappears as a pressed-through copy. It is the board report, writing itself.
const ORG_TYPE: Record<string, string> = {
  environmental: "Environmental / conservation", health: "Health / human services",
  education: "Education / youth development", crisis: "Crisis support / emergency response",
  community: "Community development", arts: "Arts / culture", advocacy: "Advocacy / policy",
  faith: "Faith-based", foundation: "Foundation / grantmaker", other: "Other",
};
const ORG_SIZE: Record<string, string> = {
  small: "under $2M", medium: "$2M to $15M", large: "$15M to $50M", enterprise: "over $50M",
};
const CONCERN_LABEL: Record<string, string> = {
  environmentalImpact: "environmental impact", jobDisplacement: "job displacement",
  ethicalBias: "bias and fairness", dataPrivacy: "data privacy and security",
  humanDignity: "human dignity", accuracyErrors: "accuracy and errors", techDependency: "tech dependency",
};

export function carbonEntries(data: Partial<SessionData>): string[] {
  const e: string[] = [];
  if (data.organizationType) e.push(`Organisation: ${ORG_TYPE[data.organizationType] || data.organizationType}${data.organizationSize ? `, ${ORG_SIZE[data.organizationSize] || data.organizationSize}` : ""}`);
  if (data.organizationMission) e.push(`Mission: ${data.organizationMission}`);
  if (data.aiInitiativeTypes?.length) e.push(`Initiative: ${data.aiInitiativeTypes.map(t => t.replace(/_/g, " ")).join(", ")}${data.explorationStage ? `, stage ${data.explorationStage}` : ""}`);
  if (data.initiativeDescription) e.push(`Use case: ${data.initiativeDescription}`);
  if (data.primaryConcerns) {
    const top = Object.entries(data.primaryConcerns).sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([k, v]) => `${CONCERN_LABEL[k] || k} ${v}/5`);
    e.push(`Concerns, highest first: ${top.join("; ")}`);
  }
  if (data.currentCapacity) e.push(`Capacity: ${data.currentCapacity}; urgency ${data.problemUrgency || "not stated"}; stakeholders ${data.stakeholderReadiness || "not stated"}`);
  if (data.technicalReadiness) e.push(`Readiness: technical ${data.technicalReadiness}/5, change ${data.changeManagementCapacity}/5, ethics ${data.ethicalFrameworkMaturity}/5, data ${data.dataGovernanceStatus}/5`);
  return e;
}

// Top concerns as short labels, for the occupied track on the analysis diagram.
export function topConcerns(data: Partial<SessionData>, n = 3): string[] {
  if (!data.primaryConcerns) return [];
  return Object.entries(data.primaryConcerns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .filter(([, v]) => v >= 3)
    .map(([k]) => CONCERN_LABEL[k] || k);
}

const CarbonStrip: React.FC<{ data: Partial<SessionData> }> = ({ data }) => {
  const entries = carbonEntries(data);
  if (!entries.length) return null;
  return (
    <aside aria-label="Carbon copy of your answers so far" className="mt-10 bg-paper-deep border-t-2 border-ink px-4 py-3">
      <div className="max-w-panel mx-auto">
        <p className="rubric mb-1.5">Carbon duplicate, board copy · {entries.length} {entries.length === 1 ? "entry" : "entries"} so far</p>
        <ol className="font-mono text-[12.5px] leading-relaxed text-ink space-y-0.5">
          {entries.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

export default CarbonStrip;

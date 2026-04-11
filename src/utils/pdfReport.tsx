import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { SessionData, PathAnalysis } from "../types";

// Use Helvetica (built into react-pdf) — no external font fetching needed

const colors = {
  primary: "#1B4D3E",
  primaryLight: "#2A7A5E",
  secondary: "#C4572A",
  background: "#FAF7F2",
  surface: "#FFFFFF",
  textDark: "#1C1917",
  textMuted: "#78716C",
  rail: "#D6D3D1",
  signalGreen: "#16A34A",
  signalBlue: "#2563EB",
  signalAmber: "#D97706",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 50,
    backgroundColor: colors.surface,
    color: colors.textDark,
  },
  // Cover page
  coverPage: {
    fontFamily: "Helvetica",
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: colors.surface,
    marginBottom: 12,
    textAlign: "center",
  },
  coverSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 40,
  },
  coverOrg: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginTop: 20,
  },
  coverDate: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 8,
  },
  // Section headers
  sectionHeader: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  subsectionHeader: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 12,
  },
  // Body text
  bodyText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: colors.textDark,
    marginBottom: 6,
  },
  mutedText: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.5,
  },
  // Bullet lists
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 14,
    fontSize: 10,
    color: colors.textMuted,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.textDark,
  },
  // Cards / boxes
  card: {
    backgroundColor: "#F8F7F4",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  pathCard: {
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  // Recommendation banner
  recommendBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.signalGreen,
  },
  // Roadmap columns
  roadmapRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  roadmapCol: {
    flex: 1,
    backgroundColor: "#F8F7F4",
    borderRadius: 6,
    padding: 10,
  },
  roadmapLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.textMuted,
    marginBottom: 4,
    textTransform: "uppercase" as any,
    letterSpacing: 0.5,
  },
  // Budget table
  budgetRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.rail,
    paddingVertical: 4,
  },
  budgetLabel: {
    width: "30%",
    fontSize: 9,
    fontWeight: 600,
    color: colors.textMuted,
  },
  budgetValue: {
    width: "70%",
    fontSize: 10,
    fontWeight: 600,
    color: colors.textDark,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: colors.rail,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: colors.textMuted,
  },
  // Trade-off columns
  tradeOffRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  tradeOffCol: {
    flex: 1,
  },
});

// Helper components
const BulletList = ({ items, color }: { items: string[]; color?: string }) => (
  <View>
    {items.map((item, i) => (
      <View key={i} style={styles.bulletItem}>
        <Text style={[styles.bullet, color ? { color } : {}]}>-</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const PageFooter = ({ pageNum }: { pageNum: number }) => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>
      The Nonprofit AI Trolley Problem — Powered by Meet the Moment | mtm.now
    </Text>
    <Text style={styles.footerText}>Page {pageNum}</Text>
  </View>
);

const PathSection = ({
  path,
  pathColor,
  pathLabel,
  isRecommended,
}: {
  path: PathAnalysis;
  pathColor: string;
  pathLabel: string;
  isRecommended: boolean;
}) => (
  <View>
    <View
      style={[
        styles.pathCard,
        {
          borderColor: pathColor,
          backgroundColor: `${pathColor}08`,
        },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: 700, color: pathColor }}>
          {path.title}
        </Text>
        {path.impactScore && (
          <Text style={{ fontSize: 10, fontWeight: 600, color: colors.textMuted }}>
            Impact: {path.impactScore}/100
          </Text>
        )}
      </View>

      {isRecommended && (
        <View style={{ backgroundColor: "#E8F5E9", borderRadius: 4, padding: 6, marginBottom: 8 }}>
          <Text style={{ fontSize: 9, fontWeight: 600, color: colors.signalGreen }}>
            RECOMMENDED PATH
          </Text>
        </View>
      )}

      {/* Trade-offs */}
      {path.tradeOffSummary && (
        <View style={styles.tradeOffRow}>
          <View style={styles.tradeOffCol}>
            <Text style={{ fontSize: 10, fontWeight: 700, color: colors.signalGreen, marginBottom: 4 }}>
              What You Gain:
            </Text>
            <BulletList items={path.tradeOffSummary.gains} color={colors.signalGreen} />
          </View>
          <View style={styles.tradeOffCol}>
            <Text style={{ fontSize: 10, fontWeight: 700, color: colors.secondary, marginBottom: 4 }}>
              What You Risk:
            </Text>
            <BulletList items={path.tradeOffSummary.losses} color={colors.secondary} />
          </View>
        </View>
      )}
    </View>

    {/* Recommendations */}
    <Text style={styles.subsectionHeader}>Recommendations</Text>
    <BulletList items={path.recommendations} />

    {/* Roadmap */}
    {(path.actionPlan30Days || path.actionPlan60Days || path.actionPlan90Days) && (
      <View>
        <Text style={styles.subsectionHeader}>90-Day Roadmap</Text>
        <View style={styles.roadmapRow}>
          {[
            { label: "30 Days", items: path.actionPlan30Days },
            { label: "60 Days", items: path.actionPlan60Days },
            { label: "90 Days", items: path.actionPlan90Days },
          ]
            .filter((p) => p.items?.length)
            .map((period) => (
              <View key={period.label} style={styles.roadmapCol}>
                <Text style={styles.roadmapLabel}>{period.label}</Text>
                {period.items?.slice(0, 3).map((item, i) => (
                  <Text key={i} style={{ fontSize: 8, lineHeight: 1.5, color: colors.textDark, marginBottom: 2 }}>
                    • {item}
                  </Text>
                ))}
              </View>
            ))}
        </View>
      </View>
    )}

    {/* Budget */}
    {path.budgetEstimates && (
      <View>
        <Text style={styles.subsectionHeader}>Budget Estimates</Text>
        <View style={styles.card}>
          {[
            { label: "Initial Investment", value: path.budgetEstimates.initial },
            { label: "Ongoing Annual", value: path.budgetEstimates.ongoing },
            { label: "3-Year Total", value: path.budgetEstimates.total },
          ].map((row) => (
            <View key={row.label} style={styles.budgetRow}>
              <Text style={styles.budgetLabel}>{row.label}</Text>
              <Text style={styles.budgetValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      </View>
    )}
  </View>
);

// Format helpers
const formatOrgType = (type: string): string => {
  const map: Record<string, string> = {
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
  return map[type] || type;
};

const formatOrgSize = (size: string): string => {
  const map: Record<string, string> = {
    small: "Under $2M annual budget",
    medium: "$2M–$15M annual budget",
    large: "$15M–$50M annual budget",
    enterprise: "Over $50M annual budget",
  };
  return map[size] || size;
};

// Main PDF Document
interface ReportProps {
  data: SessionData;
  analysis: {
    pullLever: PathAnalysis;
    dontPull: PathAnalysis;
    withSafeguards: PathAnalysis;
    recommendedPath?: string;
    rationale?: string;
  };
}

const TrolleyReport: React.FC<ReportProps> = ({ data, analysis }) => {
  const recommendedPath = analysis.recommendedPath || "";
  const isRecommendedPath = (pathTitle: string) =>
    recommendedPath.toLowerCase().includes(pathTitle.toLowerCase().slice(0, 8));

  const isPullRecommended = isRecommendedPath("pull") && !recommendedPath.toLowerCase().includes("care") && !recommendedPath.toLowerCase().includes("safeguard");
  const isDontPullRecommended = isRecommendedPath("don't") || isRecommendedPath("status");
  const isSafeguardsRecommended = isRecommendedPath("care") || isRecommendedPath("safeguard");

  // Build path entries and sort: recommended first, then by impact score descending
  const allPaths = [
    { path: analysis.pullLever, color: colors.signalGreen, label: "Implement AI", isRecommended: isPullRecommended },
    { path: analysis.dontPull, color: colors.signalBlue, label: "Status Quo", isRecommended: isDontPullRecommended },
    { path: analysis.withSafeguards, color: colors.signalAmber, label: "With Safeguards", isRecommended: isSafeguardsRecommended },
  ];

  const sortedPaths = [...allPaths].sort((a, b) => {
    // Recommended path always first
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    // Then by impact score descending
    return (b.path.impactScore || 0) - (a.path.impactScore || 0);
  });

  return (
    <Document>
      {/* Cover Page */}
      <Page size="LETTER" style={styles.coverPage}>
        <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: 24, letterSpacing: 4 }}>
          - - -
        </Text>
        <Text style={styles.coverTitle}>
          Your AI Decision Analysis
        </Text>
        <Text style={styles.coverSubtitle}>
          The Nonprofit AI Trolley Problem
        </Text>
        <View style={{ width: 60, height: 2, backgroundColor: "rgba(255,255,255,0.3)", marginVertical: 20, alignSelf: "center" }} />
        <Text style={styles.coverOrg}>
          Prepared for: {formatOrgType(data.organizationType)} Organization
        </Text>
        <Text style={styles.coverDate}>
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </Text>
      </Page>

      {/* Executive Summary */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.sectionHeader}>Executive Summary</Text>

        {analysis.recommendedPath && (
          <View style={styles.recommendBanner}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: colors.primary, marginBottom: 4 }}>
              Recommended Path: {analysis.recommendedPath}
            </Text>
            <Text style={{ fontSize: 10, lineHeight: 1.5, color: colors.textDark }}>
              {analysis.rationale || "Based on your organization's specific situation, concerns, and readiness levels."}
            </Text>
          </View>
        )}

        <Text style={styles.bodyText}>
          This report presents a comprehensive analysis of three potential paths for AI adoption
          at your organization. Each path is evaluated with specific benefits, risks, action plans,
          and budget estimates tailored to your situation.
        </Text>

        <Text style={styles.subsectionHeader}>Your Organization</Text>
        <View style={styles.card}>
          <Text style={styles.bodyText}>Type: {formatOrgType(data.organizationType)}</Text>
          <Text style={styles.bodyText}>Size: {formatOrgSize(data.organizationSize)}</Text>
          <Text style={styles.bodyText}>Mission: {data.organizationMission}</Text>
        </View>

        <Text style={styles.subsectionHeader}>AI Initiative Under Consideration</Text>
        <View style={styles.card}>
          <Text style={styles.bodyText}>{data.initiativeDescription || "General AI exploration"}</Text>
        </View>

        <Text style={styles.subsectionHeader}>Key Decision Factors</Text>
        <View style={styles.card}>
          <Text style={styles.bodyText}>Urgency: {data.problemUrgency}</Text>
          <Text style={styles.bodyText}>Capacity: {data.currentCapacity}</Text>
          <Text style={styles.bodyText}>Stakeholder Readiness: {data.stakeholderReadiness}</Text>
        </View>

        <PageFooter pageNum={2} />
      </Page>

      {/* Paths sorted: recommended first, then by impact score descending */}
      {sortedPaths.map((p, i) => (
        <Page key={p.label} size="LETTER" style={styles.page}>
          <PathSection
            path={p.path}
            pathColor={p.color}
            pathLabel={p.label}
            isRecommended={p.isRecommended}
          />
          <PageFooter pageNum={3 + i} />
        </Page>
      ))}

      {/* Discussion & Resources */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.sectionHeader}>Discussion Questions</Text>
        <Text style={styles.mutedText}>
          Use these questions to guide conversations with your leadership team and board.
        </Text>
        <View style={{ marginTop: 8 }}>
          <BulletList
            items={[
              "Which path best aligns with our mission and organizational values?",
              "Do we have the internal capacity to implement and sustain AI systems?",
              "What would constitute success, and how will we measure it?",
              "How will we ensure AI enhances rather than replaces human judgment in our work?",
              "What is our plan if the AI initiative doesn't produce expected results?",
              "How will we communicate this decision to staff, beneficiaries, and stakeholders?",
              "What safeguards are non-negotiable regardless of which path we choose?",
              "How does this decision affect our funding relationships and reporting?",
            ]}
          />
        </View>

        <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Resources</Text>
        <BulletList
          items={[
            "Partnership on AI — Responsible AI Resources (partnershiponai.org)",
            "AI Now Institute — Nonprofit AI Guidelines",
            "TechSoup — AI Readiness Resources (techsoup.org)",
            "NIST AI Risk Management Framework (nist.gov/artificial-intelligence)",
            "Meet the Moment — AI Advisory Services (mtm.now)",
          ]}
        />

        <View style={{ marginTop: 24, padding: 16, backgroundColor: colors.background, borderRadius: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: colors.primary, marginBottom: 4 }}>
            Need help implementing your chosen path?
          </Text>
          <Text style={{ fontSize: 9, lineHeight: 1.5, color: colors.textMuted }}>
            Meet the Moment provides nonprofit-focused AI advisory services including
            readiness assessments, implementation guidance, and ethical framework development.
            Visit mtm.now to learn more.
          </Text>
        </View>

        <PageFooter pageNum={6} />
      </Page>
    </Document>
  );
};

// Export function to generate and download
export const generateEnhancedPDF = async (
  data: SessionData,
  analysis: {
    pullLever: PathAnalysis;
    dontPull: PathAnalysis;
    withSafeguards: PathAnalysis;
    recommendedPath?: string;
    rationale?: string;
  }
) => {
  const blob = await pdf(
    <TrolleyReport data={data} analysis={analysis} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ai-decision-analysis-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

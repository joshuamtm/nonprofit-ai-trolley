# Nonprofit AI Trolley Problem: Methodology

## Overview

The Nonprofit AI Trolley Problem is an ethical decision-support tool that helps nonprofit organizations evaluate AI implementation decisions through a structured, evidence-based framework. This document explains how the application functions, calculates estimates, and generates recommendations.

---

## How the Application Works

### 1. Data Collection Framework

The application collects information through a **four-step questionnaire** designed to capture:

#### Step 1: Organizational Context

- Organization type (environmental, health, education, crisis support, community development)
- Mission statement
- Current challenges (optional free text)

#### Step 2: AI Initiative Details

- AI initiative type(s) (data analysis, chatbot, content generation, automation, decision support)
- Implementation description
- Expected outcomes (serve more people, reduce time, improve quality, free staff, reduce costs, increase access, generate insights)
- Implementation timeline (immediate, 6 months, 1+ year)
- Impact scale (pilot, department-wide, organization-wide)

#### Step 3: Concern Assessment

Participants rate seven key concerns on a **1-5 scale**:

- **Environmental Impact**: Carbon footprint of AI systems
- **Job Displacement**: Impact on staff roles
- **Ethical Bias**: Risk of algorithmic discrimination
- **Data Privacy**: Security and privacy vulnerabilities
- **Human Dignity**: Dehumanization of service delivery
- **Accuracy Errors**: Potential for harmful mistakes
- **Technology Dependency**: Over-reliance on systems

Additional inputs include:

- Top three ranked concerns
- Biggest fears (harm to beneficiaries, waste of resources, loss of mission focus, staff resistance)
- Worst-case scenario description

#### Step 4: Readiness Assessment

Evaluates organizational preparedness across:

- **Current Capacity**: Overwhelmed, stretched thin, adequate, or exploring
- **Problem Urgency**: Critical, important, or exploratory
- **Stakeholder Readiness**: Eager, cautious, skeptical, or resistant
- **Technical Readiness**: 1-5 scale
- **Change Management Capacity**: 1-5 scale
- **Ethical Framework Maturity**: 1-5 scale
- **Data Governance Status**: 1-5 scale

---

## Analysis Engine

### Personalization Scoring System

The application calculates four **personalization scores** to tailor recommendations:

#### 1. Risk Aversion Score (30% weight)

**Formula:**

```
Risk Score = Average of [ethicalBias, dataPrivacy, humanDignity, accuracyErrors] / 5
```

**Interpretation:**

- Score > 0.6: High caution needed
- Score ≤ 0.6: Moderate risk tolerance

#### 2. Urgency Score (25% weight)

**Formula:**

```
Urgency Value = critical (1.0) | important (0.75) | moderate (0.5) | exploratory (0.25)
```

**Interpretation:**

- Score > 0.7: Fast implementation needed
- Score ≤ 0.7: Time for careful planning

#### 3. Readiness Score (25% weight)

**Formula:**

```
Readiness Score = Average of [technicalReadiness, changeManagementCapacity,
                             ethicalFrameworkMaturity, dataGovernanceStatus] / 5
```

**Interpretation:**

- Score > 0.6: Well-prepared for implementation
- Score ≤ 0.6: Significant preparation needed

#### 4. Stakeholder Alignment Score (20% weight)

**Formula:**

```
Alignment Value = enthusiastic (1.0) | supportive (0.75) | skeptical (0.4) | resistant (0.2)
```

**Interpretation:**

- Score > 0.6: Strong buy-in expected
- Score ≤ 0.6: Change management critical

---

## Financial Estimates

### Budget Calculation Methodology

Budget estimates are calculated based on **organization size** and **implementation approach**:

#### Organization Size Multiplier

- **Large organizations**: 3x multiplier
- **Medium organizations**: 2x multiplier
- **Small organizations**: 1x multiplier

#### Full Implementation Budget

- **Initial**: $50,000-$100,000 × org size
- **Ongoing**: $20,000-$40,000/year × org size
- **3-Year Total**: $150,000-$300,000 × org size

**Example (Medium Organization):**

- Initial: $100,000-$200,000
- Ongoing: $40,000-$80,000/year
- 3-Year Total: $300,000-$600,000

#### Phased Implementation Budget

- **Initial**: $20,000-$40,000 × org size
- **Ongoing**: $15,000-$30,000/year × org size
- **3-Year Total**: $80,000-$160,000 × org size

**Example (Medium Organization):**

- Initial: $40,000-$80,000
- Ongoing: $30,000-$60,000/year
- 3-Year Total: $160,000-$320,000

#### Status Quo Budget

- **Initial**: $0
- **Ongoing**: Current operational costs
- **Total**: No additional AI investment

**Note:** These are general estimates. Actual costs vary based on:

- Specific AI tools selected
- Staff training requirements
- Infrastructure needs
- Consultant/vendor fees
- Ongoing maintenance and licenses

---

## Three-Path Analysis

### Path 1: Pull the Lever (Full Implementation)

#### Benefits Generation

Benefits are dynamically generated based on:

- **Expected outcomes** (mapped to specific benefit statements)
- **Current capacity** (if overwhelmed → "Immediate relief for overwhelmed staff")
- **Impact scale** (organization-wide → "Serve 50-75% more beneficiaries")
- **Problem urgency** (critical → "Address urgent operational needs")

**Example Benefit Calculations:**

- If outcome = "serve_more" + impactScale = "organization-wide"
  → "Serve 50-75% more beneficiaries"
- If outcome = "reduce_time"
  → "Reduce processing time by 60-80%"

#### Risk Assessment

Risks are identified from:

- **High concern ratings** (4-5 on scale):
  - ethicalBias → "High risk of algorithmic bias affecting vulnerable populations"
  - dataPrivacy → "Significant data privacy and security challenges"
  - jobDisplacement → "Likely displacement of multiple staff roles"
- **Stakeholder readiness** (resistant → "Severe implementation challenges")
- **Technical readiness** (≤2 → "Technical infrastructure gaps may cause failures")

#### Trade-Off Analysis

**Gains:**

- Maximum efficiency gains
- Competitive advantage
- Scale potential
- Data-driven insights

**Losses:**

- Higher upfront costs
- Greater risk exposure
- Potential stakeholder resistance
- Complex change management

---

### Path 2: Don't Pull (Status Quo)

#### Benefits

- No disruption to current operations
- Avoids AI-related risks entirely
- No additional investment required
- Maintains current stakeholder comfort
- Preserves organizational culture

#### Risks

- Continued operational inefficiencies
- Growing competitive disadvantage
- Staff burnout from manual processes
- Inability to scale services
- Missed funding opportunities

#### Opportunity Cost Calculation

Costs are determined by:

- **Capacity status** (overwhelmed → "Continued inability to meet growing demand")
- **Expected outcomes** (generate_insights → "Missing valuable insights from data")
- **Standard costs**: Falling behind innovation curve, reduced funding competitiveness

---

### Path 3: Pull with Care (Phased Implementation)

#### Mitigation Playbook

For each **top 3 concern** (rated 4-5), the system generates:

**Ethical Bias:**

- Strategy: Implement bias testing at each milestone, diverse review team
- Timeframe: Ongoing, quarterly audits
- Resources: Bias testing tools, diverse review committee, external auditor

**Data Privacy:**

- Strategy: Privacy-by-design approach, encryption, access controls
- Timeframe: Before launch, continuous monitoring
- Resources: Privacy consultant, security tools, compliance budget

**Job Displacement:**

- Strategy: No-layoff pledge, comprehensive retraining program
- Timeframe: 6 months before implementation
- Resources: Training budget, career counseling, role redesign consultant

**Human Dignity:**

- Strategy: Human-in-the-loop for all beneficiary decisions
- Timeframe: Built into design phase
- Resources: Service design expert, beneficiary feedback system, appeal process

#### Success Metrics

Metrics are outcome-specific:

- serve_more → "Number of beneficiaries served (target: +40%)"
- reduce_time → "Average processing time (target: -60%)"
- improve_quality → "Decision accuracy rate (target: >95%)"

Plus standard metrics:

- Staff satisfaction score
- Beneficiary satisfaction rate
- Cost per service delivered
- Error/incident rate

#### Red Flags

System identifies warning signs based on:

- **Stakeholder readiness** (resistant → "Active sabotage or workarounds by staff")
- **Ethical concerns** (ethicalBias ≥4 → "Evidence of discriminatory outcomes")
- **Standard flags**: System errors, data quality issues, beneficiary complaints, budget overruns >20%

---

## Recommendation Engine

### Path Recommendation Logic

The system determines the **recommended path** using weighted scoring:

#### Decision Tree

**Scenario 1: Urgent + Ready**

```
IF urgencyScore > 0.8 AND readinessScore > 0.6
THEN recommend: "Pull the Lever (Full Implementation)"
RATIONALE: "Critical urgency combined with good organizational readiness
            suggests moving forward quickly with full implementation while
            managing risks actively."
```

**Scenario 2: High Risk + Low Urgency**

```
IF riskScore > 0.7 AND urgencyScore < 0.5
THEN recommend: "Don't Pull (Status Quo)"
RATIONALE: "High risk concerns combined with non-urgent timeline suggest
            focusing on preparation before considering AI implementation."
```

**Scenario 3: High Risk + High Urgency**

```
IF (riskScore > 0.7 OR alignmentScore < 0.4) AND urgencyScore ≥ 0.5
THEN recommend: "Pull with Safeguards"
RATIONALE: "Significant concerns require a careful approach, but urgency
            means you should proceed with robust safeguards and phased
            implementation."
```

**Default Scenario**

```
ELSE recommend: "Pull with Safeguards"
RATIONALE: "A phased approach with safeguards balances your need for AI
            benefits with appropriate risk management and stakeholder
            engagement."
```

---

## Impact Scoring

### Impact Score Calculation

**Formula:**

```
Base Score = Full Implementation (85) | Phased (65) | Status Quo (20)
Readiness Adjustment = Base Score × Readiness Score
Urgency Boost = +10 if problemUrgency = "critical", otherwise 0
Final Impact Score = MIN(100, Readiness Adjustment + Urgency Boost)
```

**Example:**

```
Full implementation, readiness = 0.7, urgency = critical
Impact Score = MIN(100, 85 × 0.7 + 10) = MIN(100, 59.5 + 10) = 69.5
```

This score provides a **comparative measure** of expected impact across the three paths.

---

## Action Plans

### Time-Phased Implementation

Each path includes **30-60-90 day action plans**:

#### Path 3 Example (Safeguards)

**30 Days:**

- Form AI ethics committee
- Develop implementation framework
- Identify pilot use case
- [+ personalized recommendations from template system]

**60 Days:**

- Launch limited pilot
- Establish monitoring systems
- Begin staff training
- [+ personalized recommendations from template system]

**90 Days:**

- Evaluate pilot results
- Refine approach based on learnings
- Plan next phase expansion
- [+ personalized recommendations from template system]

---

## Resource Identification

### Required Resources by Implementation Type

#### Full Implementation

**Skills:**

- AI/ML expertise
- Data science capabilities
- Change management
- Project management
- Ethics and governance

**Tools:**

- Enterprise AI platform
- Data management system
- Monitoring tools
- Training platform

**Partnerships:**

- AI vendor
- Technical consultant
- Ethics advisor
- Training provider

#### Phased Implementation

**Skills:**

- Basic AI literacy
- Project management
- Change facilitation
- Risk assessment

**Tools:**

- Pilot AI tools
- Basic analytics
- Feedback systems
- Documentation platform

**Partnerships:**

- Technical advisor
- Pilot vendor
- Peer organizations
- Academic partner

---

## PDF Report Generation

### Report Structure

The application generates a comprehensive **5-page PDF report**:

#### Page 1: Executive Summary

- Organization context
- AI initiative description
- Key decision factors (urgency, capacity, stakeholder readiness)
- Three-path overview

#### Page 2: Path 1 Analysis

- Benefits
- Risks
- Critical success factors

#### Page 3: Path 2 Analysis

- Benefits of maintaining status quo
- Risks and limitations
- Opportunity costs

#### Page 4: Path 3 Analysis

- Benefits
- Mitigation strategies
- Recommended implementation approach

#### Page 5: Next Steps & Resources

- Immediate actions
- Discussion questions for teams
- Additional resources (Partnership on AI, AI Now Institute, NetHope, TechSoup, course materials)

---

## Data Privacy & Ethics

### Privacy Considerations

- **No data storage**: All analysis happens in browser
- **No tracking**: No user analytics or session storage
- **Local processing**: Calculations performed client-side
- **Download only**: Results available only via PDF download

### Ethical Design Principles

1. **Neutrality**: Framework presents three paths without bias
2. **Transparency**: Clear methodology and calculation logic
3. **Empowerment**: Organizations make their own decisions
4. **Context-sensitivity**: Recommendations adapted to specific situations
5. **Educational focus**: Designed for learning and discussion, not prescriptive

---

## Limitations & Disclaimers

### What This Tool Does NOT Do

- **Does not make decisions for you**: This is a decision-support tool, not a decision-making tool
- **Does not replace expert consultation**: Budget estimates are general; consult with vendors and experts
- **Does not guarantee outcomes**: Results depend on implementation quality and organizational factors
- **Does not provide legal/compliance advice**: Consult legal experts for regulatory requirements

### Recommended Use

This tool is best used as:

- A **conversation starter** for leadership teams
- A **framework** for structured discussion
- A **learning tool** in human-centered AI courses
- An **initial assessment** before deeper analysis

**Always combine this analysis with:**

- Expert consultation (technical, ethical, legal)
- Stakeholder input
- Detailed cost/benefit analysis
- Pilot testing
- Ongoing evaluation

---

## Technical Implementation

### Technology Stack

- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive design
- **Framer Motion** for animations
- **React Hook Form** for form state management
- **jsPDF** for PDF generation
- **Netlify** for hosting and deployment

### Key Files

- `src/utils/analysisGenerator.ts` - Core analysis logic
- `src/utils/enhancedAnalysisGenerator.ts` - Advanced scoring and recommendations
- `src/utils/pdfGenerator.ts` - PDF report generation
- `src/utils/recommendationTemplates.ts` - Template-based personalization
- `src/types/index.ts` - TypeScript interfaces

---

## Continuous Improvement

This methodology is based on:

- **Ethical AI frameworks** (Partnership on AI, AI Now Institute)
- **Human-centered design principles**
- **Nonprofit sector best practices**
- **Feedback from course participants**

The tool is regularly updated based on:

- User feedback from nonprofit professionals
- Emerging AI ethics research
- Real-world implementation experiences
- Evolving sector standards

---

## Contact & Support

For questions about methodology or to provide feedback:

- **Built by**: Meet the Moment (MTM)
- **Website**: mtm.now
- **Context**: Human-Centered AI Course for Nonprofit Professionals
- **Support**: Open issues on GitHub repository

---

_Last Updated: January 2025_
_Version: 2.0_

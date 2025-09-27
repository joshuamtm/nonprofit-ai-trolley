import jsPDF from 'jspdf';
import { SessionData, PathAnalysis } from '../types';

export const generatePDF = (
  data: SessionData,
  analysis: {
    pullLever: PathAnalysis;
    dontPull: PathAnalysis;
    withSafeguards: PathAnalysis;
  }
) => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageHeight = 280;
  const lineHeight = 7;
  const margin = 20;

  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight) {
      doc.addPage();
      yPosition = 20;
    }
  };

  const addTitle = (text: string, size: number = 16) => {
    checkPageBreak(15);
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yPosition);
    yPosition += size * 0.5 + 5;
  };

  const addSubtitle = (text: string) => {
    checkPageBreak(10);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yPosition);
    yPosition += 8;
  };

  const addText = (text: string, indent: number = 0) => {
    checkPageBreak(10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, 170 - indent);
    lines.forEach((line: string) => {
      checkPageBreak(lineHeight);
      doc.text(line, margin + indent, yPosition);
      yPosition += lineHeight;
    });
  };

  const addBulletList = (items: string[], indent: number = 10) => {
    items.forEach(item => {
      checkPageBreak(10);
      doc.text('•', margin + indent - 5, yPosition);
      const lines = doc.splitTextToSize(item, 160 - indent);
      lines.forEach((line: string, index: number) => {
        if (index > 0) checkPageBreak(lineHeight);
        doc.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
    });
  };

  // Page 1: Executive Summary
  addTitle('The Nonprofit AI Trolley Problem', 20);
  addTitle('Ethical Decision Analysis Report', 14);
  yPosition += 10;

  addSubtitle('Organization Context');
  addText(`Type: ${formatOrganizationType(data.organizationType)}`);
  addText(`Mission: ${data.organizationMission}`);
  yPosition += 5;

  addSubtitle('AI Initiative');
  addText(`Type: ${formatAIType(data.aiInitiativeType)}`);
  addText(`Description: ${data.initiativeDescription}`);
  yPosition += 5;

  addSubtitle('Key Decision Factors');
  addText(`Urgency: ${formatUrgency(data.problemUrgency)}`);
  addText(`Capacity: ${formatCapacity(data.currentCapacity)}`);
  addText(`Stakeholder Readiness: ${formatReadiness(data.stakeholderReadiness)}`);
  yPosition += 10;

  addSubtitle('Three-Path Recommendation Summary');
  addText('This report analyzes three potential paths for your AI implementation decision:');
  addText('1. Implement AI (Pull the Lever)');
  addText('2. Maintain Status Quo (Don\'t Pull)');
  addText('3. Implement with Safeguards (Pull with Care)');

  // Page 2: Path 1 - Pull the Lever
  doc.addPage();
  yPosition = 20;
  addTitle(analysis.pullLever.title);
  yPosition += 5;

  addSubtitle('Potential Benefits:');
  addBulletList(analysis.pullLever.benefits);
  yPosition += 5;

  addSubtitle('Associated Risks:');
  addBulletList(analysis.pullLever.risks);
  yPosition += 5;

  if (analysis.pullLever.criticalFactors) {
    addSubtitle('Critical Success Factors:');
    addBulletList(analysis.pullLever.criticalFactors);
  }

  // Page 3: Path 2 - Don't Pull
  doc.addPage();
  yPosition = 20;
  addTitle(analysis.dontPull.title);
  yPosition += 5;

  addSubtitle('Benefits of This Choice:');
  addBulletList(analysis.dontPull.benefits);
  yPosition += 5;

  addSubtitle('Risks & Limitations:');
  addBulletList(analysis.dontPull.risks);
  yPosition += 5;

  if (analysis.dontPull.opportunityCosts) {
    addSubtitle('Opportunity Costs:');
    addBulletList(analysis.dontPull.opportunityCosts);
  }

  // Page 4: Path 3 - With Safeguards
  doc.addPage();
  yPosition = 20;
  addTitle(analysis.withSafeguards.title);
  yPosition += 5;

  addSubtitle('Benefits (Same as Path 1):');
  addBulletList(analysis.withSafeguards.benefits);
  yPosition += 5;

  if (analysis.withSafeguards.mitigationStrategies) {
    addSubtitle('Risk Mitigation Strategies:');
    addBulletList(analysis.withSafeguards.mitigationStrategies);
    yPosition += 5;
  }

  addSubtitle('Recommended Implementation Approach:');
  addBulletList(analysis.withSafeguards.recommendations);

  // Page 5: Next Steps & Resources
  doc.addPage();
  yPosition = 20;
  addTitle('Next Steps & Resources');
  yPosition += 5;

  addSubtitle('Immediate Actions:');
  const immediateActions = [
    'Share this report with your leadership team',
    'Schedule a discussion session with key stakeholders',
    'Identify which path aligns best with your organizational values',
    'Create a timeline for decision-making',
    'Consider forming an AI ethics committee'
  ];
  addBulletList(immediateActions);
  yPosition += 5;

  addSubtitle('Questions for Your Team:');
  const discussionQuestions = [
    'Which path best aligns with our mission and values?',
    'Do we have the resources to implement safeguards effectively?',
    'What would constitute success or failure for this initiative?',
    'How will we measure and monitor impact on beneficiaries?',
    'What is our plan if the AI system doesn\'t work as expected?'
  ];
  addBulletList(discussionQuestions);
  yPosition += 5;

  addSubtitle('Additional Resources:');
  const resources = [
    'Partnership on AI - Responsible AI Resources',
    'AI Now Institute - Nonprofit AI Guidelines',
    'NetHope - AI for Good Framework',
    'TechSoup - AI Readiness Assessment',
    'Human-Centered AI Course Materials'
  ];
  addBulletList(resources);

  // Footer on last page
  yPosition = 260;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by The Nonprofit AI Trolley Problem Tool', margin, yPosition);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition + 5);

  // Save the PDF
  doc.save('nonprofit-ai-trolley-analysis.pdf');
};

// Helper functions for formatting
const formatOrganizationType = (type: string): string => {
  const types: { [key: string]: string } = {
    'environmental': 'Environmental/Conservation',
    'health': 'Health/Human Services',
    'education': 'Education/Youth Development',
    'crisis': 'Crisis Support/Emergency Response',
    'community': 'Community Development',
    'other': 'Other'
  };
  return types[type] || type;
};

const formatAIType = (type: string): string => {
  const types: { [key: string]: string } = {
    'data_analysis': 'Data Analysis & Insights',
    'chatbot': 'Chatbot/Automated Response',
    'content_generation': 'Content Generation',
    'automation': 'Process Automation',
    'decision_support': 'Decision Support System',
    'other': 'Other'
  };
  return types[type] || type;
};

const formatUrgency = (urgency: string): string => {
  const levels: { [key: string]: string } = {
    'critical': 'Critical - Immediate Need',
    'important': 'Important - Near-term Priority',
    'exploratory': 'Exploratory - Long-term Planning'
  };
  return levels[urgency] || urgency;
};

const formatCapacity = (capacity: string): string => {
  const levels: { [key: string]: string } = {
    'overwhelmed': 'Overwhelmed - Cannot Meet Demand',
    'stretched': 'Stretched Thin but Managing',
    'adequate': 'Adequate but Want to Do More',
    'exploring': 'Exploring New Capabilities'
  };
  return levels[capacity] || capacity;
};

const formatReadiness = (readiness: string): string => {
  const levels: { [key: string]: string } = {
    'eager': 'Eager to Embrace AI',
    'cautious': 'Cautiously Optimistic',
    'skeptical': 'Skeptical but Open',
    'resistant': 'Resistant to Change'
  };
  return levels[readiness] || readiness;
};
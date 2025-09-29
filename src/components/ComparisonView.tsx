import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';
import { SessionData, PathAnalysis } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ComparisonViewProps {
  data: SessionData;
  pullLever: PathAnalysis;
  dontPull: PathAnalysis;
  withSafeguards: PathAnalysis;
  recommendedPath: string;
  rationale: string;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  data,
  pullLever,
  dontPull,
  withSafeguards,
  recommendedPath,
  rationale
}) => {
  const comparisonRef = React.useRef<HTMLDivElement>(null);

  const downloadComparison = async () => {
    if (!comparisonRef.current) return;

    try {
      const canvas = await html2canvas(comparisonRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('ai-trolley-comparison.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getPathIcon = (path: string) => {
    if (path === recommendedPath) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    return <AlertCircle className="w-6 h-6 text-gray-400" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const criteria = [
    'Impact Score',
    'Implementation Speed',
    'Risk Level',
    'Cost',
    'Stakeholder Buy-in',
    'Ethical Alignment',
    'Scalability',
    'Learning Opportunity'
  ];

  const getComparisonData = (criterion: string) => {
    const comparisonMap: { [key: string]: { pullLever: any; dontPull: any; withSafeguards: any } } = {
      'Impact Score': {
        pullLever: pullLever.impactScore || 85,
        dontPull: dontPull.impactScore || 20,
        withSafeguards: withSafeguards.impactScore || 65
      },
      'Implementation Speed': {
        pullLever: 'Fast (1-3 months)',
        dontPull: 'N/A',
        withSafeguards: 'Moderate (3-6 months)'
      },
      'Risk Level': {
        pullLever: 'High',
        dontPull: 'Low',
        withSafeguards: 'Moderate'
      },
      'Cost': {
        pullLever: pullLever.budgetEstimates?.total || 'High',
        dontPull: dontPull.budgetEstimates?.total || 'None',
        withSafeguards: withSafeguards.budgetEstimates?.total || 'Moderate'
      },
      'Stakeholder Buy-in': {
        pullLever: data.stakeholderReadiness === 'enthusiastic' ? 'High' : 'Challenging',
        dontPull: 'Maintained',
        withSafeguards: 'Gradual Build'
      },
      'Ethical Alignment': {
        pullLever: 'Requires Vigilance',
        dontPull: 'Status Quo',
        withSafeguards: 'Built-in Safeguards'
      },
      'Scalability': {
        pullLever: 'High',
        dontPull: 'Limited',
        withSafeguards: 'Phased Growth'
      },
      'Learning Opportunity': {
        pullLever: 'Rapid Learning',
        dontPull: 'Minimal',
        withSafeguards: 'Structured Learning'
      }
    };

    return comparisonMap[criterion] || { pullLever: '-', dontPull: '-', withSafeguards: '-' };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Path Comparison Analysis</h2>
        <button
          onClick={downloadComparison}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Comparison
        </button>
      </div>

      <div ref={comparisonRef} className="bg-white rounded-lg shadow-lg p-6">
        {/* Recommendation Banner */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Recommended Path: {recommendedPath}</h3>
          </div>
          <p className="text-gray-700">{rationale}</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3 font-semibold">Criteria</th>
                <th className="text-center p-3">
                  <div className="flex items-center justify-center gap-2">
                    {getPathIcon('Path 1: Pull the Lever (Full AI Implementation)')}
                    <span className="font-semibold">Pull Lever</span>
                  </div>
                </th>
                <th className="text-center p-3">
                  <div className="flex items-center justify-center gap-2">
                    {getPathIcon('Path 2: Don\'t Pull (Maintain Status Quo)')}
                    <span className="font-semibold">Don't Pull</span>
                  </div>
                </th>
                <th className="text-center p-3">
                  <div className="flex items-center justify-center gap-2">
                    {getPathIcon('Path 3: Pull with Care (Phased Implementation with Safeguards)')}
                    <span className="font-semibold">With Safeguards</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => {
                const rowData = getComparisonData(criterion);
                return (
                  <tr key={criterion} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 font-medium">{criterion}</td>
                    <td className={`p-3 text-center ${criterion === 'Impact Score' ? getScoreColor(rowData.pullLever) : ''}`}>
                      {typeof rowData.pullLever === 'number' ? `${rowData.pullLever}/100` : rowData.pullLever}
                    </td>
                    <td className={`p-3 text-center ${criterion === 'Impact Score' ? getScoreColor(rowData.dontPull) : ''}`}>
                      {typeof rowData.dontPull === 'number' ? `${rowData.dontPull}/100` : rowData.dontPull}
                    </td>
                    <td className={`p-3 text-center ${criterion === 'Impact Score' ? getScoreColor(rowData.withSafeguards) : ''}`}>
                      {typeof rowData.withSafeguards === 'number' ? `${rowData.withSafeguards}/100` : rowData.withSafeguards}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Key Trade-offs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-lg border-2 ${
              recommendedPath.includes('Full') ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
          >
            <h4 className="font-semibold mb-2">Pull Lever - Key Trade-offs</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-green-600">Gains:</span>
                <ul className="text-sm text-gray-600 ml-4">
                  {pullLever.tradeOffSummary?.gains.slice(0, 3).map((gain, i) => (
                    <li key={i}>• {gain}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-sm font-medium text-red-600">Losses:</span>
                <ul className="text-sm text-gray-600 ml-4">
                  {pullLever.tradeOffSummary?.losses.slice(0, 3).map((loss, i) => (
                    <li key={i}>• {loss}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-4 rounded-lg border-2 ${
              recommendedPath.includes('Status Quo') ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
          >
            <h4 className="font-semibold mb-2">Don't Pull - Key Trade-offs</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-green-600">Gains:</span>
                <ul className="text-sm text-gray-600 ml-4">
                  {dontPull.tradeOffSummary?.gains.slice(0, 3).map((gain, i) => (
                    <li key={i}>• {gain}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-sm font-medium text-red-600">Losses:</span>
                <ul className="text-sm text-gray-600 ml-4">
                  {dontPull.tradeOffSummary?.losses.slice(0, 3).map((loss, i) => (
                    <li key={i}>• {loss}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-lg border-2 ${
              recommendedPath.includes('Safeguards') ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
          >
            <h4 className="font-semibold mb-2">With Safeguards - Key Trade-offs</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-green-600">Gains:</span>
                <ul className="text-sm text-gray-600 ml-4">
                  {withSafeguards.tradeOffSummary?.gains.slice(0, 3).map((gain, i) => (
                    <li key={i}>• {gain}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-sm font-medium text-red-600">Losses:</span>
                <ul className="text-sm text-gray-600 ml-4">
                  {withSafeguards.tradeOffSummary?.losses.slice(0, 3).map((loss, i) => (
                    <li key={i}>• {loss}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Action Items */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Immediate Next Steps (Based on Recommended Path)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-primary">30 Days:</span>
              <ul className="text-sm text-gray-600 mt-1">
                {(recommendedPath.includes('Full') ? pullLever.actionPlan30Days :
                  recommendedPath.includes('Status Quo') ? dontPull.actionPlan30Days :
                  withSafeguards.actionPlan30Days)?.slice(0, 3).map((action, i) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-sm font-medium text-primary">60 Days:</span>
              <ul className="text-sm text-gray-600 mt-1">
                {(recommendedPath.includes('Full') ? pullLever.actionPlan60Days :
                  recommendedPath.includes('Status Quo') ? dontPull.actionPlan60Days :
                  withSafeguards.actionPlan60Days)?.slice(0, 3).map((action, i) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-sm font-medium text-primary">90 Days:</span>
              <ul className="text-sm text-gray-600 mt-1">
                {(recommendedPath.includes('Full') ? pullLever.actionPlan90Days :
                  recommendedPath.includes('Status Quo') ? dontPull.actionPlan90Days :
                  withSafeguards.actionPlan90Days)?.slice(0, 3).map((action, i) => (
                  <li key={i}>• {action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
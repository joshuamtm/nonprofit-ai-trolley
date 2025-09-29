import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, MessageSquare, FileText, Zap, Brain, Settings } from 'lucide-react';
import { SessionData } from '../../types';
import Tooltip from '../Tooltip';
import WhyThisMatters from '../WhyThisMatters';

interface EnhancedStepTwoProps {
  data: Partial<SessionData>;
  updateData: (data: Partial<SessionData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EnhancedStepTwo: React.FC<EnhancedStepTwoProps> = ({ data, updateData, onNext, onPrev }) => {
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      aiInitiativeTypes: data.aiInitiativeTypes || [],
      initiativeDescription: data.initiativeDescription || '',
      expectedOutcomes: data.expectedOutcomes || [],
      implementationTimeline: data.implementationTimeline || '',
      impactScale: data.impactScale || ''
    }
  });

  const toggleExpanded = (type: string) => {
    setExpandedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const aiTypes = [
    {
      value: 'data_analysis',
      label: 'Data Analysis & Insights',
      icon: <Cpu className="w-5 h-5" />,
      description: 'AI that analyzes your existing data to find patterns, predict trends, and generate insights',
      examples: [
        'Donor behavior analysis to predict major gift likelihood',
        'Program outcome analysis to identify success factors',
        'Resource allocation optimization based on impact data'
      ]
    },
    {
      value: 'chatbot',
      label: 'Chatbot/Automated Response',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'AI-powered conversational interfaces for stakeholder interaction',
      examples: [
        '24/7 helpline for beneficiaries seeking resources',
        'Automated FAQ responses for volunteer inquiries',
        'Initial intake screening for service eligibility'
      ]
    },
    {
      value: 'content_generation',
      label: 'Content Generation',
      icon: <FileText className="w-5 h-5" />,
      description: 'AI that creates written content, reports, or communications',
      examples: [
        'Grant proposal drafting assistance',
        'Personalized donor thank-you letters',
        'Social media content creation'
      ]
    },
    {
      value: 'automation',
      label: 'Process Automation',
      icon: <Zap className="w-5 h-5" />,
      description: 'AI that automates repetitive tasks and workflows',
      examples: [
        'Automated data entry from forms and documents',
        'Email categorization and routing',
        'Expense report processing and approval'
      ]
    },
    {
      value: 'decision_support',
      label: 'Decision Support System',
      icon: <Brain className="w-5 h-5" />,
      description: 'AI that helps staff make better decisions with data-driven recommendations',
      examples: [
        'Client risk assessment and intervention recommendations',
        'Grant application scoring and prioritization',
        'Program participant matching for best outcomes'
      ]
    },
    {
      value: 'other',
      label: 'Other',
      icon: <Settings className="w-5 h-5" />,
      description: 'Other AI applications not listed above',
      examples: []
    }
  ];

  const outcomeOptions = [
    { value: 'serve_more', label: 'Serve more beneficiaries', impact: 'Capacity & Scale' },
    { value: 'reduce_time', label: 'Reduce response time', impact: 'Efficiency' },
    { value: 'improve_quality', label: 'Improve decision quality', impact: 'Effectiveness' },
    { value: 'free_staff', label: 'Free up staff time', impact: 'Human Resources' },
    { value: 'reduce_costs', label: 'Reduce operational costs', impact: 'Financial' },
    { value: 'increase_access', label: 'Increase accessibility', impact: 'Equity' },
    { value: 'generate_insights', label: 'Generate new insights', impact: 'Innovation' }
  ];

  const onSubmit = (formData: any) => {
    updateData({
      aiInitiativeTypes: formData.aiInitiativeTypes,
      initiativeDescription: formData.initiativeDescription,
      expectedOutcomes: formData.expectedOutcomes,
      implementationTimeline: formData.implementationTimeline,
      impactScale: formData.impactScale
    });
    onNext();
  };

  return (
    <div className="card">
      <h2 className="mb-6">Step 2: AI Initiative Details</h2>
      <p className="text-gray-600 mb-6">
        Let's explore the AI initiative you're considering and its potential impact.
      </p>

      <WhyThisMatters
        content="Your AI type selection helps us understand the technical complexity and resource requirements. Your expected outcomes shape our recommendations for success metrics and implementation approach."
        influences={[
          'Recommended implementation timeline',
          'Required technical resources',
          'Risk mitigation strategies',
          'Budget estimates'
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* AI Initiative Types with Expandable Descriptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What type(s) of AI are you considering?
            <Tooltip
              content="Select all that apply. Click on each option to see examples."
              type="info"
            />
          </label>
          <div className="space-y-3">
            {aiTypes.map((type) => (
              <div key={type.value} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    value={type.value}
                    {...register('aiInitiativeTypes', {
                      validate: value => value.length > 0 || 'Please select at least one initiative type'
                    })}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span className="font-medium text-gray-900">{type.label}</span>
                      </div>
                      {type.examples.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleExpanded(type.value);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedTypes.includes(type.value) ?
                            <ChevronUp className="w-4 h-4" /> :
                            <ChevronDown className="w-4 h-4" />
                          }
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    {expandedTypes.includes(type.value) && type.examples.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 pl-4 border-l-2 border-gray-200"
                      >
                        <p className="text-xs font-medium text-gray-500 mb-1">Examples:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {type.examples.map((example, idx) => (
                            <li key={idx}>• {example}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>
          {errors.aiInitiativeTypes && (
            <p className="mt-1 text-sm text-red-600">{errors.aiInitiativeTypes.message}</p>
          )}
        </div>

        {/* Implementation Timeline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Implementation Timeline
            <Tooltip
              content="When do you need this solution to be operational?"
              type="info"
            />
          </label>
          <select
            {...register('implementationTimeline', { required: 'Please select a timeline' })}
            className="input-field"
          >
            <option value="">Select timeline...</option>
            <option value="immediate">Immediate (within 1 month)</option>
            <option value="3months">Short-term (1-3 months)</option>
            <option value="6months">Medium-term (3-6 months)</option>
            <option value="1year">Long-term (6-12 months)</option>
            <option value="future">Future planning (12+ months)</option>
          </select>
          {errors.implementationTimeline && (
            <p className="mt-1 text-sm text-red-600">{errors.implementationTimeline.message}</p>
          )}
        </div>

        {/* Impact Scale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Impact Scale
            <Tooltip
              content="How broadly will this AI solution be deployed?"
              type="info"
            />
          </label>
          <select
            {...register('impactScale', { required: 'Please select impact scale' })}
            className="input-field"
          >
            <option value="">Select scale...</option>
            <option value="pilot">Pilot (single team or program)</option>
            <option value="department">Department-wide</option>
            <option value="organization-wide">Organization-wide</option>
            <option value="network">Network/Coalition-wide</option>
          </select>
          {errors.impactScale && (
            <p className="mt-1 text-sm text-red-600">{errors.impactScale.message}</p>
          )}
        </div>

        {/* Use Case Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your specific use case
            <Tooltip
              content="Be specific about what problem you're trying to solve and how AI might help."
              type="info"
            />
          </label>
          <textarea
            {...register('initiativeDescription', {
              required: 'Please describe your use case',
              maxLength: {
                value: 500,
                message: 'Please keep your description under 500 characters'
              }
            })}
            className="input-field"
            rows={4}
            placeholder="Example: We want to use AI to analyze donor patterns and predict giving trends to improve our fundraising strategies. Currently, our team spends 20 hours per week on manual donor research..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {data.initiativeDescription?.length || 0}/500 characters
          </p>
          {errors.initiativeDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.initiativeDescription.message}</p>
          )}
        </div>

        {/* Expected Outcomes with Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would success look like?
            <Tooltip
              content="Select all outcomes you hope to achieve. These will shape our success metrics recommendations."
              type="info"
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {outcomeOptions.map((option) => (
              <label key={option.value} className="flex items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  value={option.value}
                  {...register('expectedOutcomes', {
                    validate: value => value.length > 0 || 'Please select at least one outcome'
                  })}
                  className="mt-0.5 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <div className="ml-3">
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                  <span className="block text-xs text-gray-500">{option.impact}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.expectedOutcomes && (
            <p className="mt-1 text-sm text-red-600">{errors.expectedOutcomes.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <motion.button
            type="button"
            onClick={onPrev}
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>
          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Step →
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedStepTwo;
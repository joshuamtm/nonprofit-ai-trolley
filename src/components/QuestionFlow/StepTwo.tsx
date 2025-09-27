import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { SessionData } from '../../types';

interface StepTwoProps {
  data: Partial<SessionData>;
  updateData: (data: Partial<SessionData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ data, updateData, onNext, onPrev }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      aiInitiativeType: data.aiInitiativeType || '',
      initiativeDescription: data.initiativeDescription || '',
      expectedOutcomes: data.expectedOutcomes || []
    }
  });

  const onSubmit = (formData: any) => {
    updateData({
      aiInitiativeType: formData.aiInitiativeType,
      initiativeDescription: formData.initiativeDescription,
      expectedOutcomes: formData.expectedOutcomes
    });
    onNext();
  };

  const outcomeOptions = [
    { value: 'serve_more', label: 'Serve more beneficiaries' },
    { value: 'reduce_time', label: 'Reduce response time' },
    { value: 'improve_quality', label: 'Improve decision quality' },
    { value: 'free_staff', label: 'Free up staff time' },
    { value: 'reduce_costs', label: 'Reduce costs' },
    { value: 'increase_access', label: 'Increase accessibility' },
    { value: 'generate_insights', label: 'Generate new insights' }
  ];

  return (
    <div className="card">
      <h2 className="mb-6">Step 2: AI Initiative Description</h2>
      <p className="text-gray-600 mb-6">
        Tell us about the AI initiative you're considering.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What type of AI initiative are you considering?
          </label>
          <select
            {...register('aiInitiativeType', { required: 'Please select an initiative type' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="data_analysis">Data Analysis & Insights</option>
            <option value="chatbot">Chatbot/Automated Response</option>
            <option value="content_generation">Content Generation</option>
            <option value="automation">Process Automation</option>
            <option value="decision_support">Decision Support System</option>
            <option value="other">Other</option>
          </select>
          {errors.aiInitiativeType && (
            <p className="mt-1 text-sm text-red-600">{errors.aiInitiativeType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your specific use case
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
            placeholder="e.g., We want to use AI to analyze donor patterns and predict giving trends to improve our fundraising strategies..."
          />
          {errors.initiativeDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.initiativeDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would success look like? (Select all that apply)
          </label>
          <div className="space-y-2">
            {outcomeOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  {...register('expectedOutcomes', {
                    validate: value => value.length > 0 || 'Please select at least one outcome'
                  })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
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

export default StepTwo;
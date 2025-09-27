import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { SessionData } from '../../types';

interface StepFourProps {
  data: Partial<SessionData>;
  updateData: (data: Partial<SessionData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ data, updateData, onNext, onPrev }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      currentCapacity: data.currentCapacity || '',
      problemUrgency: data.problemUrgency || '',
      stakeholderReadiness: data.stakeholderReadiness || ''
    }
  });

  const onSubmit = (formData: any) => {
    updateData({
      currentCapacity: formData.currentCapacity,
      problemUrgency: formData.problemUrgency,
      stakeholderReadiness: formData.stakeholderReadiness
    });
    onNext();
  };

  return (
    <div className="card">
      <h2 className="mb-6">Step 4: Risk Tolerance & Context</h2>
      <p className="text-gray-600 mb-6">
        Help us understand your current situation and readiness for change.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current capacity without AI?
          </label>
          <select
            {...register('currentCapacity', { required: 'Please select your current capacity' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="overwhelmed">We're overwhelmed and can't meet demand</option>
            <option value="stretched">We're managing but stretched thin</option>
            <option value="adequate">We're adequate but want to do more</option>
            <option value="exploring">We're exploring new capabilities</option>
          </select>
          {errors.currentCapacity && (
            <p className="mt-1 text-sm text-red-600">{errors.currentCapacity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How urgent is this problem?
          </label>
          <select
            {...register('problemUrgency', { required: 'Please select the urgency level' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="critical">Critical - immediate need</option>
            <option value="important">Important - near-term priority</option>
            <option value="exploratory">Exploratory - long-term planning</option>
          </select>
          {errors.problemUrgency && (
            <p className="mt-1 text-sm text-red-600">{errors.problemUrgency.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stakeholder readiness?
          </label>
          <select
            {...register('stakeholderReadiness', { required: 'Please select stakeholder readiness' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="eager">Eager to embrace AI</option>
            <option value="cautious">Cautiously optimistic</option>
            <option value="skeptical">Skeptical but open</option>
            <option value="resistant">Resistant to change</option>
          </select>
          {errors.stakeholderReadiness && (
            <p className="mt-1 text-sm text-red-600">{errors.stakeholderReadiness.message}</p>
          )}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Almost there!</strong> After this step, we'll review your inputs and generate your personalized ethical analysis.
              </p>
            </div>
          </div>
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
            Review & Generate →
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default StepFour;
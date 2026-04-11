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
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      currentCapacity: data.currentCapacity || '',
      problemUrgency: data.problemUrgency || '',
      stakeholderReadiness: data.stakeholderReadiness || '',
      technicalReadiness: data.technicalReadiness || 3,
      changeManagementCapacity: data.changeManagementCapacity || 3,
      ethicalFrameworkMaturity: data.ethicalFrameworkMaturity || 3,
      dataGovernanceStatus: data.dataGovernanceStatus || 3,
    }
  });

  const onSubmit = (formData: any) => {
    updateData({
      currentCapacity: formData.currentCapacity,
      problemUrgency: formData.problemUrgency,
      stakeholderReadiness: formData.stakeholderReadiness,
      technicalReadiness: parseInt(formData.technicalReadiness),
      changeManagementCapacity: parseInt(formData.changeManagementCapacity),
      ethicalFrameworkMaturity: parseInt(formData.ethicalFrameworkMaturity),
      dataGovernanceStatus: parseInt(formData.dataGovernanceStatus),
    });
    onNext();
  };

  const RatingScale = ({ name, labels }: { name: string; labels: [string, string] }) => {
    const value = watch(name as any);

    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500 w-16 text-right">{labels[0]}</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="cursor-pointer">
              <input
                type="radio"
                value={rating}
                {...register(name as any)}
                className="sr-only"
              />
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  parseInt(String(value)) === rating
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                {rating}
              </div>
            </label>
          ))}
        </div>
        <span className="text-xs text-gray-500 w-16">{labels[1]}</span>
      </div>
    );
  };

  return (
    <div className="card">
      <h2 className="mb-6">Step 4: Readiness & Context</h2>
      <p className="text-gray-600 mb-6">
        Help us understand your current situation and organizational readiness for change.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What best describes your current capacity without AI?
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
            How urgent is the problem you're trying to solve?
          </label>
          <select
            {...register('problemUrgency', { required: 'Please select the urgency level' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="critical">Critical — we need a solution now</option>
            <option value="important">Important — near-term priority</option>
            <option value="exploratory">Exploratory — long-term planning</option>
          </select>
          {errors.problemUrgency && (
            <p className="mt-1 text-sm text-red-600">{errors.problemUrgency.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you describe stakeholder readiness for AI?
          </label>
          <select
            {...register('stakeholderReadiness', { required: 'Please select stakeholder readiness' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="eager">Eager — leadership and staff are enthusiastic</option>
            <option value="cautious">Cautious — open but want to see evidence</option>
            <option value="skeptical">Skeptical — significant concerns exist</option>
            <option value="resistant">Resistant — active opposition to change</option>
          </select>
          {errors.stakeholderReadiness && (
            <p className="mt-1 text-sm text-red-600">{errors.stakeholderReadiness.message}</p>
          )}
        </div>

        {/* Readiness Assessment Scales */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Organizational Readiness</h3>
          <p className="text-sm text-gray-500 mb-4">
            Rate your organization on each dimension (1 = just starting, 5 = well established).
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical readiness
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Do you have the IT infrastructure, data systems, and technical staff to support AI tools?
              </p>
              <RatingScale name="technicalReadiness" labels={["Minimal", "Strong"]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Change management capacity
              </label>
              <p className="text-xs text-gray-500 mb-2">
                How well does your organization handle new processes, tools, and ways of working?
              </p>
              <RatingScale name="changeManagementCapacity" labels={["Struggles", "Thrives"]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ethical framework maturity
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Do you have policies or committees for evaluating ethical implications of technology?
              </p>
              <RatingScale name="ethicalFrameworkMaturity" labels={["None", "Robust"]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data governance
              </label>
              <p className="text-xs text-gray-500 mb-2">
                How well do you manage, protect, and organize your data? Do you have data policies?
              </p>
              <RatingScale name="dataGovernanceStatus" labels={["Ad hoc", "Mature"]} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Almost there!</strong> After this step, we'll analyze your responses and generate your personalized ethical analysis with specific recommendations.
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

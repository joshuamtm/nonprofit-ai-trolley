import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { SessionData } from '../../types';

interface StepThreeProps {
  data: Partial<SessionData>;
  updateData: (data: Partial<SessionData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ data, updateData, onNext, onPrev }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      environmentalImpact: data.primaryConcerns?.environmentalImpact || 3,
      jobDisplacement: data.primaryConcerns?.jobDisplacement || 3,
      ethicalBias: data.primaryConcerns?.ethicalBias || 3,
      dataPrivacy: data.primaryConcerns?.dataPrivacy || 3,
      humanDignity: data.primaryConcerns?.humanDignity || 3,
      accuracyErrors: data.primaryConcerns?.accuracyErrors || 3,
      techDependency: data.primaryConcerns?.techDependency || 3,
      biggestFears: data.biggestFears || []
    }
  });

  const concerns = [
    { key: 'environmentalImpact', label: 'Environmental impact of AI systems' },
    { key: 'jobDisplacement', label: 'Potential job displacement' },
    { key: 'ethicalBias', label: 'Algorithmic bias and fairness' },
    { key: 'dataPrivacy', label: 'Data privacy and security' },
    { key: 'humanDignity', label: 'Preserving human dignity' },
    { key: 'accuracyErrors', label: 'Accuracy and error rates' },
    { key: 'techDependency', label: 'Creating tech dependency' }
  ];

  const onSubmit = (formData: any) => {
    updateData({
      primaryConcerns: {
        environmentalImpact: parseInt(formData.environmentalImpact),
        jobDisplacement: parseInt(formData.jobDisplacement),
        ethicalBias: parseInt(formData.ethicalBias),
        dataPrivacy: parseInt(formData.dataPrivacy),
        humanDignity: parseInt(formData.humanDignity),
        accuracyErrors: parseInt(formData.accuracyErrors),
        techDependency: parseInt(formData.techDependency)
      },
      biggestFears: formData.biggestFears
    });
    onNext();
  };

  const RatingScale = ({ name }: { name: string }) => {
    const value = watch(name as any);

    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500 w-8">Low</span>
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
        <span className="text-xs text-gray-500 w-8">High</span>
      </div>
    );
  };

  return (
    <div className="card">
      <h2 className="mb-6">Step 3: Concerns Assessment</h2>
      <p className="text-gray-600 mb-6">
        Rate your level of concern for each potential issue (1=low, 5=high).
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {concerns.map((concern) => (
            <div key={concern.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {concern.label}
              </label>
              <RatingScale name={concern.key} />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What are your biggest fears if this goes wrong?
          </label>
          <div className="space-y-2">
            {[
              { value: 'harm_beneficiaries', label: 'Harm to beneficiaries' },
              { value: 'loss_trust', label: 'Loss of trust' },
              { value: 'mission_drift', label: 'Mission drift' },
              { value: 'staff_morale', label: 'Staff morale impact' },
              { value: 'resource_waste', label: 'Resource waste' },
              { value: 'other', label: 'Other' }
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  {...register('biggestFears', {
                    validate: value => value.length > 0 || 'Please select at least one fear'
                  })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.biggestFears && (
            <p className="mt-1 text-sm text-red-600">{errors.biggestFears.message}</p>
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

export default StepThree;
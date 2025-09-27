import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { SessionData } from '../../types';

interface StepOneProps {
  data: Partial<SessionData>;
  updateData: (data: Partial<SessionData>) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ data, updateData, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      organizationType: data.organizationType || '',
      organizationMission: data.organizationMission || ''
    }
  });

  const onSubmit = (formData: any) => {
    updateData({
      organizationType: formData.organizationType,
      organizationMission: formData.organizationMission
    });
    onNext();
  };

  return (
    <div className="card">
      <h2 className="mb-6">Step 1: Initiative Context</h2>
      <p className="text-gray-600 mb-6">
        Let's start by understanding your organization and its mission.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What type of organization are you?
          </label>
          <select
            {...register('organizationType', { required: 'Please select an organization type' })}
            className="input-field"
          >
            <option value="">Select an option...</option>
            <option value="environmental">Environmental/Conservation</option>
            <option value="health">Health/Human Services</option>
            <option value="education">Education/Youth Development</option>
            <option value="crisis">Crisis Support/Emergency Response</option>
            <option value="community">Community Development</option>
            <option value="other">Other</option>
          </select>
          {errors.organizationType && (
            <p className="mt-1 text-sm text-red-600">{errors.organizationType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            In one sentence, what's your organization's core mission?
          </label>
          <textarea
            {...register('organizationMission', {
              required: 'Please describe your mission',
              maxLength: {
                value: 200,
                message: 'Please keep your mission statement under 200 characters'
              }
            })}
            className="input-field"
            rows={3}
            placeholder="e.g., We provide emergency food assistance to families experiencing food insecurity..."
          />
          {errors.organizationMission && (
            <p className="mt-1 text-sm text-red-600">{errors.organizationMission.message}</p>
          )}
        </div>

        <div className="flex justify-end">
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

export default StepOne;
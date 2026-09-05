import React from 'react';
import { useForm } from 'react-hook-form';
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
      organizationSize: data.organizationSize || '',
      organizationMission: data.organizationMission || ''
    }
  });

  const onSubmit = (formData: any) => {
    updateData({
      organizationType: formData.organizationType,
      organizationSize: formData.organizationSize,
      organizationMission: formData.organizationMission
    });
    onNext();
  };

  return (
    <div className="mt-6">
      <p className="rubric hidden sm:block">Section 1 of 5 · your organisation</p>
      <h2 className="font-display font-semibold text-heading uppercase mt-1">Who is on the line</h2>
      <p className="font-serif text-[17px] mt-2 max-w-[58ch]">Three questions so the analysis is about your organisation and not a generic one.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-7">
        <div>
          <label htmlFor="organizationType" className="block font-serif text-[18px]">What kind of organisation are you?</label>
          <select id="organizationType" {...register('organizationType', { required: 'Choose the closest type' })} className="input-field mt-2 max-w-md">
            <option value="">Choose one</option>
            <option value="environmental">Environmental / conservation</option>
            <option value="health">Health / human services</option>
            <option value="education">Education / youth development</option>
            <option value="crisis">Crisis support / emergency response</option>
            <option value="community">Community development</option>
            <option value="arts">Arts / culture</option>
            <option value="advocacy">Advocacy / policy</option>
            <option value="faith">Faith-based</option>
            <option value="foundation">Foundation / grantmaker</option>
            <option value="other">Other</option>
          </select>
          {errors.organizationType && <p className="mt-1 text-[14px] text-signal">{errors.organizationType.message}</p>}
        </div>

        <div>
          <label htmlFor="organizationSize" className="block font-serif text-[18px]">Roughly, what is your annual budget?</label>
          <select id="organizationSize" {...register('organizationSize', { required: 'Choose a range' })} className="input-field mt-2 max-w-md">
            <option value="">Choose a range</option>
            <option value="small">Under $2 million</option>
            <option value="medium">$2 million to $15 million</option>
            <option value="large">$15 million to $50 million</option>
            <option value="enterprise">Over $50 million</option>
          </select>
          {errors.organizationSize && <p className="mt-1 text-[14px] text-signal">{errors.organizationSize.message}</p>}
        </div>

        <div>
          <label htmlFor="organizationMission" className="block font-serif text-[18px]">In one sentence, what is your mission?</label>
          <textarea id="organizationMission"
            {...register('organizationMission', {
              required: 'One sentence is enough',
              maxLength: { value: 300, message: 'Keep it under 300 characters' }
            })}
            className="input-field mt-2" rows={3}
            placeholder="We provide emergency food assistance to families experiencing food insecurity in the Bronx." />
          {errors.organizationMission && <p className="mt-1 text-[14px] text-signal">{errors.organizationMission.message}</p>}
        </div>

        <div className="hairline pt-5 flex justify-end">
          <button type="submit" className="btn-panel">Next, section 2</button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;

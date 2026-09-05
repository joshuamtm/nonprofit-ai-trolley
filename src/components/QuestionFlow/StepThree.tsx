import React from 'react';
import { useForm } from 'react-hook-form';
import { SessionData } from '../../types';
import LampScale from '../LampScale';

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
    { key: 'dataPrivacy', label: 'How concerned are you about data privacy and security?' },
    { key: 'ethicalBias', label: 'About bias and fairness in what the system decides or suggests?' },
    { key: 'accuracyErrors', label: 'About wrong answers reaching someone who trusted them?' },
    { key: 'humanDignity', label: 'About losing the human connection in your work?' },
    { key: 'jobDisplacement', label: 'About what it means for staff jobs?' },
    { key: 'techDependency', label: 'About depending on a vendor you do not control?' },
    { key: 'environmentalImpact', label: 'About the environmental cost of running AI?' },
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

  return (
    <div className="mt-6">
      <p className="rubric hidden sm:block">Section 3 of 5 · your concerns</p>
      <h2 className="font-display font-semibold text-heading uppercase mt-1">What worries you</h2>
      <p className="font-serif text-[17px] mt-2 max-w-[58ch]">Rate each one. Your highest concerns become the labels on the "don't pull" track in the analysis, because they are what the status quo is already carrying.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-7">
        {concerns.map((c) => (
          <div key={c.key} className="hairline pt-4 first:border-t-0 first:pt-0">
            <p className="font-serif text-[18px]" id={`q-${c.key}`}>{c.label}</p>
            <LampScale name={c.key} value={watch(c.key as any)} register={register} low="Not a worry" high="Keeps me up at night" ariaLabel={c.label} />
          </div>
        ))}

        <div className="rule-top pt-5">
          <p className="font-serif text-[18px]">If this went wrong, what would hurt most?</p>
          <p className="text-[14px] text-ink-soft mt-1">Choose any that apply.</p>
          <div className="mt-2 max-w-md">
            {[
              { value: 'harm_beneficiaries', label: 'Harm to the people we serve' },
              { value: 'loss_trust', label: 'Loss of trust' },
              { value: 'mission_drift', label: 'Mission drift' },
              { value: 'staff_morale', label: 'Staff morale' },
              { value: 'resource_waste', label: 'Wasted money and time' },
              { value: 'other', label: 'Something else' }
            ].map((option) => (
              <label key={option.value} className="choice">
                <input type="checkbox" value={option.value}
                  {...register('biggestFears', { validate: value => value.length > 0 || 'Choose at least one' })} />
                <span className="text-[16px]">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.biggestFears && <p className="mt-1 text-[14px] text-signal">{errors.biggestFears.message}</p>}
        </div>

        <div className="hairline pt-5 flex justify-between">
          <button type="button" onClick={onPrev} className="btn-outline">Back, section 2</button>
          <button type="submit" className="btn-panel">Next, section 4</button>
        </div>
      </form>
    </div>
  );
};

export default StepThree;

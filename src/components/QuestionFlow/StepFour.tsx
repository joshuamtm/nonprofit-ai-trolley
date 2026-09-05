import React from 'react';
import { useForm } from 'react-hook-form';
import { SessionData } from '../../types';
import LampScale from '../LampScale';

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

  const scales: { name: string; q: string; note: string; low: string; high: string }[] = [
    { name: 'technicalReadiness', q: 'Technical readiness', note: 'Do you have the systems, the data, and the people to run an AI tool?', low: 'Minimal', high: 'Strong' },
    { name: 'changeManagementCapacity', q: 'Change capacity', note: 'How well does the organisation take on new tools and ways of working?', low: 'Struggles', high: 'Thrives' },
    { name: 'ethicalFrameworkMaturity', q: 'Ethics practice', note: 'Is there a policy, a committee, or a habit of weighing the ethics of new technology?', low: 'None', high: 'Established' },
    { name: 'dataGovernanceStatus', q: 'Data governance', note: 'How well do you manage, protect, and organise your data?', low: 'Ad hoc', high: 'Mature' },
  ];

  return (
    <div className="mt-6">
      <p className="rubric hidden sm:block">Section 4 of 5 · readiness</p>
      <h2 className="font-display font-semibold text-heading uppercase mt-1">The state of the line</h2>
      <p className="font-serif text-[17px] mt-2 max-w-[58ch]">Where you are today, and how ready the organisation is to change. These decide whether the analysis leans toward a bold move or a careful one.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-7">
        <div>
          <label htmlFor="currentCapacity" className="block font-serif text-[18px]">How is capacity today, without AI?</label>
          <select id="currentCapacity" {...register('currentCapacity', { required: 'Choose one' })} className="input-field mt-2 max-w-md">
            <option value="">Choose one</option>
            <option value="overwhelmed">Overwhelmed; we cannot meet demand</option>
            <option value="stretched">Managing, but stretched thin</option>
            <option value="adequate">Adequate, and we want to do more</option>
            <option value="exploring">Fine; we are exploring new capabilities</option>
          </select>
          {errors.currentCapacity && <p className="mt-1 text-[14px] text-signal">{errors.currentCapacity.message}</p>}
        </div>

        <div>
          <label htmlFor="problemUrgency" className="block font-serif text-[18px]">How urgent is the problem you want to solve?</label>
          <select id="problemUrgency" {...register('problemUrgency', { required: 'Choose one' })} className="input-field mt-2 max-w-md">
            <option value="">Choose one</option>
            <option value="critical">Critical; we need something now</option>
            <option value="important">Important; a near-term priority</option>
            <option value="exploratory">Exploratory; longer-term planning</option>
          </select>
          {errors.problemUrgency && <p className="mt-1 text-[14px] text-signal">{errors.problemUrgency.message}</p>}
        </div>

        <div>
          <label htmlFor="stakeholderReadiness" className="block font-serif text-[18px]">How do leadership and staff feel about AI?</label>
          <select id="stakeholderReadiness" {...register('stakeholderReadiness', { required: 'Choose one' })} className="input-field mt-2 max-w-md">
            <option value="">Choose one</option>
            <option value="eager">Eager; leadership and staff are enthusiastic</option>
            <option value="cautious">Cautious; open, but want to see evidence</option>
            <option value="skeptical">Skeptical; significant concerns</option>
            <option value="resistant">Resistant; active opposition</option>
          </select>
          {errors.stakeholderReadiness && <p className="mt-1 text-[14px] text-signal">{errors.stakeholderReadiness.message}</p>}
        </div>

        <div className="rule-top pt-5">
          <p className="rubric">Organisational readiness · 1 is just starting, 5 is well established</p>
          <div className="mt-3 space-y-6">
            {scales.map((s) => (
              <div key={s.name}>
                <p className="font-serif text-[18px]">{s.q}</p>
                <p className="text-[14px] text-ink-soft mt-0.5">{s.note}</p>
                <LampScale name={s.name} value={watch(s.name as any)} register={register} low={s.low} high={s.high} ariaLabel={s.q} />
              </div>
            ))}
          </div>
        </div>

        <p className="hairline pt-4 font-serif text-[16px] text-ink-soft max-w-[58ch]">
          After this section the line reaches the facing point. The analysis draws all three roads, marks one, and shows what the "don't pull" road is already carrying.
        </p>

        <div className="hairline pt-5 flex justify-between">
          <button type="button" onClick={onPrev} className="btn-outline">Back, section 3</button>
          <button type="submit" className="btn-panel">To the analysis</button>
        </div>
      </form>
    </div>
  );
};

export default StepFour;

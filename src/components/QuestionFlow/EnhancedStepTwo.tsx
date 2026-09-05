import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SessionData } from "../../types";
import WhyThisMatters from "../WhyThisMatters";

interface EnhancedStepTwoProps {
  data: Partial<SessionData>;
  updateData: (data: Partial<SessionData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const EnhancedStepTwo: React.FC<EnhancedStepTwoProps> = ({ data, updateData, onNext, onPrev }) => {
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      aiInitiativeTypes: data.aiInitiativeTypes || [],
      initiativeDescription: data.initiativeDescription || "",
      expectedOutcomes: data.expectedOutcomes || [],
      implementationTimeline: data.implementationTimeline || "",
      impactScale: data.impactScale || "",
      explorationStage: data.explorationStage || "evaluating",
    },
  });

  const toggleExpanded = (type: string) => {
    setExpandedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const aiTypes = [
    { value: "data_analysis", label: "Data analysis and insight", description: "AI that reads the data you already have to find patterns and predict trends", examples: ["Donor behaviour analysis to predict major-gift likelihood", "Programme outcome analysis to find what drives success", "Resource allocation based on impact data"] },
    { value: "chatbot", label: "Chatbot or automated answers", description: "A conversational assistant for the people you serve or your volunteers", examples: ["After-hours help line for people seeking resources", "Automated answers to volunteer questions", "First-pass screening for service eligibility"] },
    { value: "content_generation", label: "Drafting and content", description: "AI that drafts reports, letters, and communications for a person to finish", examples: ["Grant proposal first drafts", "Personalised donor thank-you letters", "Social media posts"] },
    { value: "automation", label: "Process automation", description: "AI that takes over repetitive tasks and hand-offs", examples: ["Data entry from forms and documents", "Email sorting and routing", "Expense report processing"] },
    { value: "decision_support", label: "Decision support", description: "AI that recommends, and a person decides", examples: ["Client risk assessment and intervention suggestions", "Grant application scoring", "Matching participants to programmes"] },
    { value: "other", label: "Something else", description: "An AI use not listed here", examples: [] },
  ];

  const outcomeOptions = [
    { value: "serve_more", label: "Serve more people", impact: "capacity" },
    { value: "reduce_time", label: "Respond faster", impact: "efficiency" },
    { value: "improve_quality", label: "Make better decisions", impact: "effectiveness" },
    { value: "free_staff", label: "Free up staff time", impact: "people" },
    { value: "reduce_costs", label: "Cut operating costs", impact: "money" },
    { value: "increase_revenue", label: "Raise more money", impact: "money" },
    { value: "increase_access", label: "Widen access", impact: "equity" },
    { value: "generate_insights", label: "Learn something new from our data", impact: "insight" },
  ];

  const description = watch("initiativeDescription");

  const onSubmit = (formData: any) => {
    updateData({
      aiInitiativeTypes: formData.aiInitiativeTypes,
      initiativeDescription: formData.initiativeDescription,
      expectedOutcomes: formData.expectedOutcomes,
      implementationTimeline: formData.implementationTimeline,
      impactScale: formData.impactScale,
      explorationStage: formData.explorationStage,
    });
    onNext();
  };

  return (
    <div className="mt-6">
      <p className="rubric hidden sm:block">Section 2 of 5 · the AI initiative</p>
      <h2 className="font-display font-semibold text-heading uppercase mt-1">What you are weighing</h2>
      <p className="font-serif text-[17px] mt-2 max-w-[58ch]">The initiative itself, what success would look like, and how far along you are.</p>

      <WhyThisMatters
        content="The type of AI and the outcomes you name shape the risks the analysis flags, the safeguards it recommends, and the size of the planning-band budget."
        influences={["timeline", "resources", "safeguards", "budget band"]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-7">
        {/* Stage */}
        <div>
          <p className="font-serif text-[18px]">Where are you in this?</p>
          <div className="mt-2 max-w-xl">
            {[
              { value: 'exploring', label: 'Exploring', description: 'Curious about AI, no specific initiative yet' },
              { value: 'evaluating', label: 'Evaluating', description: 'Weighing a specific initiative' },
              { value: 'ready', label: 'Ready to act', description: 'Research done; I want a decision framework' },
            ].map((stage) => (
              <label key={stage.value} className="choice">
                <input type="radio" value={stage.value} {...register('explorationStage')} />
                <span><span className="text-[16px] font-medium">{stage.label}</span><span className="block text-[14px] text-ink-soft">{stage.description}</span></span>
              </label>
            ))}
          </div>
        </div>

        {/* Types */}
        <div>
          <p className="font-serif text-[18px]">What kind of AI are you considering?</p>
          <p className="text-[14px] text-ink-soft mt-0.5">Choose any that apply. "Examples" shows what each one looks like in practice.</p>
          <div className="mt-2 max-w-xl">
            {aiTypes.map((type) => (
              <div key={type.value} className="border-b border-rule py-2.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" value={type.value}
                    {...register("aiInitiativeTypes", { validate: (value) => value.length > 0 || "Choose at least one" })}
                    className="mt-1 h-4 w-4 border-2 border-ink text-ink bg-paper-light focus:ring-0 focus:ring-offset-0 rounded-none" />
                  <span className="flex-1">
                    <span className="text-[16px] font-medium">{type.label}</span>
                    <span className="block text-[14px] text-ink-soft">{type.description}</span>
                  </span>
                </label>
                {type.examples.length > 0 && (
                  <div className="pl-7 mt-1">
                    <button type="button" onClick={() => toggleExpanded(type.value)} aria-expanded={expandedTypes.includes(type.value)}
                      className="font-display text-[12px] uppercase tracking-[0.08em] text-ink underline underline-offset-4 decoration-1 hover:text-signal">
                      {expandedTypes.includes(type.value) ? "Hide examples" : "Examples"}
                    </button>
                    {expandedTypes.includes(type.value) && (
                      <ul className="mt-1.5 text-[14px] text-ink-soft space-y-0.5 list-disc pl-4">
                        {type.examples.map((example, idx) => <li key={idx}>{example}</li>)}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {errors.aiInitiativeTypes && <p className="mt-1 text-[14px] text-signal">{errors.aiInitiativeTypes.message as string}</p>}
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="implementationTimeline" className="block font-serif text-[18px]">When would it need to be running?</label>
          <select id="implementationTimeline" {...register("implementationTimeline", { required: "Choose a timeline" })} className="input-field mt-2 max-w-md">
            <option value="">Choose one</option>
            <option value="immediate">Within a month</option>
            <option value="3months">One to three months</option>
            <option value="6months">Three to six months</option>
            <option value="1year">Six to twelve months</option>
            <option value="future">More than a year out</option>
          </select>
          {errors.implementationTimeline && <p className="mt-1 text-[14px] text-signal">{errors.implementationTimeline.message as string}</p>}
        </div>

        {/* Scale */}
        <div>
          <label htmlFor="impactScale" className="block font-serif text-[18px]">How widely would it be used?</label>
          <select id="impactScale" {...register("impactScale", { required: "Choose a scale" })} className="input-field mt-2 max-w-md">
            <option value="">Choose one</option>
            <option value="pilot">A pilot: one team or programme</option>
            <option value="department">One department</option>
            <option value="organization-wide">The whole organisation</option>
            <option value="network">A network or coalition</option>
          </select>
          {errors.impactScale && <p className="mt-1 text-[14px] text-signal">{errors.impactScale.message as string}</p>}
        </div>

        {/* Use case */}
        <div>
          <label htmlFor="initiativeDescription" className="block font-serif text-[18px]">Describe the use case in a few sentences</label>
          <p className="text-[14px] text-ink-soft mt-0.5">What problem, for whom, and how AI might help. Specific beats polished.</p>
          <textarea id="initiativeDescription"
            {...register("initiativeDescription", { required: "A few sentences are enough", maxLength: { value: 500, message: "Keep it under 500 characters" } })}
            className="input-field mt-2" rows={4}
            placeholder="Our intake team spends about twenty hours a week answering the same benefits questions. We want an assistant that drafts answers for a caseworker to check before anything goes out." />
          <p className="font-mono text-[12px] text-ink-soft mt-1">{description?.length || 0} of 500 characters</p>
          {errors.initiativeDescription && <p className="mt-1 text-[14px] text-signal">{errors.initiativeDescription.message as string}</p>}
        </div>

        {/* Outcomes */}
        <div>
          <p className="font-serif text-[18px]">What would success look like?</p>
          <p className="text-[14px] text-ink-soft mt-0.5">Choose any that apply. Each becomes a measure in the plan, set against your own baseline.</p>
          <div className="mt-2 grid sm:grid-cols-2 gap-x-8 max-w-2xl">
            {outcomeOptions.map((option) => (
              <label key={option.value} className="choice">
                <input type="checkbox" value={option.value}
                  {...register("expectedOutcomes", { validate: (value) => value.length > 0 || "Choose at least one" })} />
                <span><span className="text-[16px]">{option.label}</span><span className="block font-mono text-[12px] text-ink-soft">{option.impact}</span></span>
              </label>
            ))}
          </div>
          {errors.expectedOutcomes && <p className="mt-1 text-[14px] text-signal">{errors.expectedOutcomes.message as string}</p>}
        </div>

        <div className="hairline pt-5 flex justify-between">
          <button type="button" onClick={onPrev} className="btn-outline">Back, section 1</button>
          <button type="submit" className="btn-panel">Next, section 3</button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedStepTwo;

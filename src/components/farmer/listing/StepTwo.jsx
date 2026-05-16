function StepTwo({ register, errors }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg">Pitch & Story</h3>
      <div>
        <label className="font-semibold label-text">Pitch Title *</label>
        <input
          {...register("pitchTitle")}
          maxLength={120}
          className="mt-1.5 rounded-xl w-full input input-bordered"
          placeholder="e.g. Premium Teff Harvest 2026"
        />
        {errors.pitchTitle && (
          <p className="mt-1 text-[11px] text-error">
            {errors.pitchTitle.message}
          </p>
        )}
      </div>
      <div>
        <label className="font-semibold label-text">Pitch Text *</label>
        <textarea
          {...register("pitchText")}
          rows={5}
          maxLength={3000}
          className="mt-1.5 rounded-xl w-full textarea textarea-bordered"
          placeholder="Describe the opportunity, your experience, and the plan (50–3000 chars)"
        />
        {errors.pitchText && (
          <p className="mt-1 text-[11px] text-error">
            {errors.pitchText.message}
          </p>
        )}
      </div>
      <div>
        <label className="font-semibold label-text">Use of Funds *</label>
        <textarea
          {...register("useOfFunds")}
          rows={3}
          maxLength={2000}
          className="mt-1.5 rounded-xl w-full textarea textarea-bordered"
          placeholder="How will the raised capital be deployed? (30–2000 chars)"
        />
        {errors.useOfFunds && (
          <p className="mt-1 text-[11px] text-error">
            {errors.useOfFunds.message}
          </p>
        )}
      </div>
      <div>
        <label className="font-semibold label-text">Risk Factors *</label>
        <textarea
          {...register("riskFactors")}
          rows={3}
          maxLength={2000}
          className="mt-1.5 rounded-xl w-full textarea textarea-bordered"
          placeholder="Disclose key risks: weather, market price, pests, etc. (30–2000 chars)"
        />
        {errors.riskFactors && (
          <p className="mt-1 text-[11px] text-error">
            {errors.riskFactors.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default StepTwo;

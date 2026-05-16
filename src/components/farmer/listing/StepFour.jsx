function StepFour({ terms, setTerms }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg">Legal & Compliance</h3>
      <label className="flex items-start gap-3 p-4 border border-base-300 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 checkbox checkbox-primary"
          checked={terms.tnc}
          onChange={(e) => setTerms({ ...terms, tnc: e.target.checked })}
        />
        <span className="text-sm">
          I confirm that all information provided is accurate and verifiable.
        </span>
      </label>
      <label className="flex items-start gap-3 p-4 border border-base-300 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 checkbox checkbox-primary"
          checked={terms.risk}
          onChange={(e) => setTerms({ ...terms, risk: e.target.checked })}
        />
        <span className="text-sm">
          I understand that 20 credits will be deducted on submission and
          refunded if creation fails.
        </span>
      </label>
      <label className="flex items-start gap-3 p-4 border border-base-300 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 checkbox checkbox-primary"
          checked={terms.agree}
          onChange={(e) => setTerms({ ...terms, agree: e.target.checked })}
        />
        <span className="text-sm">
          I agree to the{" "}
          <a className="text-primary underline">Farmers Agreement</a> and risk
          disclosure.
        </span>
      </label>
    </div>
  );
}

export default StepFour;

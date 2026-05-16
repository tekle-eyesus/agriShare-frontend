function Footer({
  close,
  step,
  setStep,
  totalSteps,
  canContinue,
  submit,
  isPending,
}) {
  return (
    <div className="flex justify-between items-center w-full">
      <button onClick={close} className="btn btn-ghost btn-sm">
        Cancel
      </button>
      <div className="flex gap-2">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="btn-outline btn btn-sm"
            disabled={isPending}
          >
            Back
          </button>
        )}
        {step < totalSteps && (
          <button
            onClick={() => setStep(step + 1)}
            className="btn btn-primary btn-sm"
            disabled={!canContinue || isPending}
          >
            Continue
          </button>
        )}
        {step === totalSteps && (
          <>
            {/* <button
              onClick={() => {
                toast.message("Saved as draft");
                close();
              }}
              className="btn-outline btn btn-sm"
              disabled={isPending}
            >
              Save Draft
            </button> */}
            <button
              onClick={submit}
              disabled={isPending}
              className="btn btn-primary btn-sm"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit for Verification"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Footer from "./Footer";
import StepFive from "./StepFive";
import StepOne from "./StepOne";
import Stepper from "./Stepper";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import Modal from "../Modal";
import StepFour from "./StepFour";
import { listingFormSchema } from "../../../validations/listingSchema";
import { useAPI } from "../../../hook/useApi";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const INITIAL_FORM = {
  assetId: "",
  investmentGoalBirr: "",
  sharesToSellPercent: "",
  expectedTotalYieldBirr: "",
  pitchTitle: "",
  pitchText: "",
  useOfFunds: "",
  riskFactors: "",
  investmentDeadline: "",
  payoutMode: "fixed",
  paydayDate: "",
  payoffDaysFromRelease: "",
  minSharesPerInvestor: 1,
};
//TODO: errors like we got undefined for this field is not displayed for the user
function CreateListingWizard({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [terms, setTerms] = useState({ tnc: false, risk: false, agree: false });
  const totalSteps = 5;
  const { farmer } = useAPI();
  const queryClient = useQueryClient();

  const { data: assetsData } = useSuspenseQuery({
    queryKey: ["farmer-assets"],
    queryFn: () => farmer.getAssets(),
  });
  const allAssets = assetsData?.data?.assets || [];
  const verifiedAssets = allAssets.filter((a) => a.status === "verified");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(listingFormSchema),
    defaultValues: INITIAL_FORM,
  });
  const formValues = watch();

  const handleReset = () => {
    setStep(1);
    setSelectedAsset(null);
    reset();
    setTerms({ tnc: false, risk: false, agree: false });
  };
  const close = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  // Derived values matching controller logic
  const goal = Number(formValues.investmentGoalBirr) || 0;
  const sharesPct = Number(formValues.sharesToSellPercent) || 0;
  const sharesToSell = Math.round(100 * (sharesPct / 100)); // == sharesPct, mirrors backend
  const sharePrice = sharesToSell > 0 ? goal / sharesToSell : 0;
  const expectedYield = Number(formValues.expectedTotalYieldBirr) || 0;
  const projectedRoiPct = goal > 0 ? ((expectedYield - goal) / goal) * 100 : 0;

  // Step-level validation using formState.errors
  const step2Valid =
    !errors.pitchTitle &&
    !errors.pitchText &&
    !errors.useOfFunds &&
    !errors.riskFactors;

  const deadlineDate = formValues.investmentDeadline
    ? new Date(formValues.investmentDeadline)
    : null;
  const paydayDate = formValues.paydayDate
    ? new Date(formValues.paydayDate)
    : null;
  const payoutValid =
    formValues.payoutMode === "fixed"
      ? !!paydayDate && !!deadlineDate && paydayDate > deadlineDate
      : Number(formValues.payoffDaysFromRelease) >= 1;
  const step3Valid =
    !errors.investmentGoalBirr &&
    !errors.sharesToSellPercent &&
    !errors.expectedTotalYieldBirr &&
    !errors.investmentDeadline &&
    !errors.payoutMode &&
    !errors.paydayDate &&
    !errors.payoffDaysFromRelease &&
    !errors.minSharesPerInvestor &&
    payoutValid;

  const canContinue =
    (step === 1 && !!formValues.assetId) ||
    (step === 2 && step2Valid) ||
    (step === 3 && step3Valid) ||
    (step === 4 && terms.tnc && terms.risk && terms.agree);

  const createListingMutation = useMutation({
    mutationFn: (data) =>
      farmer.createListing({ assetId: formValues.assetId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["farmer-dashboard"]);
      queryClient.invalidateQueries(["listings"]);
      toast.success("Listing submitted! Review takes 24–48 hours.");
      close();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create listing");
    },
  });

  const submit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const data = getValues();
    const payload = {
      investmentGoalBirr: Number(data.investmentGoalBirr),
      sharesToSellPercent: Number(data.sharesToSellPercent),
      expectedTotalYieldBirr: Number(data.expectedTotalYieldBirr),
      pitchTitle: data.pitchTitle.trim(),
      pitchText: data.pitchText.trim(),
      useOfFunds: data.useOfFunds.trim(),
      riskFactors: data.riskFactors.trim(),
      investmentDeadline: new Date(data.investmentDeadline).toISOString(),
      payoutMode: data.payoutMode,
      ...(data.payoutMode === "fixed"
        ? { paydayDate: new Date(data.paydayDate).toISOString() }
        : { payoffDaysFromRelease: Number(data.payoffDaysFromRelease) }),
      minSharesPerInvestor: Number(data.minSharesPerInvestor) || 1,
    };
    createListingMutation.mutate(payload);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      size="xl"
      title="Create New Listing"
      footer={
        <Footer
          close={close}
          step={step}
          setStep={setStep}
          totalSteps={totalSteps}
          canContinue={canContinue}
          submit={submit}
          isPending={createListingMutation.isPending}
        />
      }
    >
      <div className="p-6">
        <Stepper totalSteps={totalSteps} step={step} />

        {step === 1 && (
          <StepOne
            verifiedAssets={verifiedAssets}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            setValue={setValue}
          />
        )}

        {step === 2 && <StepTwo register={register} errors={errors} />}

        {step === 3 && (
          <StepThree
            register={register}
            errors={errors}
            watch={watch}
            projectedRoiPct={projectedRoiPct}
            sharesToSell={sharesToSell}
            sharePrice={sharePrice}
            goal={goal}
          />
        )}

        {step === 4 && <StepFour terms={terms} setTerms={setTerms} />}

        {step === 5 && (
          <StepFive
            verifiedAssets={verifiedAssets}
            formValues={formValues}
            goal={goal}
            sharesPct={sharesPct}
            sharesToSell={sharesToSell}
            sharePrice={sharePrice}
            expectedYield={expectedYield}
            projectedRoiPct={projectedRoiPct}
          />
        )}
      </div>
    </Modal>
  );
}

export default CreateListingWizard;

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { farmerVerificationSchema } from "../../../form-schema/verificationSchema";
import ImageUpload from "../../ImageUpload";
import toast from "react-hot-toast";

//TODO: after successful submission update verification status to pending,make it automatic by invalidating queries
//TODO: also when they have pending request they have no access to logout or any thing
export default function FarmerVerificationForm({
  defaultValues,
  onSubmit,
  isLoading,
  verificationStatus,
  verificationRejectionReason,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(farmerVerificationSchema),
    defaultValues: {
      faydaIdNumber: defaultValues?.faydaIdNumber ?? "",
      idFrontImage: defaultValues?.idFrontImage ?? null,
      idBackImage: defaultValues?.idBackImage ?? null,
      selfieImage: defaultValues?.selfieImage ?? null,
    },
    mode: "onBlur",
  });

  const submitVerificationMutation = useMutation({
    mutationFn: async (data) => {
      const fd = new FormData();
      fd.append("faydaIdNumber", data.faydaIdNumber);
      if (data.idFrontImage instanceof File)
        fd.append("idFrontImage", data.idFrontImage);
      else if (typeof data.idFrontImage === "string")
        fd.append("idFrontImageUrl", data.idFrontImage);
      if (data.idBackImage instanceof File)
        fd.append("idBackImage", data.idBackImage);
      else if (typeof data.idBackImage === "string")
        fd.append("idBackImageUrl", data.idBackImage);
      if (data.selfieImage instanceof File)
        fd.append("selfieImage", data.selfieImage);
      else if (typeof data.selfieImage === "string")
        fd.append("selfieImageUrl", data.selfieImage);

      return onSubmit(fd);
    },
    onSuccess: () => {
      toast.success("Verification submitted", {
        description: "We'll review your documents within 24–48 hours.",
      });
      //TODO: Update verification status to pending,make it automatic by invalidating queries
      // This would normally be done by the API response
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast.error("Failed to submit verification", {
        description: "Please try again.",
      });
    },
  });

  const submit = async (values) => {
    submitVerificationMutation.mutate(values);
  };

  const loading =
    isLoading || isSubmitting || submitVerificationMutation.isPending;
  return (
    <>
      {verificationStatus === "rejected" && verificationRejectionReason && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 mb-4 p-4 border border-red-200 rounded-lg text-red-800"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">
                Verification Rejected
              </h3>
              <p className="mt-1 text-red-700 text-sm">
                Reason: {verificationRejectionReason}
              </p>
              <p className="mt-2 text-red-600 text-xs">
                Please update the highlighted information and resubmit your
                verification.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      <form onSubmit={handleSubmit(submit)} className="space-y-6" noValidate>
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 shadow-sm border border-base-300 card"
        >
          <div className="p-5 sm:p-6 card-body">
            <div className="flex items-start gap-3 mb-5">
              <div className="place-items-center grid bg-primary/10 rounded-xl w-10 h-10 shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg leading-tight">
                  Identity details
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter the Fayda ID number exactly as printed on your card.
                </p>
              </div>
            </div>

            <div className="w-full max-w-md form-control">
              <label htmlFor="faydaIdNumber" className="pb-1.5 label">
                <span className="font-medium text-sm label-text">
                  Fayda ID Number <span className="text-error">*</span>
                </span>
              </label>
              <input
                id="faydaIdNumber"
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="FAYDA-XXXXXXX"
                disabled={verificationStatus === "pending"}
                aria-invalid={!!errors.faydaIdNumber}
                {...register("faydaIdNumber", {
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase();
                  },
                })}
                className={`input input-bordered w-full rounded-xl tracking-wider font-mono ${
                  errors.faydaIdNumber ? "input-error" : ""
                } ${verificationStatus !== "unverified" ? "opacity-50" : ""}`}
              />
              {errors.faydaIdNumber && (
                <p className="flex items-center gap-1 mt-1.5 text-error text-xs">
                  <AlertCircle className="w-3 h-3" />{" "}
                  {errors.faydaIdNumber.message}
                </p>
              )}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-base-100 shadow-sm border border-base-300 card"
        >
          <div className="p-5 sm:p-6 card-body">
            <div className="mb-5">
              <h2 className="font-display font-bold text-lg leading-tight">
                Document uploads
              </h2>
              <p className="text-muted-foreground text-sm">
                Upload clear, well-lit photos. All four corners must be visible.
              </p>
            </div>

            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Controller
                control={control}
                name="idFrontImage"
                render={({ field }) => (
                  <ImageUpload
                    label="Fayda ID — Front"
                    required={verificationStatus === "unverified"}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.idFrontImage?.message}
                    hint={
                      verificationStatus === "pending"
                        ? "Document already submitted"
                        : verificationStatus !== "unverified"
                          ? "Cannot upload when not unverified"
                          : "Front side"
                    }
                    disabled={verificationStatus === "pending"}
                  />
                )}
              />
              <Controller
                control={control}
                name="idBackImage"
                render={({ field }) => (
                  <ImageUpload
                    label="Fayda ID — Back"
                    required={verificationStatus === "unverified"}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.idBackImage?.message}
                    hint={
                      verificationStatus === "pending"
                        ? "Document already submitted"
                        : verificationStatus !== "unverified"
                          ? "Cannot upload when not unverified"
                          : "Back side"
                    }
                    disabled={verificationStatus === "pending"}
                  />
                )}
              />
              <Controller
                control={control}
                name="selfieImage"
                render={({ field }) => (
                  <ImageUpload
                    label="Selfie with ID"
                    required={verificationStatus === "unverified"}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.selfieImage?.message}
                    hint={
                      verificationStatus === "pending"
                        ? "Document already submitted"
                        : verificationStatus !== "unverified"
                          ? "Cannot upload when not unverified"
                          : "Optional but recommended"
                    }
                    disabled={verificationStatus === "pending"}
                  />
                )}
              />
            </div>
          </div>
        </motion.section>

        <div className="flex sm:flex-row flex-col-reverse sm:justify-end gap-3">
          <button
            type="reset"
            disabled={loading}
            className="normal-case btn btn-ghost"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading || verificationStatus === "pending"}
            className="gap-2 min-w-[200px] normal-case btn btn-primary"
          >
            {submitVerificationMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Submit for verification
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

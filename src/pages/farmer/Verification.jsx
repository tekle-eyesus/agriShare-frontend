import { useState } from "react";
import { motion } from "framer-motion";
import FarmerVerificationForm from "../../components/farmer/verification/FarmerVerificationForm";
import VerificationLayout from "../../components/layout/VerificationLayout";
import { useAuthStore } from "../../store/useAuth";
import { farmerApi } from "../../api/farmer";
//TODO: remove the overlapping box when we are in a pending state
export default function FarmerVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const { authUser: farmer } = useAuthStore();
  const isPending = farmer?.verificationStatus === "pending";
  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Check if user already has a pending verification
      if (farmer?.verificationStatus === "pending") {
        alert(
          "You already have a pending verification. Please wait for admin review.",
        );
        return;
      }

      // Submit new verification
      const response = await farmerApi().submitVerification(data);
      // await checkAuth();
      //TODO: after successful submission invalidate the data
      console.log(
        "Submitting verification:",
        Object.fromEntries(data.entries()),
      );

      // Update user verification status in store based on API response
      const { updateProfile } = useAuthStore.getState();
      if (response.data.status === "verified") {
        await updateProfile({
          ...farmer,
          verificationStatus: "verified",
        });
      } else if (response.data.status === "rejected") {
        await updateProfile({
          ...farmer,
          verificationStatus: "unverified",
        });
      }
    } catch (error) {
      console.error("Verification submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VerificationLayout
      title="Farmer Verification"
      subtitle="Verify your identity with your Fayda National ID to start tokenizing assets and accepting investments."
      isPending={isPending}
    >
      <div className="space-y-6 mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-2 font-semibold badge ${
                farmer?.verificationStatus === "unverified"
                  ? "badge-warning"
                  : farmer?.verificationStatus === "pending"
                    ? "badge-info"
                    : farmer?.verificationStatus === "verified"
                      ? "badge-success"
                      : "badge-error"
              } badge-sm`}
            >
              {farmer?.verificationStatus?.charAt(0).toUpperCase() +
                farmer?.verificationStatus?.slice(1)}
            </span>

            {farmer?.verificationStatus === "pending" && (
              <span className="text-muted-foreground text-sm">
                Your verification is under review
              </span>
            )}
            {farmer?.verificationStatus === "unverified" && (
              <span className="text-muted-foreground text-sm">
                Fill the form to issue verification
              </span>
            )}
          </div>
        </motion.header>

        <FarmerVerificationForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          verificationStatus={farmer?.verificationStatus}
          verificationRejectionReason={farmer?.verificationRejectionReason}
        />
      </div>
    </VerificationLayout>
  );
}

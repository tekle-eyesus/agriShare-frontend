import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuth";
import AuthLayout from "../../components/auth/AuthLayout";

export default function OTPVerificationForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { verifyEmail, resendOTP } = useAuthStore();
  const navigate = useNavigate();

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (res) => {
      if (res?.status !== "error") {
        setIsVerified(true);
        navigate("/");
      } else {
        setError(res?.message || "Something went wrong");
      }
    },
    onError: (error) => {
      setError(error.message || "Verification failed. Please try again.");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const resendOTPMutation = useMutation({
    mutationFn: (data) => resendOTP(data),
    onSuccess: () => {
      setError("");
      // You could show a success message here if needed
    },
    onError: (error) => {
      setError(error.message || "Failed to resend code. Please try again.");
    },
  });
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      pasteData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    verifyEmailMutation.mutate({
      email,
      otpCode: otp.join(""),
    });
  };

  if (isVerified) {
    return (
      <div className="flex justify-center items-center bg-linear-to-br from-purple-50 to-blue-50 p-4 min-h-screen">
        <div className="bg-white shadow-xl mx-auto p-8 rounded-2xl w-full max-w-md overflow-hidden text-center">
          <div className="flex justify-center mb-6 text-green-500">
            <CheckCircle className="w-16 h-16" />
          </div>
          <h2 className="mb-3 font-bold text-gray-800 text-3xl">
            Verified Successfully!
          </h2>
          <p className="mb-8 text-gray-600 text-lg">
            Your email has been successfully verified.
          </p>
        </div>
      </div>
    );
  }
  return (
    <AuthLayout
      title="Verify Your Email"
      description="Enter the 6-digit code sent to your email"
    >
      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-200 w-12 h-12 text-xl text-center transition-all"
                inputMode="numeric"
                autoComplete="one-time-code"
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <p className="mt-2 text-red-600 text-sm animate-pulse">{error}</p>
          )}

          <button
            type="button"
            className="mt-4 font-medium text-purple-600 hover:text-purple-800 text-sm"
            disabled={isLoading || resendOTPMutation.isPending}
            onClick={() => resendOTPMutation.mutate({ email })}
          >
            {resendOTPMutation.isPending
              ? "Resending..."
              : "Didn't receive code? Resend"}
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || otp.some((digit) => digit === "")}
            className={`w-full py-3 px-4 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all transform hover:scale-105 flex items-center justify-center shadow-md ${
              isLoading || otp.some((digit) => digit === "")
                ? "opacity-80 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 -ml-1 w-5 h-5 text-white animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

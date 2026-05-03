import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
// import { sendOtp } from "../helper/utilFunctions";
import { Link, useSearchParams } from "react-router-dom";

const SendResetOTP = () => {
  // const [email, setEmail] = useState("");
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  // const { mutateAsync: sendOtpCode } = useMutation({
  //   mutationFn: sendOtp,
  // });
  const { mutateAsync: sendOtpCode } = useMutation({
    mutationFn: () => {},
  });
  const handleSubmit = async () => {};
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setError("");
    setServerError("");
    setIsLoading(true);
    try {
      const res = await sendOtpCode(email);
      if (res.status !== "error") {
        setIsSent(true);
        return window.location.replace(`/otp-verification?email=${email}`);
      } else if (res.message) {
        setServerError(res.message);
      } else {
        setError("Failed to send reset code. Please try again.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-blue-50 to-indigo-50 p-4 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-bold text-gray-800 text-2xl">
              Reset Your Password
            </h2>
            <p className="text-gray-600">
              {isSent
                ? "We've sent a reset code to your email"
                : "Enter your email to receive a reset code"}
            </p>
          </div>

          {isSent ? (
            <div className="py-6 text-center">
              <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
                <Mail className="text-green-500" size={24} />
              </div>
              <p className="mb-6 text-gray-700">
                Check your inbox at <span className="font-medium">{email}</span>{" "}
                for the reset code.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setEmail("");
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg w-full font-medium text-white transition duration-200"
              >
                Resend Code
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-gray-700 text-sm"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue={email}
                    onChange={(e) => searchParams.set(email, e.target.value)}
                    readOnly={!!email}
                    className="block py-3 pr-3 pl-10 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full transition duration-200"
                    placeholder="you@example.com"
                  />
                </div>
                {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
              </div>
              {serverError && (
                <p className="my-2 text-red-600 text-sm">{serverError}</p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition duration-200 ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Code
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 text-sm"
            >
              Back to login
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-gray-500 text-xs">
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendResetOTP;

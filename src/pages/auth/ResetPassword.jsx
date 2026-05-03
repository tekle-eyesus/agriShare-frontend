import { yupResolver } from "@hookform/resolvers/yup";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { forgetPassword } from "../helper/utilFunctions";
import { passwordSchema } from "../schema/auth";

export default function PasswordResetForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { mutateAsync: forgetPass } = useMutation({
    mutationFn: forgetPassword,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const newPassword = watch("newPassword", "");

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, requirements: [] };

    const requirements = [
      {
        id: "length",
        label: "At least 8 characters",
        met: password.length >= 8,
      },
      {
        id: "letter",
        label: "Contains letters",
        met: /[a-zA-Z]/.test(password),
      },
      { id: "number", label: "Contains numbers", met: /[0-9]/.test(password) },
      {
        id: "symbol",
        label: "Contains symbols",
        met: /[^a-zA-Z0-9]/.test(password),
      },
    ];

    const score = requirements.filter((req) => req.met).length;
    return { score, requirements };
  };

  const passwordStrength = checkPasswordStrength(newPassword);
  const isPasswordStrong = passwordStrength.score === 4;

  const onSubmit = async (data) => {
    if (!isPasswordStrong) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgetPass({ data, email });
      console.log(res);
      if (res?.status !== "error") {
        setIsSuccess(true);
        reset();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex justify-center items-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl p-8 rounded-2xl text-center">
            <div className="flex justify-center mb-4 text-green-500">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="mb-2 font-bold text-gray-800 text-2xl">
              Password Updated!
            </h2>
            <p className="mb-6 text-gray-600">
              Your password has been successfully updated.
            </p>
            <button
              onClick={() => window.location.replace(`/login`)}
              className="flex justify-center items-center bg-blue-700 hover:bg-blue-800 shadow-sm px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-white text-sm transition-colors"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl p-8 rounded-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex justify-center items-center bg-blue-100 mb-4 rounded-full w-16 h-16">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="mb-2 font-bold text-gray-900 text-2xl">
              FleetControl
            </h1>
            <p className="text-gray-600">Reset your password</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 font-medium text-gray-700 text-sm"
              >
                New Password
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-xs sm:text-sm ${
                    errors.newPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-medium text-gray-700 text-sm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-xs sm:text-sm ${
                    errors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            {newPassword && (
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-3 font-medium text-gray-700 text-sm">
                  Password Requirements
                </h3>
                <div className="space-y-2">
                  {passwordStrength.requirements.map((req) => (
                    <div key={req.id} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span
                        className={`text-sm ${
                          req.met ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-700 text-sm">
                      Password Strength
                    </span>
                    <span className="font-medium text-gray-600 text-xs">
                      {passwordStrength.score === 4
                        ? "Strong"
                        : passwordStrength.score >= 2
                          ? "Medium"
                          : "Weak"}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full w-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        passwordStrength.score === 4
                          ? "bg-green-500"
                          : passwordStrength.score >= 2
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{
                        width: `${(passwordStrength.score / 4) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (newPassword && !isPasswordStrong)}
              className="flex justify-center items-center bg-blue-700 hover:bg-blue-800 disabled:opacity-50 shadow-sm px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-white text-sm transition-colors disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                  Updating...
                </>
              ) : (
                "Save New Password"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Remember your password?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

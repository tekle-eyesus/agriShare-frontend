import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Truck, CheckCircle2, XCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { changeTempPassword } from "../helper/utilFunctions";

const passwordSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export default function PasswordSetupPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: changeTempPassword,
    onSuccess: () => {
      // console.log("Password changed successfully:", data);
      navigate("/login");
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error("Error changing password:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to change password. Please try again.",
      });
    },
  });

  const form = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = form.watch("newPassword", "");

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

    try {
      console.log("Form submitted with data:", data, email);
      const res = await mutateAsync({
        email,
        password,
        newPassword: data.newPassword,
      });
      console.log(res);
    } catch (error) {
      console.error("Error changing password:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to change password. Please try again.",
      });
    }
  };

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
            <p className="text-gray-600">Set up your password</p>
          </div>

          {form.formState.errors.root && (
            <div className="flex items-center gap-3 bg-red-50 mb-6 p-4 border border-red-200 rounded-lg">
              <div className="w-5 h-5 text-red-600 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-red-800 text-sm">
                {form.formState.errors.root.message}
              </p>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  {...form.register("newPassword")}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-xs sm:text-sm ${
                    form.formState.errors.newPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter new password"
                  disabled={form.formState.isSubmitting}
                />
                <button
                  type="button"
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={form.formState.isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {form.formState.errors.newPassword && (
                <p className="mt-1 text-red-600 text-sm">
                  {form.formState.errors.newPassword.message}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...form.register("confirmPassword")}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-xs sm:text-sm ${
                    form.formState.errors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm new password"
                  disabled={form.formState.isSubmitting}
                />
                <button
                  type="button"
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={form.formState.isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="mt-1 text-red-600 text-sm">
                  {form.formState.errors.confirmPassword.message}
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

                {/* <div className="mt-4">
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
                </div> */}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                (newPassword && !isPasswordStrong)
              }
              className="flex justify-center items-center bg-blue-700 hover:bg-blue-800 disabled:opacity-50 shadow-sm px-4 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-medium text-white text-sm transition-colors disabled:cursor-not-allowed"
            >
              {form.formState.isSubmitting ? (
                <>
                  <div className="mr-2 border-white border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                  Setting Up...
                </>
              ) : (
                "Save Password"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Need help? Contact{" "}
              <a
                href="mailto:support@fleetcontrol.com"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                support@fleetcontrol.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

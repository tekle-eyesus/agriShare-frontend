import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { KeyRound, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "../../investor/Shared";
import { useAPI } from "../../../hook/useApi";
import { useAuthStore } from "../../../store/useAuth";
import { useNavigate } from "react-router-dom";

function SecuritySection() {
  const navigate = useNavigate();
  const { common } = useAPI();
  const { logout } = useAuthStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: common.changePassword,
    onSuccess: async () => {
      setShowSuccess(true);
      reset();
      await logout();
      navigate("/login");
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    const { confirmPassword, ...passwordData } = data;
    changePasswordMutation.mutate(passwordData);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6" hover={false}>
        <h3 className="mb-1 font-display font-bold text-lg">Change password</h3>
        <p className="mb-5 text-muted-foreground text-xs">
          Choose a strong password you don't use elsewhere.
        </p>

        {showSuccess && (
          <div className="bg-success/10 mb-4 p-3 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Password changed successfully!</span>
            </div>
          </div>
        )}

        {changePasswordMutation.error && (
          <div className="bg-error/10 mb-4 p-3 border border-error/20 rounded-lg">
            <div className="flex items-center gap-2 text-error">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">
                {changePasswordMutation.error.message ||
                  "Failed to change password"}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-1/3">
          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              Current password
            </label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
              disabled={isSubmitting}
            />
            {errors.currentPassword && (
              <p className="flex items-center gap-1 mt-1 text-error text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              New password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
              disabled={isSubmitting}
            />
            {errors.newPassword && (
              <p className="flex items-center gap-1 mt-1 text-error text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              Confirm new password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="flex items-center gap-1 mt-1 text-error text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="gap-2 btn btn-primary btn-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Update password
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
      {/* <Card className="p-6" hover={false}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-display font-bold text-lg">
              Two-factor authentication
            </h3>
            <p className="mt-1 text-muted-foreground text-xs">
              Add a second layer of security to your account.
            </p>
          </div>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </Card>
      <Card className="p-6" hover={false}>
        <h3 className="mb-3 font-display font-bold text-lg">Active sessions</h3>
        <div className="space-y-2">
          {[
            {
              device: "Chrome — MacBook Pro",
              loc: "Addis Ababa",
              last: "now",
              current: true,
            },
            {
              device: "Safari — iPhone",
              loc: "Addis Ababa",
              last: "2 days ago",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-xl"
            >
              <div>
                <p className="font-semibold text-sm">
                  {s.device}{" "}
                  {s.current && (
                    <span className="ml-1 badge badge-success badge-xs">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {s.loc} · {s.last}
                </p>
              </div>
              {!s.current && (
                <button className="text-error btn btn-ghost btn-xs">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </Card> */}
    </div>
  );
}

export default SecuritySection;

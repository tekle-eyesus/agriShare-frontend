import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import FormField from "../../components/auth/FormField";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { loginSchema } from "../../form-schema/authSchemas";
import { useAuthStore } from "../../store/useAuth";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { login, isloggingin, resendOTP } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      //   toast.success("Welcome back!", { description: data.email });
      navigate("/");
    },
    onError: async (error) => {
      if (error.message.includes("Email not verified")) {
        navigate("/otp-verification?email=" + error.email);
        await resendOTP({ email: error.email });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (values) => {
    loginMutation.mutate(values);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to AgriShare"
      footer={
        <Footer />
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          label="Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <label className="flex items-center gap-2 w-full grow">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full input input-bordered grow"
              {...register("email")}
            />
          </label>
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
          />
        </FormField>

        <div className="flex justify-end items-center">
          <Link
            to="/auth/forgot-password"
            className="font-medium text-sm hover:underline no-underline link link-primary"
          >
            Forgot password?
          </Link>
        </div>

        <motion.div whileTap={{ scale: 0.99 }}>
          <button
            type="submit"
            disabled={!isValid || isloggingin}
            className="shadow-lg shadow-primary/20 w-full btn btn-primary"
          >
            {isloggingin ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </motion.div>
      </form>
    </AuthLayout>
  );
}

function Footer(){
  return (
    <div className="flex items-center justify-between">
          <span>
            New here?{" "}
            <Link to="/signup" className="font-semibold text-success no-underline hover:underline">
              Create an account
            </Link>
          </span>
        </div>
  )
}
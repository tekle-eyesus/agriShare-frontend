import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";

import FormField from "../../components/auth/FormField";
import { PasswordInput } from "../../components/auth/PasswordInput";
import RoleSelector from "../../components/auth/RoleSelector";
import { signupSchema } from "../../form-schema/authSchemas";
import { useAuthStore } from "../../store/useAuth";
import AuthLayout from "../../components/auth/AuthLayout";

//TODO: for this to register a farmer we need them to add their fayda not thier farm details
export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("investor");
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      role: "investor",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const values = watch();

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      //   toast.success("Account created", {
      //     description: `Welcome to AgriShare, ${data.firstName}!`,
      //   });
      navigate(`/otp-verification?email=${values.email}`);
    },
    onError: (error) => {
      //   toast.error("Sign up failed", { description: error.message });
    },
  });

  const handleRoleChange = (next) => {
    setRole(next);
    const v = watch();
    reset({
      ...v,
      role: next,
      ...(next === "farmer"
        ? { region: "", zone: "", woreda: "", kebele: "", bio: "" }
        : {}),
    });
  };

  const onSubmit = async (data) => {
    signupMutation.mutate(data);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join the agricultural finance movement"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <p className="font-medium text-sm">I'm joining as</p>
          <RoleSelector value={role} onChange={handleRoleChange} />
        </div>

        <div className="gap-4 grid sm:grid-cols-2">
          <FormField
            label="First name"
            htmlFor="firstName"
            required
            error={errors.firstName?.message}
          >
            <label className="flex items-center gap-2 input input-bordered">
              <User className="opacity-60 w-4 h-4" />
              <input
                id="firstName"
                placeholder="Abebe"
                className="grow"
                {...register("firstName")}
              />
            </label>
          </FormField>
          <FormField
            label="Last name"
            htmlFor="lastName"
            required
            error={errors.lastName?.message}
          >
            <label className="flex items-center gap-2 input input-bordered">
              <User className="opacity-60 w-4 h-4" />
              <input
                id="lastName"
                placeholder="Kebede"
                className="grow"
                {...register("lastName")}
              />
            </label>
          </FormField>
        </div>

        <div className="gap-4 grid sm:grid-cols-2">
          <FormField
            label="Phone"
            htmlFor="phone"
            required
            error={errors.phone?.message}
          >
            <label className="flex items-center gap-2 input input-bordered">
              <Phone className="opacity-60 w-4 h-4" />
              <input
                id="phone"
                type="tel"
                placeholder="+251911223344"
                autoComplete="tel"
                className="grow"
                {...register("phone")}
              />
            </label>
          </FormField>
          <FormField
            label="Email"
            htmlFor="email"
            required
            error={errors.email?.message}
          >
            <label className="flex items-center gap-2 input input-bordered">
              <Mail className="opacity-60 w-4 h-4" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="grow"
                {...register("email")}
              />
            </label>
          </FormField>
        </div>

        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password?.message}
          hint="At least 8 characters with letters and numbers"
        >
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("password")}
          />
        </FormField>

        <AnimatePresence initial={false} mode="wait">
          {role === "farmer" && (
            <motion.div
              key="farmer-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-5 bg-primary/5 p-4 border border-primary/30 rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-primary text-sm">
                    Farm location
                  </p>
                  <span className="px-2 badge badge-primary badge-md">
                    Ethiopia
                  </span>
                </div>

                <div className="gap-4 grid sm:grid-cols-2">
                  <FormField
                    label="Region"
                    htmlFor="region"
                    required
                    error={errors.region?.message}
                  >
                    <input
                      id="region"
                      placeholder="Oromia"
                      className="w-full input input-bordered"
                      {...register("region")}
                    />
                  </FormField>
                  <FormField
                    label="Zone"
                    htmlFor="zone"
                    required
                    error={errors.zone?.message}
                  >
                    <input
                      id="zone"
                      placeholder="East Shewa"
                      className="w-full input input-bordered"
                      {...register("zone")}
                    />
                  </FormField>
                  <FormField
                    label="Woreda"
                    htmlFor="woreda"
                    required
                    error={errors.woreda?.message}
                  >
                    <input
                      id="woreda"
                      placeholder="Adama"
                      className="w-full input input-bordered"
                      {...register("woreda")}
                    />
                  </FormField>
                  <FormField
                    label="Kebele"
                    htmlFor="kebele"
                    required
                    error={errors.kebele?.message}
                  >
                    <input
                      id="kebele"
                      placeholder="01"
                      className="w-full input input-bordered"
                      {...register("kebele")}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Bio"
                  htmlFor="bio"
                  required
                  error={errors.bio?.message}
                  hint="Share your farming background and experience"
                >
                  <textarea
                    id="bio"
                    rows={4}
                    placeholder="I have 10 years of farming experience in maize and teff production..."
                    className="w-full textarea textarea-bordered"
                    {...register("bio")}
                  />
                </FormField>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input type="hidden" value={role} {...register("role")} />

        <motion.div whileTap={{ scale: 0.99 }}>
          <button
            type="submit"
            disabled={!isValid || isSigningUp}
            className="shadow-lg shadow-primary/20 w-full btn btn-primary"
            onClick={() => setValue("role", role)}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </motion.div>

        <p className="opacity-70 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline no-underline link link-primary"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

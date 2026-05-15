import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Camera, AlertCircle, CheckCircle, Upload } from "lucide-react";
import { Card } from "../../investor/Shared";
import { useAPI } from "../../../hook/useApi";
import { useAuthStore } from "../../../store/useAuth";

const ETHIOPIAN_REGIONS = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "Southern Nations, Nationalities, and Peoples' (SNNP)",
  "Tigray",
];

function ProfileSection() {
  const { authUser, updateUser } = useAuthStore();
  const { common } = useAPI();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: (formData) => common.updateProfile(formData),
    onSuccess: (response) => {
      setShowSuccess(true);
      updateUser(response.data.user);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: authUser?.firstName || "",
      lastName: authUser?.lastName || "",
      phone: authUser?.phone || "",
      bio: authUser?.bio || "",
      region: authUser?.region || "",
      zone: authUser?.zone || "",
      woreda: authUser?.woreda || "",
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("File must be an image (JPG or PNG)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("profilePicture", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    console.log(data);
    const profile = data.profilePicture;
    delete data.profilePicture;
    formData.append("data", JSON.stringify(data));
    // Add text fields
    /*
    if (data.firstName !== authUser?.firstName) {
      formData.append("firstName", data.firstName);
    }
    if (data.lastName !== authUser?.lastName) {
      formData.append("lastName", data.lastName);
    }
    if (data.phone !== authUser?.phone) {
      formData.append("phone", data.phone);
    }
    if (data.bio !== authUser?.bio) {
      formData.append("bio", data.bio);
    }

    if (authUser?.role === "farmer") {
      if (data.region !== authUser?.region) {
        formData.append("region", data.region);
      }
      if (data.zone !== authUser?.zone) {
        formData.append("zone", data.zone);
      }
      if (data.woreda !== authUser?.woreda) {
        formData.append("woreda", data.woreda);
      }
    }
      */

    // Add profile picture if changed
    if (profile instanceof File) {
      formData.append("profilePicture", profile);
    }
    formData.forEach((value, key) => {
      console.log(key, value, "/n");
    });
    updateProfileMutation.mutate(formData);
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <Card className="p-6" hover={false}>
      <h3 className="mb-1 font-display font-bold text-lg">
        Profile information
      </h3>
      <p className="mb-5 text-muted-foreground text-xs">
        Update your personal details and profile photo.
      </p>

      {showSuccess && (
        <div className="bg-success/10 mb-4 p-3 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Profile updated successfully!</span>
          </div>
        </div>
      )}

      {updateProfileMutation.error && (
        <div className="bg-error/10 mb-4 p-3 border border-error/20 rounded-lg">
          <div className="flex items-center gap-2 text-error">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              {updateProfileMutation.error.message ||
                "Failed to update profile"}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 mb-6">
          <div className="avatar placeholder">
            <div className="flex justify-center items-center rounded-full w-20 text-primary-content gradient-primary">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : authUser?.profilePicture ? (
                <img
                  src={authUser.profilePicture}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-xl">
                  {getInitials(authUser?.firstName, authUser?.lastName)}
                </span>
              )}
            </div>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 btn-outline btn btn-sm"
              disabled={isSubmitting}
            >
              <Camera className="w-4 h-4" />
              Change photo
            </button>
            <p className="mt-1 text-[11px] text-muted-foreground">
              JPG or PNG, max 2MB
            </p>
          </div>
        </div>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="flex items-center gap-1 mt-1 text-error text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="flex items-center gap-1 mt-1 text-error text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={authUser?.email || ""}
              disabled
              className="bg-gray-50 mt-1.5 border border-gray-100 outline-0 w-full input input-bordered input-sm"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Email cannot be changed
            </p>
          </div>

          <div>
            <label className="font-semibold text-xs uppercase tracking-wide">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="flex items-center gap-1 mt-1 text-error text-xs">
                <AlertCircle className="w-3 h-3" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {authUser?.role === "farmer" && (
            <>
              <div>
                <label className="font-semibold text-xs uppercase tracking-wide">
                  Region
                </label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full select-bordered select-sm select"
                  disabled={isSubmitting}
                >
                  <option value="">Select region</option>
                  {ETHIOPIAN_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="flex items-center gap-1 mt-1 text-error text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.region.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-semibold text-xs uppercase tracking-wide">
                  Zone
                </label>
                <input
                  type="text"
                  {...register("zone", { required: "Zone is required" })}
                  className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
                  disabled={isSubmitting}
                />
                {errors.zone && (
                  <p className="flex items-center gap-1 mt-1 text-error text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.zone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-semibold text-xs uppercase tracking-wide">
                  Woreda
                </label>
                <input
                  type="text"
                  {...register("woreda", { required: "Woreda is required" })}
                  className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full input input-bordered input-sm"
                  disabled={isSubmitting}
                />
                {errors.woreda && (
                  <p className="flex items-center gap-1 mt-1 text-error text-xs">
                    <AlertCircle className="w-3 h-3" />
                    {errors.woreda.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div
            className={
              authUser?.role === "farmer" ? "sm:col-span-2" : "sm:col-span-1"
            }
          >
            <label className="font-semibold text-xs uppercase tracking-wide">
              Bio
            </label>
            <textarea
              {...register("bio")}
              rows={3}
              className="mt-1.5 border border-gray-100 focus:border-gray-400 outline-0 w-full textarea textarea-bordered textarea-sm"
              placeholder="Tell us about yourself..."
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default ProfileSection;

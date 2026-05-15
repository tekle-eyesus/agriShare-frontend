import { MapPin } from "lucide-react";
import { InputField, SectionHeader } from "./FieldComponents";

const LocationFields = ({ register, errors, validationRules }) => {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Location"
        icon={MapPin}
        description="Where is this asset located?"
      />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <InputField
          label="Kebele"
          name="location.kebele"
          register={register}
          error={errors.location?.kebele}
          placeholder="Enter kebele"
          required
          {...register("location.kebele", validationRules["location.kebele"])}
        />
        <InputField
          label="Woreda"
          name="location.woreda"
          register={register}
          error={errors.location?.woreda}
          placeholder="Enter woreda"
          required
          {...register("location.woreda", validationRules["location.woreda"])}
        />
        <InputField
          label="Zone"
          name="location.zone"
          register={register}
          error={errors.location?.zone}
          placeholder="Enter zone"
          required
          {...register("location.zone", validationRules["location.zone"])}
        />
        <InputField
          label="Region"
          name="location.region"
          register={register}
          error={errors.location?.region}
          placeholder="Enter region"
          required
          {...register("location.region", validationRules["location.region"])}
        />
      </div>
    </div>
  );
};

export default LocationFields;

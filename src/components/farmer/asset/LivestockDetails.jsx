import { Building, PawPrint, Heart, Calendar, Tag } from "lucide-react";
import { InputField, SectionHeader, SelectField } from "./FieldComponents";

const LivestockDetails = ({ register, errors, validationRules }) => {
  const species = [
    { value: "cattle", label: "Cattle" },
    { value: "goat", label: "Goat" },
    { value: "sheep", label: "Sheep" },
    { value: "poultry", label: "Poultry" },
    { value: "camel", label: "Camel" },
    { value: "horse", label: "Horse" },
    { value: "donkey", label: "Donkey" },
    { value: "pig", label: "Pig" },
  ];

  const sexes = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const purposes = [
    { value: "dairy", label: "Dairy" },
    { value: "meat", label: "Meat" },
    { value: "eggs", label: "Eggs" },
    { value: "breeding", label: "Breeding" },
    { value: "wool", label: "Wool" },
    { value: "draft", label: "Draft/Work" },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Livestock Details"
        icon={PawPrint}
        description="Specific details about your livestock"
      />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <SelectField
          label="Species"
          name="livestockDetails.species"
          register={register}
          error={errors.livestockDetails?.species}
          options={species}
          placeholder="Select species"
          required
          {...register(
            "livestockDetails.species",
            validationRules["livestockDetails.species"],
          )}
        />
        <InputField
          label="Breed"
          name="livestockDetails.breed"
          register={register}
          error={errors.livestockDetails?.breed}
          placeholder="e.g., Holstein-Friesian cross"
          icon={PawPrint}
          required
          {...register(
            "livestockDetails.breed",
            validationRules["livestockDetails.breed"],
          )}
        />
        <SelectField
          label="Sex"
          name="livestockDetails.sex"
          register={register}
          error={errors.livestockDetails?.sex}
          options={sexes}
          placeholder="Select sex"
          required
          {...register(
            "livestockDetails.sex",
            validationRules["livestockDetails.sex"],
          )}
        />
        <InputField
          label="Age (Years)"
          name="livestockDetails.ageYears"
          register={register}
          error={errors.livestockDetails?.ageYears}
          type="number"
          min="0"
          step="0.5"
          placeholder="e.g., 3"
          icon={Calendar}
          required
          {...register(
            "livestockDetails.ageYears",
            validationRules["livestockDetails.ageYears"],
          )}
        />
        <InputField
          label="ET LITS ID"
          name="livestockDetails.identification.etLitsId"
          register={register}
          error={errors.livestockDetails?.identification?.etLitsId}
          placeholder="e.g., ET123456789"
          icon={Tag}
        />
        <InputField
          label="Local Tag"
          name="livestockDetails.identification.localTag"
          register={register}
          error={errors.livestockDetails?.identification?.localTag}
          placeholder="e.g., Cow-45"
          icon={Tag}
        />
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Vaccination Status</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("livestockDetails.healthStatus.vaccinated")}
              className="checkbox checkbox-md"
            />
            <span className="text-sm">Vaccinated</span>
          </label>
        </div>
        <InputField
          label="Last Vaccination Date"
          name="livestockDetails.healthStatus.lastVaccinationDate"
          register={register}
          error={errors.livestockDetails?.healthStatus?.lastVaccinationDate}
          type="date"
          icon={Calendar}
        />
        <SelectField
          label="Purpose"
          name="livestockDetails.purpose"
          register={register}
          error={errors.livestockDetails?.purpose}
          options={purposes}
          placeholder="Select purpose"
          required
          {...register(
            "livestockDetails.purpose",
            validationRules["livestockDetails.purpose"],
          )}
        />
        <InputField
          label="Quantity"
          name="livestockDetails.quantity"
          register={register}
          error={errors.livestockDetails?.quantity}
          type="number"
          min="1"
          placeholder="Number of animals"
          required
          icon={Building}
          {...register(
            "livestockDetails.quantity",
            validationRules["livestockDetails.quantity"],
          )}
        />
      </div>
    </div>
  );
};

export default LivestockDetails;

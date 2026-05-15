import { Building, FileText, Droplets, AlertCircle } from "lucide-react";
import { InputField, SectionHeader, SelectField } from "./FieldComponents";

const FarmlandDetails = ({ register, errors, validationRules }) => {
  const soilTypes = [
    { value: "black_soil", label: "Black Soil" },
    { value: "red_soil", label: "Red Soil" },
    { value: "vertisol", label: "Vertisol" },
    { value: "andosol", label: "Andosol" },
    { value: "fluvisol", label: "Fluvisol" },
    { value: "other", label: "Other" },
  ];

  const fertilityGrades = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const holdingTypes = [
    { value: "individual", label: "Individual" },
    { value: "joint", label: "Joint" },
    { value: "family", label: "Family" },
    { value: "cooperative", label: "Cooperative" },
  ];

  const commonCrops = [
    { value: "teff", label: "Teff" },
    { value: "wheat", label: "Wheat" },
    { value: "maize", label: "Maize" },
    { value: "sorghum", label: "Sorghum" },
    { value: "barley", label: "Barley" },
    { value: "coffee", label: "Coffee" },
    { value: "sesame", label: "Sesame" },
    { value: "pepper", label: "Pepper" },
    { value: "lentil", label: "Lentil" },
    { value: "chickpea", label: "Chickpea" },
  ];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Farmland Details"
        icon={Building}
        description="Specific details about your farmland"
      />
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <InputField
          label="Size (hectares)"
          name="farmlandDetails.sizeHa"
          register={register}
          error={errors.farmlandDetails?.sizeHa}
          type="number"
          step="0.01"
          placeholder="e.g., 5.5"
          required
          icon={Building}
          {...register(
            "farmlandDetails.sizeHa",
            validationRules["farmlandDetails.sizeHa"],
          )}
        />
        <SelectField
          label="Soil Type"
          name="farmlandDetails.soilType"
          register={register}
          error={errors.farmlandDetails?.soilType}
          options={soilTypes}
          placeholder="Select soil type"
          required
          {...register(
            "farmlandDetails.soilType",
            validationRules["farmlandDetails.soilType"],
          )}
        />
        <SelectField
          label="Fertility Grade"
          name="farmlandDetails.fertilityGrade"
          register={register}
          error={errors.farmlandDetails?.fertilityGrade}
          options={fertilityGrades}
          placeholder="Select fertility grade"
          required
          {...register(
            "farmlandDetails.fertilityGrade",
            validationRules["farmlandDetails.fertilityGrade"],
          )}
        />
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">
              Main Crops <span className="text-error">*</span>
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {commonCrops.map((crop) => (
              <label
                key={crop.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={crop.value}
                  {...register("farmlandDetails.mainCrops")}
                  className="checkbox checkbox-sm"
                />
                <span className="text-sm">{crop.label}</span>
              </label>
            ))}
          </div>
          <input
            type="text"
            placeholder="Or enter other crops (comma-separated)"
            className="mt-2 input input-sm input-bordered"
            {...register(
              "farmlandDetails.mainCrops",
              validationRules["farmlandDetails.mainCrops"],
            )}
          />
          {errors.farmlandDetails?.mainCrops && (
            <p className="flex items-center gap-1 mt-1 text-error text-xs">
              <AlertCircle className="w-3 h-3" />
              {errors.farmlandDetails?.mainCrops?.message}
            </p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-medium label-text">Irrigation Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("farmlandDetails.irrigation")}
              className="checkbox checkbox-md"
            />
            <span className="text-sm">Yes, irrigation is available</span>
          </label>
        </div>
        <SelectField
          label="Holding Type"
          name="farmlandDetails.holdingType"
          register={register}
          error={errors.farmlandDetails?.holdingType}
          options={holdingTypes}
          placeholder="Select holding type"
          required
          {...register(
            "farmlandDetails.holdingType",
            validationRules["farmlandDetails.holdingType"],
          )}
        />
        <div className="col-span-2">
          <InputField
            label="Co-Holders (comma-separated names)"
            name="farmlandDetails.coHolders"
            register={register}
            error={errors.farmlandDetails?.coHolders}
            placeholder="e.g., John Doe, Jane Smith"
            icon={Building}
          />
        </div>
        <InputField
          label="Land Certificate Number"
          name="farmlandDetails.landHoldingCertificateNumber"
          register={register}
          error={errors.farmlandDetails?.landHoldingCertificateNumber}
          placeholder="Optional"
          icon={FileText}
        />
      </div>
    </div>
  );
};

export default FarmlandDetails;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader2,
  Building,
} from "lucide-react";
import { InputField } from "./FieldComponents";
import LocationFields from "./LocationFields";
import FarmlandDetails from "./FarmlandDetails";
import LivestockDetails from "./LivestockDetails";
import FileUploadArea from "./FileUploadArea";
import {
  fadeInUp,
  modalVariants,
  overlayVariants,
} from "../../../utils/motionVariants";
import AssetTypeSelector from "./AssetTypeSelector";
import { useAPI } from "../../../hook/useApi";

function CreateAssetModal({ isOpen, onClose, onSave }) {
  const [assetType, setAssetType] = useState("farmland");
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { farmer } = useAPI();

  const createAssetMutation = useMutation({
    mutationFn: farmer.createAsset,
    onSuccess: (data) => {
      console.log("Asset created successfully:", data);
      onClose();
      reset();
    },
    onError: (error) => {
      console.error("Error creating asset:", error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      type: "farmland",
      description: "",
      location: {
        kebele: "",
        woreda: "",
        zone: "",
        region: "",
        gps: {
          latitude: "",
          longitude: "",
        },
      },
      farmlandDetails: {
        sizeHa: "",
        soilType: "",
        fertilityGrade: "",
        mainCrops: [],
        irrigation: false,
        landHoldingCertificateNumber: "",
        holdingType: "",
        coHolders: [],
      },
      livestockDetails: {
        species: "",
        breed: "",
        sex: "",
        ageYears: "",
        identification: {
          etLitsId: "",
          localTag: "",
        },
        healthStatus: {
          vaccinated: false,
          lastVaccinationDate: "",
          diseasesTreated: [],
        },
        purpose: "",
        quantity: 1,
      },
    },
    mode: "onBlur",
  });

  // Validation rules
  const validationRules = {
    name: { required: "Asset name is required" },
    type: { required: "Asset type is required" },
    description: {
      required: "Description is required",
      minLength: { value: 100, message: "Minimum 100 characters required" },
    },
    "location.kebele": { required: "Kebele is required" },
    "location.woreda": { required: "Woreda is required" },
    "location.zone": { required: "Zone is required" },
    "location.region": { required: "Region is required" },
    // Farmland specific validations
    "farmlandDetails.sizeHa": {
      required: "Size is required",
      min: { value: 0.1, message: "Size must be greater than 0" },
    },
    "farmlandDetails.soilType": { required: "Soil type is required" },
    "farmlandDetails.fertilityGrade": {
      required: "Fertility grade is required",
    },
    "farmlandDetails.mainCrops": { required: "Main crops are required" },
    "farmlandDetails.holdingType": { required: "Holding type is required" },
    // Livestock specific validations
    "livestockDetails.species": { required: "Species is required" },
    "livestockDetails.breed": { required: "Breed is required" },
    "livestockDetails.sex": { required: "Sex is required" },
    "livestockDetails.ageYears": {
      required: "Age is required",
      min: { value: 0, message: "Age must be 0 or greater" },
    },
    "livestockDetails.purpose": { required: "Purpose is required" },
    "livestockDetails.quantity": {
      required: "Quantity is required",
      min: { value: 1, message: "Quantity must be at least 1" },
    },
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);

    // Format data according to API specification
    const assetData = {
      type: assetType,
      name: data.name,
      description: data.description,
      location: data.location,
    };

    // Add asset-specific details based on type
    if (assetType === "farmland") {
      assetData.farmlandDetails = {
        sizeHa: parseFloat(data.farmlandDetails.sizeHa),
        soilType: data.farmlandDetails.soilType,
        fertilityGrade: data.farmlandDetails.fertilityGrade,
        mainCrops: Array.isArray(data.farmlandDetails.mainCrops)
          ? data.farmlandDetails.mainCrops
          : data.farmlandDetails.mainCrops
              .split(",")
              .map((crop) => crop.trim()),
        irrigation: data.farmlandDetails.irrigation,
        landHoldingCertificateNumber:
          data.farmlandDetails.landHoldingCertificateNumber,
        holdingType: data.farmlandDetails.holdingType,
        coHolders: Array.isArray(data.farmlandDetails.coHolders)
          ? data.farmlandDetails.coHolders
          : data.farmlandDetails.coHolders
              .split(",")
              .map((holder) => holder.trim()),
      };
    } else {
      assetData.livestockDetails = {
        species: data.livestockDetails.species,
        breed: data.livestockDetails.breed,
        sex: data.livestockDetails.sex,
        ageYears: parseInt(data.livestockDetails.ageYears),
        identification: {
          etLitsId: data.livestockDetails.identification.etLitsId,
          localTag: data.livestockDetails.identification.localTag,
        },
        healthStatus: {
          vaccinated: data.livestockDetails.healthStatus.vaccinated,
          lastVaccinationDate:
            data.livestockDetails.healthStatus.lastVaccinationDate,
          diseasesTreated: Array.isArray(
            data.livestockDetails.healthStatus.diseasesTreated,
          )
            ? data.livestockDetails.healthStatus.diseasesTreated
            : [],
        },
        purpose: data.livestockDetails.purpose,
        quantity: parseInt(data.livestockDetails.quantity),
      };
    }

    const formData = new FormData();

    // Add main asset data as JSON
    formData.append("assetData", JSON.stringify(assetData));
    console.log(JSON.parse(formData.get("assetData")));

    // Add photos
    photos.forEach((photo) => {
      formData.append("photos", photo.file);
    });

    // Add documents
    documents.forEach((doc) => {
      formData.append("documents", doc.file);
    });
    // console.log(formData.getAll("photos"));
    // console.log(formData.getAll("documents"));
    // Use mutation to create asset
    createAssetMutation.mutate(formData);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      reset();
      setPhotos([]);
      setDocuments([]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="z-50 fixed inset-0 bg-black/50"
            onClick={handleClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="top-1/2 left-1/2 z-50 fixed w-full max-w-5xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 no-scrollbar"
          >
            <div className="flex flex-col bg-base-100 shadow-2xl rounded-2xl h-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-base-200 border-b shrink-0">
                <div>
                  <h2 className="font-bold text-2xl">Create New Asset</h2>
                  <p className="mt-1 text-sm text-base-content/60">
                    Register your farmland or livestock for tokenization
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="btn btn-ghost btn-sm btn-circle"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 p-6 overflow-y-auto">
                <form id="asset-form" onSubmit={handleSubmit(handleFormSubmit)}>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="space-y-6"
                  >
                    {/* Asset Type Selection */}
                    <AssetTypeSelector
                      value={assetType}
                      onChange={setAssetType}
                    />

                    {/* Basic Information */}
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                      <InputField
                        label="Asset Name"
                        name="name"
                        register={register}
                        error={errors.name}
                        placeholder="e.g., Teff Farm - Gozamin"
                        required
                        icon={Building}
                        {...register("name", validationRules.name)}
                      />
                    </div>

                    <div className="flex flex-col gap-2 form-control">
                      <label className="label">
                        <span className="font-medium label-text">
                          Description <span className="text-error">*</span>
                        </span>
                      </label>
                      <textarea
                        placeholder="Describe your asset in detail (minimum 100 characters)..."
                        className="outline outline-gray-200 focus:outline-gray-400 w-1/2 h-32 resize-none textarea textarea-bordered"
                        {...register(
                          "description",
                          validationRules.description,
                        )}
                      />
                      {errors.description && (
                        <p className="flex items-center gap-1 mt-1 text-error text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Location */}
                    <LocationFields
                      register={register}
                      errors={errors}
                      validationRules={validationRules}
                    />

                    {/* Asset-specific Details */}
                    {assetType === "farmland" ? (
                      <FarmlandDetails
                        register={register}
                        errors={errors}
                        validationRules={validationRules}
                      />
                    ) : (
                      <LivestockDetails
                        register={register}
                        errors={errors}
                        validationRules={validationRules}
                      />
                    )}

                    {/* File Uploads */}
                    <div className="space-y-6">
                      <FileUploadArea
                        label="Asset Images"
                        icon={ImageIcon}
                        accept=".jpg,.jpeg,.png,.webp"
                        multiple={true}
                        maxSize={5}
                        onFilesSelect={setPhotos}
                        existingFiles={photos}
                        onRemoveFile={(index) => {
                          setPhotos((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                        isSubmitting={isSubmitting}
                        type="image"
                      />

                      <FileUploadArea
                        label="Ownership Documents"
                        icon={FileText}
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple={true}
                        maxSize={10}
                        onFilesSelect={setDocuments}
                        existingFiles={documents}
                        onRemoveFile={(index) => {
                          setDocuments((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                        isSubmitting={isSubmitting}
                        type="document"
                      />
                    </div>
                  </motion.div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 bg-base-200 p-6 border-base-300 border-t rounded-b-2xl shrink-0">
                <button
                  onClick={handleClose}
                  className="btn btn-ghost"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="asset-form"
                  className="gap-2 btn btn-primary"
                  disabled={isSubmitting || createAssetMutation.isPending}
                >
                  {isSubmitting || createAssetMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Create Asset
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CreateAssetModal;

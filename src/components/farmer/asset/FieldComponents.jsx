import { AlertCircle } from "lucide-react";

const InputField = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required,
  icon: Icon,
  step,
  min,
  max,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="font-medium label-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="top-1/2 left-3 absolute w-4 h-4 text-base-content/40 -translate-y-1/2" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full input input-bordered outline outline-gray-200 focus:outline-gray-400 ${Icon ? "pl-10" : ""} ${
            error ? "input-error" : ""
          }`}
          {...register(name)}
          step={step}
          min={min}
          max={max}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 mt-1 text-error text-xs">
          <AlertCircle className="w-3 h-3" />
          {error.message}
        </p>
      )}
    </div>
  );
};

// Select Field Component
const SelectField = ({
  label,
  name,
  register,
  error,
  options,
  placeholder,
  required,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="font-medium label-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <select
        className={`select select-bordered w-full outline outline-gray-200 focus:outline-gray-400 ${error ? "select-error" : ""}`}
        {...register(name)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="flex items-center gap-1 mt-1 text-error text-xs">
          <AlertCircle className="w-3 h-3" />
          {error.message}
        </p>
      )}
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon, description }) => {
  return (
    <div className="mb-4 pb-2 border-base-200 border-b">
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <Icon className="w-5 h-5 text-primary" />
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-base-content/60">{description}</p>
      )}
    </div>
  );
};

export { InputField, SelectField, SectionHeader };

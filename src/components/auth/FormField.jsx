export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  className = "",
  children,
}) {
  return (
    <div className={`form-control w-full ${className}`}>
      <label htmlFor={htmlFor} className="py-1 label">
        <span className="font-medium text-sm label-text">
          {label}
          {required && <span className="ml-0.5 text-error">*</span>}
        </span>
      </label>
      {children}
      {error ? (
        <span
          className="mt-1 font-medium label-text-alt text-error text-xs"
          role="alert"
        >
          {error}
        </span>
      ) : hint ? (
        <span className="opacity-70 mt-1 label-text-alt text-xs">{hint}</span>
      ) : null}
    </div>
  );
}

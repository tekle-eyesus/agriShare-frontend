import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, ImageIcon, AlertCircle } from "lucide-react";

export default function ImageUpload({
  label,
  value,
  onChange,
  required,
  error,
  hint,
  accept = "image/jpeg,image/png,image/webp",
  id,
  disabled,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputId = id ?? `file-${label.replace(/\s+/g, "-").toLowerCase()}`;

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    if (typeof value === "string") {
      setPreview(value);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFiles = useCallback(
    (files) => {
      if (disabled) return;
      const file = files?.[0];
      if (!file) return;
      onChange(file);
    },
    [onChange, disabled],
  );

  const onDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full form-control">
      <label htmlFor={inputId} className="pb-1.5 label">
        <span className="font-medium text-sm label-text">
          {label} {required && <span className="text-error">*</span>}
        </span>
        {hint && (
          <span className="label-text-alt text-muted-foreground text-xs">
            {hint}
          </span>
        )}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`group relative aspect-4/3 w-full rounded-2xl border-2 border-dashed transition-all overflow-hidden ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : error
              ? "border-error/60 bg-error/5"
              : dragActive
                ? "border-primary bg-primary/10"
                : "border-base-300 bg-base-200/50 hover:border-primary/50 hover:bg-base-200"
        }`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 ${disabled && "pointer-events-none"}`}
            >
              <img
                src={preview}
                alt={`${label} preview`}
                className="w-full h-full object-cover"
              />
              <div
                className={`bottom-0 absolute inset-x-0 flex gap-2 bg-linear-to-t from-black/70 to-transparent p-2 ${disabled && "pointer-events-none"}`}
              >
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="normal-case btn btn-xs btn-primary"
                >
                  <UploadCloud className="w-3 h-3" /> Replace
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="bg-base-100/90 btn-outline normal-case btn btn-xs btn-error"
                >
                  <X className="w-3 h-3" /> Remove
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.label
              key="empty"
              htmlFor={inputId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center cursor-pointer"
            >
              <div className="place-items-center grid bg-primary/10 mb-3 rounded-2xl w-12 h-12">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-semibold text-sm">
                <span className="text-primary">Click to upload</span> or drag &
                drop
              </p>
              <p className="mt-1 text-muted-foreground text-xs">
                PNG, JPG or WebP · max 5MB
              </p>
            </motion.label>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-error text-xs">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

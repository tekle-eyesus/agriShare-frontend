import { useState } from "react";
import DocumentList from "./DocumentList";
import ImageGallery from "./ImageGallery";

const FileUploadArea = ({
  label,
  icon: Icon,
  accept,
  multiple,
  maxSize,
  onFilesSelect,
  existingFiles = [],
  onRemoveFile,
  isSubmitting,
  type = "image",
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFiles = (files) => {
    const validFiles = [];
    const errors = [];

    for (const file of files) {
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name} exceeds ${maxSize}MB limit`);
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    return validFiles;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      const processedFiles = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        description: "",
        originalName: file.name,
      }));
      onFilesSelect(processedFiles);
    }
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).slice(0, 5);
    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      const processedFiles = validFiles.map((file) => ({
        url: type === "image" ? URL.createObjectURL(file) : null,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        description: "",
        originalName: file.name,
      }));
      onFilesSelect(processedFiles);
    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="font-medium label-text">{label}</span>
      </label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-base-300 hover:border-primary/50 hover:bg-base-200/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          id={label.replace(/\s/g, "")}
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          disabled={isSubmitting}
        />
        <Icon
          className={`mx-auto mb-3 w-12 h-12 ${isDragOver ? "text-primary" : "text-base-content/40"}`}
        />
        <p className="text-sm text-base-content/70">
          {isDragOver ? "Drop files here" : "Click or drag files to upload"}
        </p>
        <p className="mt-1 text-xs text-base-content/50">
          {accept === ".pdf,.jpg,.png" ? "PDF or Image" : "JPG or PNG"}, max{" "}
          {maxSize}MB each
        </p>
        {multiple && (
          <p className="mt-1 text-primary/70 text-xs">
            You can select multiple files at once
          </p>
        )}
      </div>

      {type === "image" ? (
        <ImageGallery
          images={existingFiles}
          onRemove={onRemoveFile}
          onUpdateDescription={(index, description) => {
            const updated = [...existingFiles];
            updated[index].description = description;
            onFilesSelect(updated);
          }}
          isSubmitting={isSubmitting}
        />
      ) : (
        <DocumentList
          documents={existingFiles}
          onRemove={onRemoveFile}
          onView={(doc) => window.open(doc.url, "_blank")}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default FileUploadArea;

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Grid, LayoutGrid, Trash2 } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";

const ImageGallery = ({
  images,
  onRemove,
  onUpdateDescription,
  isSubmitting,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid");

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setPreviewImage(images[index]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setPreviewImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setPreviewImage(images[prevIndex]);
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">
              Uploaded Images ({images.length})
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`btn btn-xs btn-square ${viewMode === "grid" ? "btn-primary" : "btn-ghost"}`}
              >
                <Grid className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`btn btn-xs btn-square ${viewMode === "list" ? "btn-primary" : "btn-ghost"}`}
              >
                <LayoutGrid className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="group relative"
              >
                <div
                  className="relative border-2 border-base-200 hover:border-primary rounded-lg aspect-square overflow-hidden transition-all duration-200 cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.url}
                    alt={image.description || `Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex justify-center items-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(index);
                      }}
                      className="text-white btn btn-circle btn-sm btn-ghost"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!isSubmitting && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(index);
                        }}
                        className="text-error btn btn-circle btn-sm btn-ghost"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={image.description}
                  onChange={(e) => onUpdateDescription(index, e.target.value)}
                  className="mt-1 w-full text-xs input input-xs input-bordered"
                  disabled={isSubmitting}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-3 bg-base-200 p-3 rounded-lg"
              >
                <div
                  className="rounded-lg w-16 h-16 overflow-hidden cursor-pointer shrink-0"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    placeholder="Image description"
                    value={image.description}
                    onChange={(e) => onUpdateDescription(index, e.target.value)}
                    className="w-full input input-xs input-bordered"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleImageClick(index)}
                  className="btn btn-ghost btn-sm btn-square"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {!isSubmitting && (
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-error btn btn-ghost btn-sm btn-square"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ImagePreviewModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={images.length > 1}
        hasPrev={images.length > 1}
      />
    </>
  );
};

export default ImageGallery;

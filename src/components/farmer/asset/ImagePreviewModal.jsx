import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ImagePreviewModal = ({
  image,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="z-60 fixed inset-0 flex justify-center items-center bg-black/90"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="top-4 right-4 absolute text-white btn btn-circle btn-ghost"
        >
          <X className="w-6 h-6" />
        </button>

        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="left-4 absolute hover:bg-white/20 text-white btn btn-circle btn-ghost"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="right-4 absolute hover:bg-white/20 text-white btn btn-circle btn-ghost"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          src={image.url}
          alt={image.description || "Asset preview"}
          className="rounded-lg max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {image.description && (
          <div className="bottom-4 left-1/2 absolute bg-black/50 px-4 py-2 rounded-lg text-white text-sm -translate-x-1/2">
            {image.description}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImagePreviewModal;

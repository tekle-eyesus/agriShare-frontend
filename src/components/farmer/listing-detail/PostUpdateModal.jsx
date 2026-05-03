import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ImageIcon } from "lucide-react";
import { modalVariants, overlayVariants } from "../../../utils/motionVariants";

function PostUpdateModal({ isOpen, onClose, onPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = () => {
    onPost({ title, body, images });
    onClose();
    setTitle("");
    setBody("");
    setImages([]);
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
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="top-1/2 left-1/2 z-50 fixed bg-base-100 shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2"
          >
            <div className="top-0 sticky flex justify-between items-center bg-base-100 p-6 border-base-200 border-b">
              <h2 className="font-bold text-2xl">Post New Update</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="form-control">
                <label className="label">
                  <span className="font-medium label-text">Update Title *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Harvest Progress Update"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-medium label-text">Update Body *</span>
                </label>
                <textarea
                  placeholder="Share your update with investors..."
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="resize-none textarea textarea-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-medium label-text">
                    Images (optional, up to 3)
                  </span>
                </label>
                <div className="p-8 border-2 border-base-300 hover:border-primary border-dashed rounded-lg text-center transition-colors cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="update-images"
                    multiple
                    accept=".jpg,.png"
                    max={3}
                    onChange={(e) => setImages(Array.from(e.target.files))}
                  />
                  <label htmlFor="update-images" className="cursor-pointer">
                    <ImageIcon className="mx-auto mb-3 w-12 h-12 text-base-content/40" />
                    <p className="text-sm text-base-content/70">
                      Click to upload images
                    </p>
                    <p className="mt-1 text-xs text-base-content/50">
                      JPG or PNG, up to 3 images
                    </p>
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="gap-1 badge badge-primary">
                        {img.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bottom-0 sticky flex justify-end gap-3 bg-base-200 p-6 border-base-300 border-t">
              <button onClick={onClose} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn btn-primary">
                Post Update
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PostUpdateModal;

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, FileText, Trash2, X } from "lucide-react";

const DocumentList = ({ documents, onRemove, onView, isSubmitting }) => {
  const [previewDoc, setPreviewDoc] = useState(null);

  const handleView = (doc) => {
    if (doc.type === "application/pdf") {
      window.open(doc.url, "_blank");
    } else {
      setPreviewDoc(doc);
    }
  };

  return (
    <div className="space-y-2 mt-3">
      <p className="font-medium text-sm">
        Uploaded Documents ({documents.length})
      </p>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {documents.map((doc, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
          >
            <div className="flex flex-1 items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {doc.originalName || doc.name}
                </p>
                <p className="text-xs text-base-content/50">
                  {doc.size ? (doc.size / 1024).toFixed(1) : "0"} KB
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => handleView(doc)}
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
            </div>
          </motion.div>
        ))}
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-60 fixed inset-0 flex justify-center items-center bg-black/90 p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <button
              onClick={() => setPreviewDoc(null)}
              className="top-4 right-4 absolute text-white btn btn-circle btn-ghost"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white p-2 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
              {previewDoc.type?.startsWith("image/") ? (
                <img
                  src={previewDoc.url}
                  alt="Document preview"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <iframe
                  src={previewDoc.url}
                  className="w-[800px] h-[600px]"
                  title="Document preview"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentList;

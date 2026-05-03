import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, size = "lg" }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 fixed inset-0 bg-neutral/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="z-50 fixed inset-0 flex justify-center items-end sm:items-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`pointer-events-auto bg-base-100 w-full ${sizeMap[size]} rounded-t-3xl sm:rounded-2xl shadow-elevated max-h-[92vh] flex flex-col overflow-hidden`}
            >
              {title && (
                <div className="flex justify-between items-center px-6 py-4 border-base-300 border-b shrink-0">
                  <div className="font-display font-bold text-lg">{title}</div>
                  <button
                    onClick={onClose}
                    className="btn btn-ghost btn-sm btn-square"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="overflow-y-auto scrollbar-thin">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

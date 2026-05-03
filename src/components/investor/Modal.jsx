import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  open, onClose, title, children, size = "lg", footer,
}) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const sizeMap = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              role="dialog" aria-modal="true"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`pointer-events-auto bg-base-100 w-full ${sizeMap[size]} rounded-t-3xl sm:rounded-2xl shadow-elevated max-h-[92vh] flex flex-col overflow-hidden`}
            >
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 shrink-0">
                  <div className="font-display font-bold text-lg">{title}</div>
                  <button onClick={onClose} className="btn btn-ghost btn-sm btn-square" aria-label="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="overflow-y-auto scrollbar-thin">{children}</div>
              {footer && <div className="px-6 py-4 border-t border-base-300 shrink-0">{footer}</div>}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Drawer({
  open, onClose, title, children, side = "right",
}) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const x = side === "right" ? 360 : -360;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x }} animate={{ x: 0 }} exit={{ x }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className={`fixed inset-y-0 ${side === "right" ? "right-0" : "left-0"} w-full sm:max-w-md bg-base-100 z-50 flex flex-col shadow-elevated`}
          >
            {title && (
              <div className="flex items-center justify-between px-6 h-16 border-b border-base-300 shrink-0">
                <div className="font-display font-bold text-lg">{title}</div>
                <button onClick={onClose} className="btn btn-ghost btn-sm btn-square" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto scrollbar-thin">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

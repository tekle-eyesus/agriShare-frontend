import { motion } from "framer-motion";

export function Burger({ open, onClick }) {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="lg:hidden inline-flex justify-center items-center hover:bg-base-200 rounded-md w-10 h-10 text-base-content transition-colors"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <motion.line
          x1="3"
          x2="19"
          y1="6"
          y2="6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          animate={open ? { rotate: 45, y: 5, x: 0 } : { rotate: 0, y: 0 }}
          style={{ originX: "11px", originY: "6px" }}
          transition={{ duration: 0.25 }}
        />
        <motion.line
          x1="3"
          x2="19"
          y1="11"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.line
          x1="3"
          x2="19"
          y1="16"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          style={{ originX: "11px", originY: "16px" }}
          transition={{ duration: 0.25 }}
        />
      </svg>
    </button>
  );
}

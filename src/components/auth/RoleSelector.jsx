import { motion } from "framer-motion";
import { Briefcase, Tractor, Check } from "lucide-react";

const roles = [
  {
    value: "investor",
    title: "Investor",
    desc: "Browse listings & fund farms",
    Icon: Briefcase,
  },
  {
    value: "farmer",
    title: "Farmer",
    desc: "Tokenize yield & raise capital",
    Icon: Tractor,
  },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div
      className="gap-3 grid grid-cols-2"
      role="radiogroup"
      aria-label="Account type"
    >
      {roles.map(({ value: v, title, desc, Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(v)}
            className={`group relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? "border-primary bg-primary/10"
                : "border-base-300 bg-base-100/40 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            {active && (
              <motion.div
                layoutId="role-check"
                className="top-2 right-2 absolute place-items-center grid bg-primary rounded-full w-5 h-5 text-primary-content"
              >
                <Check className="w-3 h-3" />
              </motion.div>
            )}
            <div
              className={`grid h-9 w-9 place-items-center rounded-lg transition-colors ${
                active
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content/70 group-hover:bg-primary/20 group-hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">{title}</div>
              <div className="opacity-70 text-xs">{desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

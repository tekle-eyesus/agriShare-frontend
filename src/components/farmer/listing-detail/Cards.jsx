import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";
import { Edit, Trash2, ImageIcon, Calendar } from "lucide-react";

export function StatCard({ label, value, icon: Icon, color = "primary" }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      className="bg-base-200/50 shadow-sm card"
    >
      <div className="p-4 card-body">
        <div className="flex justify-between items-center">
          <div>
            <div className="mb-1 text-xs text-base-content/60">{label}</div>
            <div
              className={`text-2xl font-bold ${color === "primary" ? "text-primary" : ""}`}
            >
              {value}
            </div>
          </div>
          {Icon && <Icon className="w-8 h-8 text-base-content/30" />}
        </div>
      </div>
    </motion.div>
  );
}

export const FinancialTermCard = ({ label, value }) => {
  return (
    <div className="bg-base-200/30 border border-base-200 card">
      <div className="p-4 card-body">
        <div className="mb-1 text-xs text-base-content/60">{label}</div>
        <div className="font-bold text-lg">{value}</div>
      </div>
    </div>
  );
};

export const UpdateCard = ({ update, onEdit, onDelete }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      className="shadow-sm border border-base-200 card"
    >
      <div className="p-6 card-body">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-lg card-title">{update.title}</h4>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(update)}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(update)}
              className="text-error btn btn-ghost btn-sm btn-circle"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-base-content/70">{update.body}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-base-content/50">
          {update.images > 0 && (
            <div className="flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              <span>{update.images} images</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Posted {update.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ReviewCard = ({ review }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="shadow-sm border border-base-200 card"
    >
      <div className="p-6 card-body">
        <div className="flex items-start gap-4">
          <div className="avatar placeholder">
            <div className="bg-primary/10 rounded-full w-12 h-12 text-primary">
              <span className="font-semibold text-lg">
                {review.investor.charAt(0)}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
              <h4 className="font-semibold">{review.investor}</h4>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-xs text-base-content/50">
                  {review.date}
                </span>
              </div>
            </div>
            <p className="text-base-content/70">{review.review}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

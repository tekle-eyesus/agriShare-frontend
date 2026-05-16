import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/motionVariants";
import {
  Edit,
  Trash2,
  ImageIcon,
  Calendar,
  Pencil,
  XCircle,
} from "lucide-react";
import { Card } from "../Shared";
import { timeAgo } from "../../../utils/format";

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

// export const UpdateC = () => {
//   return (
//     <div>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setPostOpen(true)}
//           className="gap-2 btn btn-primary btn-sm"
//         >
//           <Megaphone className="w-4 h-4" />
//           Post New Update
//         </button>
//       </div>
//       {listingUpdates.length === 0 ? (
//         <Card className="p-0" hover={false}>
//           <EmptyState
//             title="No updates yet"
//             message="Post your first update to keep investors engaged."
//             icon={Megaphone}
//           />
//         </Card>
//       ) : (
//         <div className="relative">
//           {listingUpdates.map((u) => (
//             <UpdateCardModified u={u} setEditingUpdate={setEditingUpdate}/>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
export const UpdateCardModified = ({ u, setEditingUpdate, onDelete }) => {
  return (
    <div
      key={u._id}
      className="relative pb-6 last:pb-0 pl-5 border-primary/30 border-l-2"
    >
      <span className="top-1 -left-[7px] absolute bg-primary rounded-full ring-4 ring-base-100 w-3 h-3" />
      <Card className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Calendar className="w-3 h-3" />
              <span>{new Date(u.postedAt).toLocaleDateString()}</span>
              <span>·</span>
              <span>{timeAgo(u.postedAt)}</span>
            </div>
            <p className="mt-1.5 font-display font-bold text-base">{u.title}</p>
            <p className="mt-2 text-muted-foreground text-sm">{u.body}</p>
            {u.images && u.images.length > 0 && (
              <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 mt-3">
                {u.images.map((img) => (
                  <img
                    key={img.url}
                    src={img.url}
                    className="bg-base-200 rounded-lg object-cover aspect-video"
                    alt=""
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => setEditingUpdate(u)}
              className="btn btn-ghost btn-xs btn-square"
              aria-label="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(u._id)}
              className="text-error btn btn-ghost btn-xs btn-square"
              aria-label="Delete"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Card>
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

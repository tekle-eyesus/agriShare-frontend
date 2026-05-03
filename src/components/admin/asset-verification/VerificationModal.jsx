import Modal from "../Modal";
import {
  Sprout,
  Beef,
  ImageIcon,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { StatusBadge } from "../shared";

function Field({ label, value }) {
  return (
    <div className="bg-base-200 p-3 rounded-xl">
      <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-sm">{value}</p>
    </div>
  );
}

function VerificationModal({ active, comment, setActive, setComment }) {
  return (
    <Modal
      open={!!active}
      onClose={() => setActive(null)}
      title="Asset Verification"
      size="xl"
    >
      {active && (
        <div className="space-y-6 p-6">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl grid place-items-center ${active.type === "Farmland" ? "bg-success/10 text-success" : "bg-info/10 text-info"}`}
              >
                {active.type === "Farmland" ? (
                  <Sprout className="w-6 h-6" />
                ) : (
                  <Beef className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">
                  {active.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {active.farmer} • {active.region}
                </p>
              </div>
            </div>
            <StatusBadge status={active.status} />
          </div>

          <p className="bg-base-200 p-4 rounded-xl text-sm text-base-content/80 leading-relaxed">
            {active.desc}
          </p>

          <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
            {active.type === "Farmland" ? (
              <>
                <Field label="Size" value={active.size} />
                <Field label="Soil" value={active.soil} />
                <Field label="Water" value={active.water} />
                <Field label="Region" value={active.region} />
              </>
            ) : (
              <>
                <Field label="Animal" value={active.animal} />
                <Field label="Breed" value={active.breed} />
                <Field label="Head count" value={active.count} />
                <Field label="Region" value={active.region} />
              </>
            )}
          </div>

          <div>
            <p className="flex items-center gap-2 mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" /> Photo Gallery
            </p>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="place-items-center grid bg-linear-to-br from-primary/10 to-accent/10 border border-base-300 rounded-xl aspect-square"
                >
                  <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" /> Documents
            </p>
            <div className="space-y-2">
              {[
                active.type === "Farmland"
                  ? "Land certificate.pdf"
                  : "Health certificate.pdf",
                "Ownership proof.pdf",
              ].map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-base-200 p-3 rounded-xl"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <p className="flex-1 font-medium text-sm truncate">{name}</p>
                  <button className="normal-case btn btn-ghost btn-xs">
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              Admin Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="rounded-xl w-full text-sm textarea textarea-bordered"
              placeholder="Add notes for the farmer…"
            />
          </div>

          <div className="flex gap-2 pt-2 border-base-300 border-t">
            <button className="flex-1 gap-2 normal-case btn btn-success">
              <CheckCircle2 className="w-4 h-4" /> Approve asset
            </button>
            <button className="gap-2 btn-outline normal-case btn btn-error">
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default VerificationModal;

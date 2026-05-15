import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useAPI } from "../../../hook/useApi";

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
//TODO: finish the asset rejection and approval flow
function VerificationModal({ active, comment, setActive, setComment }) {
  console.log(active);
  const { admin } = useAPI();
  const queryClient = useQueryClient();

  const verifyAssetMutation = useMutation({
    mutationFn: (data) =>
      admin.verifyAsset({ assetId: data.id, data: data.body }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-assets"]);
      setActive(null);
      setComment("");
    },
    onError: (error) => {
      console.error("Asset verification failed:", error);
    },
  });

  const handleApprove = () => {
    verifyAssetMutation.mutate({
      id: active._id,
      body: { status: "verified", reason: comment || "Asset approved" },
    });
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    verifyAssetMutation.mutate({
      id: active._id,
      body: { status: "rejected", reason: comment },
    });
  };

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
              <div className="place-items-center grid bg-info/10 rounded-xl w-12 h-12 overflow-hidden text-info">
                {/* <Beef className="w-6 h-6" /> */}
                <img
                  src={active?.photos[0]?.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">
                  {active.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {active.farmer._id} • {active.location.region}
                </p>
              </div>
            </div>
            <StatusBadge status={active.status} />
          </div>

          {/* <p className="bg-base-200 p-4 rounded-xl text-sm text-base-content/80 leading-relaxed">
            {active?.desc}
          </p> */}

          <div className="gap-3 grid grid-cols-2 sm:grid-cols-4">
            <Field label="Animal" value={active.name} />
            <Field label="Breed" value={active.livestockDetails.breed} />
            <Field
              label="Head count"
              value={active.livestockDetails.quantity}
            />
            {/* <Field label="Region" value={active.livestockDetails.region} /> */}
          </div>

          <div>
            <p className="flex items-center gap-2 mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" /> Photo Gallery
            </p>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
              {active.photos?.map((photo, i) => (
                <div
                  key={photo._id || i}
                  className="relative border border-base-300 rounded-xl aspect-square overflow-hidden"
                >
                  <img
                    src={photo.url}
                    alt={photo.description || `Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="right-0 bottom-0 left-0 absolute bg-black/60 p-2">
                    <p className="font-semibold text-[10px] text-white text-center truncate">
                      {photo.description || `Photo ${i + 1}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" /> Documents
            </p>
            <div className="space-y-2">
              {active.documents?.map((doc, i) => (
                <div
                  key={doc._id || i}
                  className="flex items-center gap-3 bg-base-200 p-3 rounded-xl"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <p className="flex-1 font-medium text-sm truncate">
                    {doc.originalName || `Document ${i + 1}`}
                  </p>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="normal-case btn btn-ghost btn-xs"
                  >
                    Preview
                  </a>
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
            <button
              onClick={handleApprove}
              disabled={verifyAssetMutation.isPending}
              className="flex-1 gap-2 normal-case btn btn-success"
            >
              {verifyAssetMutation.isPending ? (
                <>
                  <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Approve asset
                </>
              )}
            </button>
            <button
              onClick={handleReject}
              disabled={verifyAssetMutation.isPending || !comment.trim()}
              className={`gap-2 btn-outline normal-case btn btn-error ${!comment.trim() ? "btn-disabled cursor-not-allowed" : ""}`}
            >
              {verifyAssetMutation.isPending ? (
                <>
                  <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" /> Reject
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default VerificationModal;

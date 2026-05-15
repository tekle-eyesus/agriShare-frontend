import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, XCircle } from "lucide-react";
import { StatusBadge } from "../shared";
import Modal from "../Modal";
import { useAPI } from "../../../hook/useApi";

function VerificationDetailModal({ active, setActive, comment, setComment }) {
  const { admin } = useAPI();
  const queryClient = useQueryClient();
  //TODO: why does not after successful rejection or approval we don't get the query invalidation
  const verifyFarmerMutation = useMutation({
    mutationFn: (data) => admin.verifyFarmer({ id: data.id, data: data.body }),
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-farmers-verification"]);
      setActive(null);
      setComment("");
    },
    onError: (error) => {
      console.error("Verification failed:", error);
    },
  });

  const handleApprove = () => {
    verifyFarmerMutation.mutate({
      id: active._id,
      body: { status: "verified", reason: comment || "Verification approved" },
    });
  };

  const handleReject = () => {
    if (!comment.trim()) {
      //TODO: handle
      //   alert("Please provide a reason for rejection");
      return;
    }
    verifyFarmerMutation.mutate({
      id: active._id,
      body: { status: "rejected", reason: comment },
    });
  };

  /*
  {
    "_id": "6a04a9ae7ae40add9e373af8",
    "user": {
        "_id": "69fa1dc9edc368f0edd6593e",
        "firstName": "Lemma",
        "lastName": "Getiye",
        "phone": "+251925752767",
        "email": "getiyelemma061@gmail.com",
        "region": "Amhara",
        "zone": "Shewa",
        "woreda": "Debre Birhan",
        "kebele": "07",
        "verificationStatus": "pending"
    },
    "faydaIdNumber": "11111111111111111",
    "idFrontImage": "https://res.cloudinary.com/dggqm5svg/image/upload/v1778690478/agrishare_assets/cr4sovt3w8rkrrcuyloj.jpg",
    "idBackImage": "https://res.cloudinary.com/dggqm5svg/image/upload/v1778690478/agrishare_assets/x8ctfyiwzils161ppiq6.jpg",
    "selfieImage": "https://res.cloudinary.com/dggqm5svg/image/upload/v1778690478/agrishare_assets/qm4njeugeamezs9e31nx.jpg",
    "status": "pending",
    "submittedAt": "2026-05-13T16:41:18.924Z",
    "reviewedAt": null,
    "reviewedBy": null,
    "createdAt": "2026-05-13T16:41:18.962Z",
    "updatedAt": "2026-05-13T16:41:18.962Z",
    "__v": 0
}
  */
  return (
    <Modal
      open={!!active}
      onClose={() => setActive(null)}
      title="Farmer Verification"
      size="xl"
    >
      {active && (
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] p-6">
          <aside className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="rounded-full w-14 h-14 text-primary-content gradient-primary">
                  {/* <span className="font-bold">
                      {active.user.firstName
                        .split(" ")
                        .map((s) => s[0])
                        .join("")}
                    </span> */}
                </div>
              </div>
              <div>
                <p className="font-display font-bold">
                  {active.user.firstName} {active.user.lastName}
                </p>
                <p className="text-muted-foreground text-xs">{active._id}</p>
                <div className="mt-1">
                  <StatusBadge status={active.status} />
                </div>
              </div>
            </div>
            <div className="space-y-2.5 bg-base-200 p-4 rounded-xl text-sm">
              {[
                ["Email", active.user.email],
                ["Phone", active.user.phone],
                ["Region", active.user.region],
                ["Zone", active.user.zone],
                ["Woreda", active.user.woreda],
                ["Kebele", active.user.kebele],
                [
                  "Submitted",
                  new Date(active.submittedAt).toLocaleDateString(),
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
          </aside>
          <div className="space-y-5">
            <div>
              <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Identity Documents
              </p>
              <div className="gap-2 grid grid-cols-3">
                <div className="relative border border-base-300 rounded-xl aspect-3/4 overflow-hidden">
                  <img
                    src={active.idFrontImage}
                    alt="Fayda ID Front"
                    className="w-full h-full object-cover"
                  />
                  <div className="right-0 bottom-0 left-0 absolute bg-black/60 p-2">
                    <p className="font-semibold text-[11px] text-white text-center">
                      Fayda ID — Front
                    </p>
                  </div>
                </div>
                <div className="relative border border-base-300 rounded-xl aspect-3/4 overflow-hidden">
                  <img
                    src={active.idBackImage}
                    alt="Fayda ID Back"
                    className="w-full h-full object-cover"
                  />
                  <div className="right-0 bottom-0 left-0 absolute bg-black/60 p-2">
                    <p className="font-semibold text-[11px] text-white text-center">
                      Fayda ID — Back
                    </p>
                  </div>
                </div>
                <div className="relative border border-base-300 rounded-xl aspect-3/4 overflow-hidden">
                  <img
                    src={active.selfieImage}
                    alt="Selfie"
                    className="w-full h-full object-cover"
                  />
                  <div className="right-0 bottom-0 left-0 absolute bg-black/60 p-2">
                    <p className="font-semibold text-[11px] text-white text-center">
                      Selfie
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                Verification Notes
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Add a note for the farmer (required for rejection)…"
                className="rounded-xl w-full text-sm textarea textarea-bordered"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                disabled={verifyFarmerMutation.isPending}
                className="flex-1 gap-2 normal-case btn btn-success"
              >
                {verifyFarmerMutation.isPending ? (
                  <>
                    <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Approve verification
                  </>
                )}
              </button>
              <button
                onClick={handleReject}
                disabled={verifyFarmerMutation.isPending || !comment.trim()}
                className={`gap-2 btn-outline normal-case btn btn-error ${!comment.trim() ? "btn-disabled cursor-not-allowed" : ""}`}
              >
                {verifyFarmerMutation.isPending ? (
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
        </div>
      )}
    </Modal>
  );
}

export default VerificationDetailModal;

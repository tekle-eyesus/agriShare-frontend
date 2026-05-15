import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "../../investor/Shared";
import { useAPI } from "../../../hook/useApi";
import { useAuthStore } from "../../../store/useAuth";
import { useNavigate } from "react-router-dom";

function DeleteSection() {
  const { common } = useAPI();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const deleteAccountMutation = useMutation({
    mutationFn: common.deleteAccount,
    onSuccess: async () => {
      setShowSuccess(true);
      setTimeout(async () => {
        await logout();
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      console.error("Account deletion failed:", error);
    },
  });

  const handleDelete = () => {
    if (confirmationText === "DELETE") {
      deleteAccountMutation.mutate();
    }
  };

  return (
    <>
      <Card className="p-6 border-error/30" hover={false}>
        <h3 className="font-display font-bold text-error text-lg">
          Delete account
        </h3>
        <p className="mt-1 text-muted-foreground text-xs">
          Permanently delete your AgriShare account and all associated data.
          This action cannot be undone.
        </p>

        {showSuccess && (
          <div className="bg-success/10 mt-4 p-3 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">
                Account deleted successfully. Redirecting...
              </span>
            </div>
          </div>
        )}

        {deleteAccountMutation.error && (
          <div className="bg-error/10 mt-4 p-3 border border-error/20 rounded-lg">
            <div className="flex items-center gap-2 text-error">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                {deleteAccountMutation.error.message ||
                  "Failed to delete account"}
              </span>
            </div>
          </div>
        )}

        <button
          className="gap-2 mt-5 btn btn-error btn-sm"
          onClick={() => setShowModal(true)}
          disabled={deleteAccountMutation.isPending}
        >
          {deleteAccountMutation.isPending ? (
            <>
              <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              Request account deletion
            </>
          )}
        </button>
      </Card>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-base-100 shadow-xl mx-4 p-6 rounded-xl w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-error/10 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Delete Account</h3>
                <p className="text-muted-foreground text-sm">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm">
                Are you sure you want to delete your account? This will
                permanently remove:
              </p>
              <ul className="space-y-1 text-muted-foreground text-sm list-disc list-inside">
                <li>Your profile information</li>
                <li>All your assets and listings</li>
                <li>Transaction history</li>
                <li>Account settings and preferences</li>
              </ul>

              <div className="bg-error/10 p-3 rounded-lg">
                <p className="mb-2 font-medium text-error text-sm">
                  To confirm deletion, type "DELETE" below:
                </p>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="w-full input input-bordered input-sm"
                  disabled={deleteAccountMutation.isPending}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-sm"
                onClick={() => {
                  setShowModal(false);
                  setConfirmationText("");
                }}
                disabled={deleteAccountMutation.isPending}
              >
                Cancel
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={handleDelete}
                disabled={
                  confirmationText !== "DELETE" ||
                  deleteAccountMutation.isPending
                }
              >
                {deleteAccountMutation.isPending ? (
                  <>
                    <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteSection;

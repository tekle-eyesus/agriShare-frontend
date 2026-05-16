import { Bell, MessageSquare } from "lucide-react";

function ActionBar({ setShowUpdateModal }) {
  return (
    <div className="lg:hidden right-0 bottom-0 left-0 z-40 fixed flex gap-3 bg-base-100 shadow-lg p-4 border-base-200 border-t">
      <button
        onClick={() => setShowUpdateModal(true)}
        className="flex-1 gap-2 btn btn-primary"
      >
        <Bell className="w-4 h-4" />
        Post Update
      </button>
      <button className="btn-outline btn btn-square">
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ActionBar;

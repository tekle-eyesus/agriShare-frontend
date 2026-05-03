import { Card } from "../../investor/Shared";
import { Trash2 } from "lucide-react";

function DeleteSection() {
  return (
    <Card className="p-6 border-error/30" hover={false}>
      <h3 className="font-display font-bold text-error text-lg">
        Delete account
      </h3>
      <p className="mt-1 text-muted-foreground text-xs">
        Permanently delete your AgriShare account and all associated data. This
        action cannot be undone.
      </p>
      <button className="gap-2 mt-5 btn btn-error btn-sm">
        <Trash2 className="w-4 h-4" />
        Request account deletion
      </button>
    </Card>
  );
}

export default DeleteSection;
